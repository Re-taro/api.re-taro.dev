import { Test, TestingModule } from "@nestjs/testing";
import { PostService } from "./post.service";
import { YamlModule } from "../../utils/yaml/yaml.module";
import { MatterModule } from "../../utils/matter/matter.module";
import { Post } from "./type/post.model";
import { PostId, PostTag } from "./type/post.argument";

describe("PostService", () => {
  let service: PostService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [YamlModule, MatterModule],
      providers: [PostService],
    }).compile();
    service = module.get<PostService>(PostService);
  });
  it("return post data from id", async () => {
    const post1 = new Post(
      {
        title: "Something1",
        id: "test",
        emoji: "🚧",
        date: "2020-12-25",
        tags: ["a", "b", "c"],
      },
      "# a\n## b\n### c\n",
    );
    const arg1 = { id: "test" } as PostId;
    expect(await service.fetchPostById(arg1)).toStrictEqual(post1);
  });
  it("return posts data from tag", async () => {
    const arg2 = { tag: "a" } as PostTag;
    expect(await service.fetchPostsByTag(arg2)).toStrictEqual([
      {
        title: "Something1",
        id: "test",
        emoji: "🚧",
        date: "2020-12-25",
        tags: ["a", "b", "c"],
      },
      {
        title: "Something3",
        id: "b",
        emoji: "🚧",
        date: "2020-01-01",
        tags: ["a", "d", "i"],
      },
    ]);
  });
  it("return posts data", async () => {
    expect(await service.fetchPosts()).toStrictEqual([
      {
        title: "Something1",
        id: "test",
        emoji: "🚧",
        date: "2020-12-25",
        tags: ["a", "b", "c"],
      },
      {
        title: "Something2",
        id: "a",
        emoji: "🚧",
        date: "2021-10-10",
        tags: ["d", "e", "f"],
      },
      {
        title: "Something3",
        id: "b",
        emoji: "🚧",
        date: "2020-01-01",
        tags: ["a", "d", "i"],
      },
    ]);
  });
});
