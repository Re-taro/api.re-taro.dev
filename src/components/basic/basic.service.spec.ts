import { Test, TestingModule } from '@nestjs/testing';
import { BasicService } from './basic.service';
import {YamlModule} from "../../utils/yaml/yaml.module";

describe('BasicService', () => {
  let service: BasicService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [YamlModule],
      providers: [BasicService],
    }).compile();
    service = module.get<BasicService>(BasicService);
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
});
