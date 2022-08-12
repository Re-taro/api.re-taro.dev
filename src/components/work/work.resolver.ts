import { Args, Query, Resolver } from "@nestjs/graphql";
import { WorkId } from "./type/work.argument";
import { Work } from "./type/work.model";
import { WorkService } from "./work.service";

@Resolver()
export class WorkResolver {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly workService: WorkService) {}

  @Query(() => Work, { name: "work" })
  fetchWork(@Args() argument: WorkId): Promise<Work> {
    return this.workService.fetchWork(argument);
  }

  @Query(() => [Work], { name: "works" })
  fetchWorks(): Promise<Array<Work>> {
    return this.workService.fetchWorks();
  }
}
