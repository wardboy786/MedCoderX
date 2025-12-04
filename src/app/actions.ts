'use server';

import { checkCopyright, CheckCopyrightOutput } from '@/ai/flows/photo-rights-ai-copyright-check';
import { z } from 'zod';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const imageSchema = z.instanceof(File).refine((file) => file.size > 0, {
  message: 'File cannot be empty.'
}).refine((file) => file.size <= MAX_FILE_SIZE, {
  message: 'Image must be 4MB or less.',
}).refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
  message: 'Only .jpg, .jpeg, .png and .webp formats are supported.',
});

export async function checkImageCopyright(formData: FormData): Promise<CheckCopyrightOutput | { error: string }> {
  const file = formData.get('image');

  const validationResult = imageSchema.safeParse(file);
  if (!validationResult.success) {
    return { error: validationResult.error.errors[0].message };
  }

  const imageFile = validationResult.data;

  try {
    const buffer = await imageFile.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataUri = `data:${imageFile.type};base64,${base64}`;

    const result = await checkCopyright({ photoDataUri: dataUri });
    return result;
  } catch (error) {
    console.error('Error in checkImageCopyright action:', error);
    return { error: 'Failed to analyze the image with AI. Please try again later.' };
  }
}
