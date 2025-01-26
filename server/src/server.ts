import { fastify } from 'fastify';
import { envs } from './envs';
import { getRabbitmqServer } from './rabbit/client';
import { db } from './db/prisma';

import { modelRoutes } from './routes/model';

const app = fastify({ logger: true });

app.register(modelRoutes, {
  prefix: '/model',
});

type ParseType = {
  text: string;
  result: {
    entity: string;
    score: string;
    index: number;
    word: string;
    start: number;
    end: number;
  }[];
};

(async () => {
  const rabbitmqServer = await getRabbitmqServer();
  await rabbitmqServer.consume('output_queue', async (message) => {
    const content = message.content.toString();
    const parse: ParseType = JSON.parse(content);
    await db.data.create({
      data: {
        result: JSON.stringify(parse.result),
        text: parse.text,
      },
    });
  });
})();

app.listen({ port: envs.PORT, host: envs.HOST }).then(() => {
  console.log(`Server listening on ${envs.HOST}:${envs.PORT}`);
});
