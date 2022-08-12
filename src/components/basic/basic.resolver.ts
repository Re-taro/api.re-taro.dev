import { Query, Resolver } from "@nestjs/graphql";
import { BasicService } from "./basic.service";
import { Basic } from "./type/basic.model";

@Resolver()
export class BasicResolver {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly basicService: BasicService) {}

  @Query(() => Basic, { name: "basic" })
  fetchBasic(): Promise<Basic> {
    return this.basicService.fetchBasic();
  }
}
