import { Injectable } from "@nestjs/common";
import { MatterService } from "../matter/matter.service";
import { Basic } from "../models/basic.model";
import { Bio } from "../models/bio.model";
import { Post, PostHeader } from "../models/post.model";
import { Work } from "../models/work.model";
import { YamlService } from "../yaml/yaml.service";

const BASIC = "basic.yaml";
const BIO = "bio.yaml";
const POSTS = "posts.yaml";
const WORKS = "works.yaml";

@Injectable()
export class RepositoryService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly matterService: MatterService, private readonly yamlService: YamlService) {}

  async fetchBasic(): Promise<Basic> {
    return process.env.NODE_ENV === "production"
      ? // eslint-disable-next-line no-return-await
        await this.yamlService.fetchFile<Basic>(BASIC)
      : // eslint-disable-next-line no-return-await,security/detect-non-literal-fs-filename
        await this.yamlService.readFile<Basic>(BASIC);
  }

  async fetchBio(): Promise<Array<Bio>> {
    return process.env.NODE_ENV === "production"
      ? // eslint-disable-next-line no-return-await
        await this.yamlService.fetchFile<Array<Bio>>(BIO)
      : // eslint-disable-next-line no-return-await,security/detect-non-literal-fs-filename
        await this.yamlService.readFile<Array<Bio>>(BIO);
  }

  async fetchPostById(id: string): Promise<Post> {
    const postsHeader =
      process.env.NODE_ENV === "production"
        ? await this.yamlService.fetchFile<Array<PostHeader>>(POSTS)
        : // eslint-disable-next-line security/detect-non-literal-fs-filename
          await this.yamlService.readFile<Array<PostHeader>>(POSTS);
    const post =
      process.env.NODE_ENV === "production"
        ? await this.matterService.fetchFile<PostHeader>(postsHeader.find(po => po.id === id).id)
        : // eslint-disable-next-line security/detect-non-literal-fs-filename
          await this.matterService.readFile<PostHeader>(postsHeader.find(po => po.id === id).id);
    return new Post(post.data, post.content);
  }

  async fetchPostsByTag(tag: string): Promise<Array<PostHeader>> {
    const postsHeader =
      process.env.NODE_ENV === "production"
        ? await this.yamlService.fetchFile<Array<PostHeader>>(POSTS)
        : // eslint-disable-next-line security/detect-non-literal-fs-filename
          await this.yamlService.readFile<Array<PostHeader>>(POSTS);
    return postsHeader.filter(po => po.tags.includes(tag));
  }

  async fetchPosts(): Promise<Array<PostHeader>> {
    return process.env.NODE_ENV === "production"
      ? // eslint-disable-next-line no-return-await
        await this.yamlService.fetchFile<Array<PostHeader>>(POSTS)
      : // eslint-disable-next-line security/detect-non-literal-fs-filename,no-return-await
        await this.yamlService.readFile<Array<PostHeader>>(POSTS);
  }

  async fetchWork(id: string): Promise<Work> {
    const works =
      process.env.NODE_ENV === "production"
        ? await this.yamlService.fetchFile<Array<Work>>(WORKS)
        : // eslint-disable-next-line security/detect-non-literal-fs-filename
          await this.yamlService.readFile<Array<Work>>(WORKS);
    return works.find(wo => wo.id === id);
  }

  async fetchWorks(): Promise<Array<Work>> {
    return process.env.NODE_ENV === "production"
      ? // eslint-disable-next-line no-return-await
        await this.yamlService.fetchFile<Array<Work>>(WORKS)
      : // eslint-disable-next-line security/detect-non-literal-fs-filename,no-return-await
        await this.yamlService.readFile<Array<Work>>(WORKS);
  }
}
