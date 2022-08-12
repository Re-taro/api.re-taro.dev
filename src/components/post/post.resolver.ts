import {Args, Query, Resolver} from '@nestjs/graphql';
import {PostService} from "./post.service";
import {PostId, PostTag} from "./type/post.argument";
import {Post, PostHeader} from "./type/post.model";

@Resolver()
export class PostResolver {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly postService: PostService) {}

  @Query(() => Post, { name: "postById" })
  fetchPostById(@Args() argument: PostId ): Promise<Post> {
    return this.postService.fetchPostById(argument);
  }

  @Query(() => [PostHeader], { name: "postsByTag" })
  fetchPostsByTag(@Args() argument: PostTag): Promise<Array<PostHeader>> {
    return this.postService.fetchPostsByTag(argument);
  }

  @Query(() => [PostHeader], { name: "posts" })
  fetchPosts(): Promise<Array<PostHeader>> {
    return this.postService.fetchPosts();
  }
}
