/* eslint-disable max-classes-per-file */

import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class PostId {
  @Field({ nullable: false })
  id: string;
}

@ArgsType()
export class PostTag {
  @Field({ nullable: false })
  tag: string;
}

/* eslint-enable max-classes-per-file */
