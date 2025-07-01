# Hash My Message

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Site-ff69b4)](https://hashmymessage.com/)
![Hash My Message](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.0-000000?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwind-css&logoColor=white)

## 🔒 Overview

Hash My Message is a modern, secure web application that enables end-to-end encrypted messaging through client-side encryption and decryption. Using the Web Crypto API with AES-GCM encryption, users can securely share sensitive information via encrypted text that only recipients with the correct passphrase can decrypt. Built with Next.js 15 and React 18, this application provides a user-friendly interface with zero server-side storage of sensitive data, ensuring complete privacy and security for your communications.

## ✨ Features

- **Message Encryption**: Securely encrypt any text message with a passphrase
- **Message Decryption**: Easily decrypt messages using the correct passphrase
- **Unique User IDs**: Anonymous user identification for session management
- **Responsive Design**: Beautiful UI that works on all devices
- **Modern UI**: Built with Tailwind CSS and Radix UI components


## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **AI Integration**: GenKit AI
- **Deployment**: Vercel/Netlify

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn


## 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/alwalid54321/hash-my-message.git
cd hash-my-message
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

You can create a `.env.local` file in the root directory for any environment variables you might need.

## 🏃‍♂️ Running the Application

### Development mode

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:3000

### Build for production

```bash
npm run build
# or
yarn build
```

### Start production server

```bash
npm start
# or
yarn start
```

## 📊 Project Structure

```
├── public/              # Static assets
├── src/
│   ├── app/            # App router pages
│   ├── components/      # Reusable UI components
│   ├── lib/            # Utility functions and hooks
│   ├── ai/             # AI integration files
│   └── styles/         # Global styles
├── .env.local          # Environment variables
└── next.config.ts      # Next.js configuration
```

## 🔐 Security Features

- Client-side encryption/decryption ensures messages never travel in plaintext
- Unique user IDs for anonymous session management
- No storage of sensitive data on servers


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

- [alwalid54321](https://github.com/alwalid54321)

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [GenKit AI](https://genkit.ai/)
