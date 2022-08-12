import { Injectable } from "@nestjs/common";
import { MatterService } from "../../utils/matter/matter.service";
import { YamlService } from "../../utils/yaml/yaml.service";
import { PostId, PostTag } from "./type/post.argument";
import { Post, PostHeader } from "./type/post.model";

const POSTS = "posts.yaml";

@Injectable()
export class PostService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly matterService: MatterService, private readonly yamlService: YamlService) {}

  async fetchPostById(argument: PostId): Promise<Post> {
    const postsHeader =
      process.env.NODE_ENV === "production"
        ? await this.yamlService.fetchFile<Array<PostHeader>>(POSTS)
        : // eslint-disable-next-line security/detect-non-literal-fs-filename
          await this.yamlService.readFile<Array<PostHeader>>(POSTS);
    const post =
      process.env.NODE_ENV === "production"
        ? await this.matterService.fetchFile<PostHeader>(postsHeader.find(po => po.id === argument.id).id)
        : // eslint-disable-next-line security/detect-non-literal-fs-filename
          await this.matterService.readFile<PostHeader>(postsHeader.find(po => po.id === argument.id).id);
    return new Post(post.data, post.content);
  }

  async fetchPostsByTag(argument: PostTag): Promise<Array<PostHeader>> {
    const postsHeader =
      process.env.NODE_ENV === "production"
        ? await this.yamlService.fetchFile<Array<PostHeader>>(POSTS)
        : // eslint-disable-next-line security/detect-non-literal-fs-filename
          await this.yamlService.readFile<Array<PostHeader>>(POSTS);
    return postsHeader.filter(po => po.tags.includes(argument.tag));
  }

  async fetchPosts(): Promise<Array<PostHeader>> {
    return process.env.NODE_ENV === "production"
      ? // eslint-disable-next-line no-return-await
        await this.yamlService.fetchFile<Array<PostHeader>>(POSTS)
      : // eslint-disable-next-line security/detect-non-literal-fs-filename,no-return-await
        await this.yamlService.readFile<Array<PostHeader>>(POSTS);
  }
}
