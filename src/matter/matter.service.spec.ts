import { Test, TestingModule } from "@nestjs/testing";
import { MatterService } from "./matter.service";

describe("MatterService", () => {
  let service: MatterService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatterService],
    }).compile();
    service = module.get<MatterService>(MatterService);
  });
  it("return parsed data", () => {
    expect(service.parser("---\nabc: xyz\n---\n\nI'm fine")).toStrictEqual({
      content: "I'm fine",
      data: { abc: "xyz" },
    });
  });
  it("return assets parse data", async () => {
    expect(await service.readFile("test")).toStrictEqual({
      content: "# a\n## b\n### c\n",
      data: {
        title: "Something1",
        id: "test",
        emoji: "🚧",
        date: "2020-12-25",
        tags: ["a", "b", "c"],
      },
    });
  });
  it("return fetch parse data", async () => {
    expect(await service.fetchFile("hello-world")).toStrictEqual({
      content: "##" +
        " ブログ開設しました\n\nこんにちは、[@Re-taro](https://twitter.com/10969_rintaro/)です。\n\nこの度ブログをポートフォリオの内部に開設しました。\n\n一応雑多ブログのつもりですが、技術メインで色々アウトプットできる場にしていきたいと考えてます。\n\nそれでは。",
      data: {
        title: "Hello World",
        id: "hello-world",
        emoji: "👋",
        date: "2022-01-05",
        tags: ["develop", "hello"]
      }
    })
  })
});
