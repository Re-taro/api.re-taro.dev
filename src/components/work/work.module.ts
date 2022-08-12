import { Module } from "@nestjs/common";
import { YamlModule } from "../../utils/yaml/yaml.module";
import { WorkResolver } from "./work.resolver";
import { WorkService } from "./work.service";

@Module({
  imports: [YamlModule],
  providers: [WorkService, WorkResolver],
})
export class WorkModule {}
