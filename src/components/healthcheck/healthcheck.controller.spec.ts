import { Test, TestingModule } from "@nestjs/testing";
import { HealthcheckController } from "./healthcheck.controller";
import { HealthcheckService } from "./healthcheck.service";

describe("HealthcheckController", () => {
  let controller: HealthcheckController;
  let service: HealthcheckService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthcheckController],
      providers: [HealthcheckService],
    }).compile();
    controller = module.get<HealthcheckController>(HealthcheckController);
    service = module.get<HealthcheckService>(HealthcheckService);
  });
  it("return 'Ok' in string", () => {
    const result: string = "Ok";
    jest.spyOn(service, "healthcheck").mockImplementation(() => result);
    expect(controller.healthcheck()).toBe(result);
  });
});
