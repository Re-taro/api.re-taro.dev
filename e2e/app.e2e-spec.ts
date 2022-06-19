import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("end to end test", () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });
  const healthCheck = async (): Promise<request.Response> => {
    return await request(app.getHttpServer()).get("/healthcheck");
  };
  const fetchBasic = async (): Promise<request.Response> => {
    return await request(app.getHttpServer()).post("/graphql").send({
      query:
        "query {\n \tbasic {\n    name {\n      primary\n      position\n    }\n    affiliation {\n      assign\n      location\n    }\n  }\n}",
    });
  };
  const fetchBio = async (): Promise<request.Response> => {
    return await request(app.getHttpServer()).post("/graphql").send({
      query: "query {\n \tbio {\n    action\n    title\n  }\n}",
    });
  };
  const fetchPostById = async (id: string): Promise<request.Response> => {
    return await request(app.getHttpServer())
      .post("/graphql")
      .send({
        query: `query {\n \tpostById(id: \"${id}\") {\n    content\n    header {\n      emoji\n      tags\n      title\n    }\n  }\n}`,
      });
  };
  const fetchPostsByTag = async (tag: string): Promise<request.Response> => {
    return await request(app.getHttpServer())
      .post("/graphql")
      .send({
        query: `query {\n \tpostsByTag(tag: \"${tag}\") {\n    date\n    title\n    tags\n  }\n}`,
      });
  };
  const fetchPosts = async (): Promise<request.Response> => {
    return await request(app.getHttpServer()).post("/graphql").send({
      query: "query {\n  \tposts {\n    id\n    tags\n    title\n  }\n}",
    });
  };
  const fetchWork = async (id: string): Promise<request.Response> => {
    return await request(app.getHttpServer())
      .post("/graphql")
      .send({
        query: `query {\n  \twork(id: \"${id}\") {\n    date\n    title\n    id\n    work_page {\n      detail\n      meta {\n        blog_post {\n          title\n          url\n        }\n        platform\n        stack {\n          icon\n          name\n        }\n      }\n    }\n  }\n}`,
      });
  };
  const fetchWorks = async (): Promise<request.Response> => {
    return await request(app.getHttpServer()).post("/graphql").send({
      query: "query {\n  \tworks {\n    date\n    id\n    title\n    description\n  }\n}",
    });
  };
  it("/healthcheck GET", async () => {
    const res = await healthCheck();
    expect(res.status).toBe(200);
    expect(res.text).toEqual("Ok");
  });
  it("/graphql basic", async () => {
    const res = await fetchBasic();
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      data: {
        basic: {
          name: {
            primary: "Rintaro Itokawa",
            position: "でべろっぱ",
          },
          affiliation: {
            assign: "3rd grade, Information dep.",
            location: "NITSC",
          },
        },
      },
    });
  });
  it("/graphql bio", async () => {
    const res = await fetchBio();
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      data: {
        bio: [
          {
            action: "admission",
            title: "Enter to NITSC",
          },
          {
            action: "evolution",
            title: "Evolution",
          },
        ],
      },
    });
  });
  it("/graphql postById", async () => {
    const res = await fetchPostById("test");
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      data: {
        postById: {
          content: "# a\n## b\n### c\n",
          header: {
            emoji: "🚧",
            tags: ["a", "b", "c"],
            title: "Something1",
          },
        },
      },
    });
  });
  it("/graphql postsByTag", async () => {
    const res = await fetchPostsByTag("a");
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      data: {
        postsByTag: [
          {
            date: "2020-12-25",
            title: "Something1",
            tags: ["a", "b", "c"],
          },
          {
            date: "2020-01-01",
            title: "Something3",
            tags: ["a", "d", "i"],
          },
        ],
      },
    });
  });
  it("/graphql posts", async () => {
    const res = await fetchPosts();
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      data: {
        posts: [
          {
            id: "test",
            tags: ["a", "b", "c"],
            title: "Something1",
          },
          {
            id: "a",
            tags: ["d", "e", "f"],
            title: "Something2",
          },
          {
            id: "b",
            tags: ["a", "d", "i"],
            title: "Something3",
          },
        ],
      },
    });
  });
  it("/graphql work", async () => {
    const res = await fetchWork("something1");
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      data: {
        work: {
          date: "2020-12-25",
          title: "Something1",
          id: "something1",
          work_page: {
            detail: "Something I do.",
            meta: {
              blog_post: {
                title: "Something",
                url: "https://example.com",
              },
              platform: ["linux"],
              stack: [
                {
                  icon: "logos:rust",
                  name: "Rust",
                },
              ],
            },
          },
        },
      },
    });
  });
  it("/graphql works", async () => {
    const res = await fetchWorks();
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      data: {
        works: [
          {
            date: "2020-12-25",
            id: "something1",
            title: "Something1",
            description: "test",
          },
          {
            date: "2021-01-01",
            id: "something2",
            title: "Something2",
            description: "test",
          },
          {
            date: "2022-02-14",
            id: "something3",
            title: "Something3",
            description: "test",
          },
        ],
      },
    });
  });
});
