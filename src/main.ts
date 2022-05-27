import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const port = Number(process.env.PORT) || 3003;
  await app.listen(port, "0.0.0.0");
};
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
