/* eslint-disable max-classes-per-file */

import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PostHeader {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  emoji: string;

  @Field({ nullable: false })
  date: string;

  @Field({ nullable: false })
  tags: Array<string>;
}

@ObjectType()
export class Post {
  constructor(header: PostHeader, content: string) {
    this.header = header;
    this.content = content;
  }

  @Field(() => PostHeader, { nullable: false })
  header: PostHeader;

  @Field({ nullable: false })
  content: string;
}

/* eslint-enable */
