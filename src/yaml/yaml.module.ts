import { Module } from "@nestjs/common";
import { YamlService } from "./yaml.service";

@Module({
  exports: [YamlService],
  providers: [YamlService],
})
export class YamlModule {}
