import { Test, TestingModule } from '@nestjs/testing';
import { WorkService } from './work.service';
import {YamlModule} from "../../utils/yaml/yaml.module";
import {WorkId} from "./type/work.argument";

describe('WorkService', () => {
  let service: WorkService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [YamlModule],
      providers: [WorkService],
    }).compile();
    service = module.get<WorkService>(WorkService);
  });
  it("return work by id", async () => {
    const arg1 = { id: "something1" } as WorkId
    expect(await service.fetchWork(arg1)).toStrictEqual({
      title: "Something1",
      date: "2020-12-25",
      description: "test",
      id: "something1",
      imageUrl: "https://raw.githubusercontent.com/Re-taro/re-taro.d/main/images/test.jpg",
      workPage: {
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
          blogPost: {
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
        imageUrl: "https://raw.githubusercontent.com/Re-taro/re-taro.d/main/images/test.jpg",
        workPage: {
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
            blogPost: {
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
        imageUrl: "https://raw.githubusercontent.com/Re-taro/re-taro.d/main/images/test.jpg",
        workPage: {
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
            blogPost: {
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
        imageUrl: "https://raw.githubusercontent.com/Re-taro/re-taro.d/main/images/test.jpg",
        workPage: {
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
