"use client";

// Check if we're in a secure context (required for crypto.subtle in production)
const isSecureContext = typeof window !== 'undefined' && 
  (window.isSecureContext || window.location.protocol === 'https:' || window.location.hostname === 'localhost');

// Check if crypto.subtle is available
const isCryptoAvailable = typeof window !== 'undefined' && window.crypto && window.crypto.subtle;

// Helper function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Helper function to convert Base64 to ArrayBuffer
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

// Function to derive a key from a passphrase and salt
async function getKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
}

// Encrypt function
export async function encryptText(text: string, passphrase: string, recipientId?: string): Promise<string | null> {
  // Check for secure context and crypto availability first
  if (!isSecureContext) {
    console.error('Encryption failed: Not in a secure context. Please use HTTPS.');
    throw new Error('SECURE_CONTEXT_REQUIRED');
  }

  if (!isCryptoAvailable) {
    console.error('Encryption failed: Web Crypto API not available in this browser.');
    throw new Error('CRYPTO_API_UNAVAILABLE');
  }

  try {
    const enc = new TextEncoder();
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const key = await getKey(passphrase, salt);

    const payload = recipientId ? `${recipientId}::${text}` : text;

    const encryptedContent = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      key,
      enc.encode(payload)
    );

    const encryptedBytes = new Uint8Array(encryptedContent);
    const resultBuffer = new Uint8Array(salt.length + iv.length + encryptedBytes.length);
    resultBuffer.set(salt, 0);
    resultBuffer.set(iv, salt.length);
    resultBuffer.set(encryptedBytes, salt.length + iv.length);

    return arrayBufferToBase64(resultBuffer.buffer);
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error(error instanceof Error ? error.message : 'ENCRYPTION_FAILED');
  }
}

// Decrypt function
export async function decryptText(encryptedData: string, passphrase: string, recipientId?: string): Promise<string> {
  // Check for secure context and crypto availability first
  if (!isSecureContext) {
    console.error('Decryption failed: Not in a secure context. Please use HTTPS.');
    throw new Error('SECURE_CONTEXT_REQUIRED');
  }

  if (!isCryptoAvailable) {
    console.error('Decryption failed: Web Crypto API not available in this browser.');
    throw new Error('CRYPTO_API_UNAVAILABLE');
  }
  
  try {
    const encryptedDataBuffer = base64ToArrayBuffer(encryptedData);
    const salt = new Uint8Array(encryptedDataBuffer.slice(0, 16));
    const iv = new Uint8Array(encryptedDataBuffer.slice(16, 28));
    const data = new Uint8Array(encryptedDataBuffer.slice(28));
    const key = await getKey(passphrase, salt);

    const decryptedContent = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      key,
      data.buffer
    );

    const dec = new TextDecoder();
    const decryptedPayload = dec.decode(decryptedContent);

    if (recipientId) {
      const prefix = `${recipientId}::`;
      if (decryptedPayload.startsWith(prefix)) {
        return decryptedPayload.substring(prefix.length);
      } else {
        // ID was provided, but the payload doesn't have the correct prefix.
        throw new Error("ID_MISMATCH");
      }
    }

    // No ID provided for decryption. Check if message was likely encrypted with one.
    if (/^user-[a-zA-Z0-9-]+::/.test(decryptedPayload)) {
      throw new Error("ID_MISSING");
    }

    return decryptedPayload;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "ID_MISMATCH" || error.message === "ID_MISSING") {
        throw error; // Re-throw our specific errors.
      }
      // Add more descriptive error for debugging in production
      console.error('Decryption failed:', error);
      throw new Error(error.message || "PASSPHRASE_OR_DATA_INVALID");
    }
    // Any other error from crypto.subtle.decrypt is a general failure.
    console.error('Decryption failed:', error);
    throw new Error("PASSPHRASE_OR_DATA_INVALID");
  }
}
