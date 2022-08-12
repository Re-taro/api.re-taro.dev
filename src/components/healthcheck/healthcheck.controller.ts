import { Controller, Get } from "@nestjs/common";
import { HealthcheckService } from "./healthcheck.service";

@Controller("healthcheck")
export class HealthcheckController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly healthCheckService: HealthcheckService) {}

  @Get()
  healthcheck(): string {
    return this.healthCheckService.healthcheck();
  }
}
