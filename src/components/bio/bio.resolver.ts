import { Query, Resolver } from "@nestjs/graphql";
import { BioService } from "./bio.service";
import { Bio } from "./type/bio.model";

@Resolver()
export class BioResolver {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly bioService: BioService) {}

  @Query(() => [Bio], { name: "bio" })
  fetchBio(): Promise<Array<Bio>> {
    return this.bioService.fetchBio();
  }
}
