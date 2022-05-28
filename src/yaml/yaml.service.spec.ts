import { Test, TestingModule } from "@nestjs/testing";
import { Basic } from "../models/basic.model";
import { YamlService } from "./yaml.service";

describe("YamlService", () => {
  let service: YamlService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YamlService],
    }).compile();
    service = module.get<YamlService>(YamlService);
  });
  it("return basic assets data", async () => {
    expect(await service.readFile<Basic>("basic.yaml")).toStrictEqual({
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
  it("return basic fetch data", async () => {
    expect(await service.fetchFile<Basic>("basic.yaml")).toStrictEqual({
      name: {
        primary: "Rintaro Itokawa",
        position: "Digital crafter specializing in Frontend development.",
      },
      introduction:
        "Rintaro is a student developer based in Mie with a passion for building emotional digital services/stuff. He is highly communicative and good at team development. When not online, he loves hanging out with the music.",
      affiliation: {
        location: "National Institute of Technology, Suzuka College ",
        assign: " 3rd grade, Information dep.",
      },
    });
  });
});
