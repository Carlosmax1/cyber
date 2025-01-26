import { RabbitmqServer } from '@/rabbit/server';
import { envs } from '@/envs';

let rabbitmqServer: RabbitmqServer | null = null;

export async function getRabbitmqServer() {
  if (!rabbitmqServer) {
    rabbitmqServer = new RabbitmqServer('amqp://rabbitmq:5672');
    await rabbitmqServer.start();
  }
  return rabbitmqServer;
}
