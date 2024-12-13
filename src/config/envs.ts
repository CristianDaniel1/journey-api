import { z } from 'zod';

const envSchema = z.object({
  PORT: z.number({ coerce: true }).default(3000),
  CLIENT_PATH: z.string().default('src/frontend'),
});

process.loadEnvFile();

const { success, error, data } = envSchema.safeParse(process.env);

if (!success) {
  console.error('Error envs:', error.format());
  process.exit(1);
}

export const { PORT, CLIENT_PATH } = data;
