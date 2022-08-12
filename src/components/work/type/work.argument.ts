import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class WorkId {
  @Field({ nullable: false })
  id: string
}
