import { Module } from "@nestjs/common";
import { HealthcheckModule } from "./healthcheck/healthcheck.module";

@Module({
  controllers: [],
  imports: [HealthcheckModule],
  providers: [],
})
export class AppModule {}
