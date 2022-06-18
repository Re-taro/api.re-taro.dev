import { BadRequestException, ValidationError, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const port = Number(process.env.PORT) || 3003;
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors): Array<ValidationError> => {
        const messages = errors.flatMap((error) => {
          const response: { key: string; messages: string[] }[] = [];
          const cons = error.constraints ?? {};
          const mes: string[] = [];
          for (const key of Object.keys(cons)) {
            // eslint-disable-next-line security/detect-object-injection
            mes.push(cons[key]);
          }
          response.push({ key: error.property, messages: mes });
          return response;
        });
        throw new BadRequestException(messages);
      },
    }),
  )
  await app.listen(port, "0.0.0.0");
};
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
