import { Test, TestingModule } from "@nestjs/testing";
import { BioService } from "./bio.service";
import { YamlModule } from "../../utils/yaml/yaml.module";

describe("BioService", () => {
  let service: BioService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [YamlModule],
      providers: [BioService],
    }).compile();
    service = module.get<BioService>(BioService);
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
});
