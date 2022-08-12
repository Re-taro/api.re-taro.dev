import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { validate } from "../validator";
import { Environment } from "./getter.service";

@Global()
@Module({
  exports: [Environment],
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env"],
      isGlobal: true,
      validate,
    }),
  ],
  providers: [Environment],
})
export class EnvironmentModule {}
