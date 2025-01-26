import { z } from 'zod';

export const envsSchema = z.object({
  HOST: z.string().default('localhost'),
  PORT: z.coerce.number().default(3000),
  RABBIT_URL: z.string().default('amqp://localhost'),
});

export type Envs = z.infer<typeof envsSchema>;

export const envs = envsSchema.parse(process.env);
