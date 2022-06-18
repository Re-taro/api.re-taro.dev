import { Resolver, Query, Args } from "@nestjs/graphql";
import { Basic } from "../models/basic.model";
import { Bio } from "../models/bio.model";
import { Post, PostHeader } from "../models/post.model";
import { Work } from "../models/work.model";
import { RepositoryService } from "./repository.service";

@Resolver()
export class RepositoryResolver {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly repositoryService: RepositoryService) {}

  @Query(() => Basic, { name: "basic" })
  fetchBasic(): Promise<Basic> {
    return this.repositoryService.fetchBasic();
  }

  @Query(() => [Bio], { name: "bio" })
  fetchBio(): Promise<Array<Bio>> {
    return this.repositoryService.fetchBio();
  }

  @Query(() => Post, { name: "postById" })
  fetchPostById(@Args("id") id: string): Promise<Post> {
    return this.repositoryService.fetchPostById(id);
  }

  @Query(() => [PostHeader], { name: "postsByTag" })
  fetchPostsByTag(@Args("tag") tag: string): Promise<Array<PostHeader>> {
    return this.repositoryService.fetchPostsByTag(tag);
  }

  @Query(() => [PostHeader], { name: "posts" })
  fetchPosts(): Promise<Array<PostHeader>> {
    return this.repositoryService.fetchPosts();
  }

  @Query(() => Work, { name: "work" })
  fetchWork(@Args("id") id: string): Promise<Work> {
    return this.repositoryService.fetchWork(id);
  }

  @Query(() => [Work], { name: "works" })
  fetchWorks(): Promise<Array<Work>> {
    return this.repositoryService.fetchWorks();
  }
}
