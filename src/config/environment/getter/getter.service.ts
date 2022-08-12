import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { ApolloConfigInput } from "apollo-server-types";

@Injectable()
export class Environment {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly configService: ConfigService) {}

  get NodeEnv(): string {
    return this.configService.get<string>("NODE_ENV", "production");
  }

  get Port(): number {
    return this.configService.get<number>("PORT", 3003);
  }

  get ApolloStudioConfig(): ApolloConfigInput {
    return {
      graphId: this.configService.getOrThrow("APOLLO_GRAPH_ID"),
      key: this.configService.getOrThrow("APOLLO_KEY"),
    };
  }
}
