import { getRabbitmqServer } from '@/rabbit/client';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';

const schema = z.object({
  link: z.string(),
  model: z.string(),
  news: z
    .string()
    .trim()
    .transform((news) => news.replace(/[^a-zA-Z0-9 ]/g, '')), // remove todos os caracteres especiais
});

type Schema = z.infer<typeof schema>;

export const modelRoutes = (app: FastifyInstance) => {
  app.post<{ Body: Schema }>('/', async (request, reply) => {
    try {
      const { link, model, news } = request.body;
      const rabbitmqServer = await getRabbitmqServer();
      await rabbitmqServer.publishInQueue('input_queue', JSON.stringify(news));
      reply.code(201).send({ message: 'Message sent to model queue' });
    } catch (error) {
      console.error('Error while sending message to model queue:', error);
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  });
};
