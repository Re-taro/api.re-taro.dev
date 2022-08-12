import { Module } from "@nestjs/common";
import { YamlModule } from "../../utils/yaml/yaml.module";
import { BioResolver } from "./bio.resolver";
import { BioService } from "./bio.service";

@Module({
  imports: [YamlModule],
  providers: [BioService, BioResolver],
})
export class BioModule {}
