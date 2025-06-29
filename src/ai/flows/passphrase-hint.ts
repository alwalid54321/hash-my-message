// src/ai/flows/passphrase-hint.ts
'use server';
/**
 * @fileOverview A passphrase hint AI agent.
 *
 * - generatePassphraseHint - A function that takes a hint and returns a possible passphrase.
 * - GeneratePassphraseHintInput - The input type for the generatePassphraseHint function.
 * - GeneratePassphraseHintOutput - The return type for the generatePassphraseHint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePassphraseHintInputSchema = z.object({
  hint: z.string().describe('A hint to help remember the passphrase.'),
});
export type GeneratePassphraseHintInput = z.infer<
  typeof GeneratePassphraseHintInputSchema
>;

const GeneratePassphraseHintOutputSchema = z.object({
  possiblePassphrase: z
    .string()
    .describe('A possible passphrase based on the hint.'),
});
export type GeneratePassphraseHintOutput = z.infer<
  typeof GeneratePassphraseHintOutputSchema
>;

export async function generatePassphraseHint(
  input: GeneratePassphraseHintInput
): Promise<GeneratePassphraseHintOutput> {
  return generatePassphraseHintFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePassphraseHintPrompt',
  input: {schema: GeneratePassphraseHintInputSchema},
  output: {schema: GeneratePassphraseHintOutputSchema},
  prompt: `You are a passphrase suggestion AI. The user will provide a hint, and you must generate a possible passphrase that the user can use.

Hint: {{{hint}}} `,
});

const generatePassphraseHintFlow = ai.defineFlow(
  {
    name: 'generatePassphraseHintFlow',
    inputSchema: GeneratePassphraseHintInputSchema,
    outputSchema: GeneratePassphraseHintOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
