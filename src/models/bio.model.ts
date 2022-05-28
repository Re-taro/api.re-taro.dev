import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Bio {
  @Field({ nullable: false })
  date: string;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  action: string;
}
