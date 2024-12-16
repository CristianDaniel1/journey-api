import { z } from 'zod';

const envSchema = z.object({
  PORT: z.number({ coerce: true }).default(3000),
  CLIENT_PATH: z.string().default('frontend'),
  MYSQL_HOST: z.string().default('localhost'),
  MYSQL_USER: z.string().default('root'),
  MYSQL_PORT: z.number({ coerce: true }).default(3306),
  MYSQL_PASSWORD: z.string().min(1, 'mysql password is required'),
  MYSQL_DATABASE: z.string().min(1, 'database name is required'),
});

process.loadEnvFile();

const { success, error, data } = envSchema.safeParse(process.env);

if (!success) {
  console.error('Error envs:', error.format());
  process.exit(1);
}

export const {
  PORT,
  CLIENT_PATH,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PORT,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = data;
