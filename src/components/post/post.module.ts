import { Module } from "@nestjs/common";
import { MatterModule } from "../../utils/matter/matter.module";
import { YamlModule } from "../../utils/yaml/yaml.module";
import { PostResolver } from "./post.resolver";
import { PostService } from "./post.service";

@Module({
  imports: [YamlModule, MatterModule],
  providers: [PostService, PostResolver],
})
export class PostModule {}
