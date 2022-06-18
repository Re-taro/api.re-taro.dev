import { Module } from "@nestjs/common";
import { HealthcheckModule } from "./healthcheck/healthcheck.module";
import { MatterModule } from "./matter/matter.module";
import { RepositoryModule } from "./repository/repository.module";
import { YamlModule } from "./yaml/yaml.module";

@Module({
  controllers: [],
  imports: [HealthcheckModule, YamlModule, RepositoryModule, MatterModule],
  providers: [],
})
export class AppModule {}
