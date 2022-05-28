import { Module } from "@nestjs/common";
import { HealthcheckModule } from "./healthcheck/healthcheck.module";
import { YamlModule } from "./yaml/yaml.module";

@Module({
  controllers: [],
  imports: [HealthcheckModule, YamlModule],
  providers: [],
})
export class AppModule {}
