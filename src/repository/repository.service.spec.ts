import { Test, TestingModule } from "@nestjs/testing";
import { RepositoryService } from "./repository.service";
import { YamlModule } from "../yaml/yaml.module";
import { MatterModule } from "../matter/matter.module";
import { Post } from "../models/post.model";

describe("RepositoryService", () => {
  let service: RepositoryService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [YamlModule, MatterModule],
      providers: [RepositoryService],
    }).compile();
    service = module.get<RepositoryService>(RepositoryService);
  });
  it("return basic data", async () => {
    expect(await service.fetchBasic()).toStrictEqual({
      name: {
        primary: "Rintaro Itokawa",
        position: "でべろっぱ",
      },
      introduction: "りんちゃんです。",
      affiliation: {
        location: "NITSC",
        assign: "3rd grade, Information dep.",
      },
    });
  });
  it("return bio data", async () => {
    expect(await service.fetchBio()).toStrictEqual([
      {
        action: "admission",
        date: "2020-04-07",
        title: "Enter to NITSC",
      },
      {
        action: "evolution",
        date: "2021-04-25",
        title: "Evolution",
      },
    ]);
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
    expect(await service.fetchPostById("test")).toStrictEqual(post1);
  });
  it("return posts data from tag", async () => {
    expect(await service.fetchPostsByTag("a")).toStrictEqual([
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
  it("return work by id", async () => {
    expect(await service.fetchWork("something1")).toStrictEqual({
      title: "Something1",
      date: "2020-12-25",
      description: "test",
      id: "something1",
      image_url: "https://raw.githubusercontent.com/Re-taro/re-taro.d/main/images/test.jpg",
      work_page: {
        title: "Something",
        detail: "Something I do.",
        meta: {
          website: "https://example.com",
          platform: ["linux"],
          stack: [
            {
              icon: "logos:rust",
              name: "Rust",
            },
          ],
          blog_post: {
            title: "Something",
            url: "https://example.com",
          },
          presentation: {
            title: "Something",
            url: "https://example.com",
          },
          source: "https://github.com",
        },
        images: [
          "https://raw.githubusercontent.com/Re-taro/re-taro.d/main/images/test.jpg",
          "https://raw.githubusercontent.com/Re-taro/re-taro.d/main/images/test.jpg",
          "https://raw.githubusercontent.com/Re-taro/re-taro.d/main/images/test.jpg",
        ],
      },
    });
  });
  it("return works data", async () => {
    expect(await service.fetchWorks()).toStrictEqual([
      {
        title: "Something1",
        date: "2020-12-25",
        description: "test",
        id: "something1",
        image_url: "https://raw.githubusercontent.com/Re-taro/re-taro.d/main/images/test.jpg",
        work_page: {
          title: "Something",
          detail: "Something I do.",
          meta: {
            website: "https://example.com",
            platform: ["linux"],
            stack: [
              {
                icon: "logos:rust",
                name: "Rust",
              },
            ],
            blog_post: {
              title: "Something",
              url: "https://example.com",
            },
            presentation: {
              title: "Something",
              url: "https://example.com",
            },
            source: "https://github.com",
          },
          images: [
            "https://raw.githubusercontent.com/Re-taro/re-taro.d/main/images/test.jpg",
            "https://raw.githubusercontent.com/Re-taro/re-taro.d/main/images/test.jpg",
            "https://raw.githubusercontent.com/Re-taro/re-taro.d/main/images/test.jpg",
          ],
        },
      },
      {
        title: "Something2",
        id: "something2",
        date: "2021-01-01",
        description: "test",
        image_url: "https://raw.githubusercontent.com/Re-taro/re-taro.d/main/images/test.jpg",
        work_page: {
          title: "Something",
          detail: "Something I do.",
          meta: {
            website: "https://example.com",
            platform: ["linux"],
            stack: [
              {
                icon: "logos:rust",
                name: "Rust",
              },
            ],
            blog_post: {
              title: "Something",
              url: "https://example.com",
            },
            source: "https://github.com",
          },
          images: ["https://raw.githubusercontent.com/Re-taro/re-taro.d/main/images/test.jpg"],
        },
      },
      {
        title: "Something3",
        date: "2022-02-14",
        description: "test",
        id: "something3",
        image_url: "https://raw.githubusercontent.com/Re-taro/re-taro.d/main/images/test.jpg",
        work_page: {
          title: "Something",
          detail: "Something I do.",
          meta: {
            website: "https://example.com",
            platform: ["linux"],
            stack: [
              {
                icon: "logos:rust",
                name: "Rust",
              },
            ],
            source: "https://github.com",
          },
        },
      },
    ]);
  });
});
