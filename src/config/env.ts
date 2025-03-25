import { z } from 'zod';

const environmentSchema = z.object({
  VITE_APPWRITE_URL: z.string().min(1),
  VITE_APPWRITE_PROJECT_ID: z.string().min(1),
  VITE_APPWRITE_DATABASE_ID: z.string().min(1),
  VITE_APPWRITE_COLLECTION_ID: z.string().min(1),
  VITE_APPWRITE_BUCKET_ID: z.string().min(1),
});

let env: z.infer<typeof environmentSchema>;

try {
  env = environmentSchema.parse(import.meta.env);
} catch (err) {
  if (err instanceof z.ZodError) {
    const { fieldErrors } = err.flatten();
    const errorMessage = Object.entries(fieldErrors)
      .map(([field, errors]) =>
        errors ? `${field}: ${errors.join(', ')}` : field,
      )
      .join('\n  ');
    throw new Error(`Missing environment variables:\n  ${errorMessage}`);
  }
}

export { env };
