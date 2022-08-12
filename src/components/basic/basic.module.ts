import { Module } from "@nestjs/common";
import { YamlModule } from "../../utils/yaml/yaml.module";
import { BasicResolver } from "./basic.resolver";
import { BasicService } from "./basic.service";

@Module({
  imports: [YamlModule],
  providers: [BasicService, BasicResolver],
})
export class BasicModule {}
