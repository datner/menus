import { z } from 'zod';

export const CloudinaryImage = z.object({
  id: z.string(),
  fileName: z.string(),
  originalFileName: z.string(),
  mimetype: z.string(),
  encoding: z.string(),
  publicUrl: z.string(),
  publicUrlTransformed: z.string(),
});

export type CloudinaryImage = z.infer<typeof CloudinaryImage>;
