'use server';
/**
 * @fileOverview A flow to check the copyright status of an image using AI.
 *
 * - checkCopyright - A function that handles the copyright check process.
 * - CheckCopyrightInput - The input type for the checkCopyright function.
 * - CheckCopyrightOutput - The return type for the checkCopyright function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheckCopyrightInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to check for copyright status, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type CheckCopyrightInput = z.infer<typeof CheckCopyrightInputSchema>;

const CheckCopyrightOutputSchema = z.object({
  copyrightStatus: z.string().describe('The copyright status of the image.'),
  suggestions: z.string().describe('AI-powered suggestions for safe usage.'),
});
export type CheckCopyrightOutput = z.infer<typeof CheckCopyrightOutputSchema>;

export async function checkCopyright(input: CheckCopyrightInput): Promise<CheckCopyrightOutput> {
  return checkCopyrightFlow(input);
}

const prompt = ai.definePrompt({
  name: 'checkCopyrightPrompt',
  input: {schema: CheckCopyrightInputSchema},
  output: {schema: CheckCopyrightOutputSchema},
  prompt: `You are an AI-powered copyright checker. Analyze the image and determine its copyright status, providing suggestions for safe usage.

Image: {{media url=photoDataUri}}

Copyright Status:
Suggestions: `,
});

const checkCopyrightFlow = ai.defineFlow(
  {
    name: 'checkCopyrightFlow',
    inputSchema: CheckCopyrightInputSchema,
    outputSchema: CheckCopyrightOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
