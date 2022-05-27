import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthcheckService {
  // eslint-disable-next-line class-methods-use-this
  healthcheck(): string {
    return "Ok";
  }
}
