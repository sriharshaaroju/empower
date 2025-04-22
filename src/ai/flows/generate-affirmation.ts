// src/ai/flows/generate-affirmation.ts
'use server';

/**
 * @fileOverview Generates personalized affirmations based on user input.
 *
 * - generateAffirmation - A function that generates personalized affirmations.
 * - GenerateAffirmationInput - The input type for the generateAffirmation function.
 * - GenerateAffirmationOutput - The return type for the generateAffirmation function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateAffirmationInputSchema = z.object({
  topic: z.string().describe('The topic or area of life the user wants an affirmation for.'),
  mood: z.string().describe('The desired mood or feeling of the affirmation (e.g., happy, strong, confident).'),
});

export type GenerateAffirmationInput = z.infer<typeof GenerateAffirmationInputSchema>;

const GenerateAffirmationOutputSchema = z.object({
  affirmation: z.string().describe('The generated personalized affirmation.'),
});

export type GenerateAffirmationOutput = z.infer<typeof GenerateAffirmationOutputSchema>;

export async function generateAffirmation(input: GenerateAffirmationInput): Promise<GenerateAffirmationOutput> {
  return generateAffirmationFlow(input);
}

const generateAffirmationPrompt = ai.definePrompt({
  name: 'generateAffirmationPrompt',
  input: {
    schema: z.object({
      topic: z.string().describe('The topic or area of life the user wants an affirmation for.'),
      mood: z.string().describe('The desired mood or feeling of the affirmation (e.g., happy, strong, confident).'),
    }),
  },
  output: {
    schema: z.object({
      affirmation: z.string().describe('The generated personalized affirmation.'),
    }),
  },
  prompt: `You are an AI assistant designed to generate personalized affirmations.

  Based on the user's input, create an affirmation that is:
  - Relevant to the specified topic: {{{topic}}}
  - Evokes the desired mood or feeling: {{{mood}}}

  The affirmation should be positive, encouraging, and empowering.

  Affirmation:`, // Prompt ends here.
});

const generateAffirmationFlow = ai.defineFlow<
  typeof GenerateAffirmationInputSchema,
  typeof GenerateAffirmationOutputSchema
>({
  name: 'generateAffirmationFlow',
  inputSchema: GenerateAffirmationInputSchema,
  outputSchema: GenerateAffirmationOutputSchema,
},
async input => {
  const {output} = await generateAffirmationPrompt(input);
  return output!;
});
