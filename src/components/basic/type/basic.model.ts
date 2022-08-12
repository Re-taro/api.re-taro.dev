/* eslint-disable max-classes-per-file */

import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Name {
  @Field({ nullable: false })
  primary: string;

  @Field({ nullable: false })
  position: string;
}

@ObjectType()
export class Affiliation {
  @Field({ nullable: false })
  location: string;

  @Field({ nullable: false })
  assign: string;
}

@ObjectType()
export class Basic {
  @Field(() => Name, { nullable: false })
  name: Name;

  @Field({ nullable: false })
  introduction: string;

  @Field(() => Affiliation, { nullable: false })
  affiliation: Affiliation;
}

/* eslint-enable max-classes-per-file */
