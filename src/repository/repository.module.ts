import { join } from "node:path";
import { ApolloDriver, type ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MatterModule } from "../matter/matter.module";
import { YamlModule } from "../yaml/yaml.module";
import { RepositoryResolver } from "./repository.resolver";
import { RepositoryService } from "./repository.service";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), "graphql/schema.graphql"),
      debug: process.env.NODE_ENV !== "production",
      driver: ApolloDriver,
      playground: process.env.NODE_ENV !== "production",
      sortSchema: true,
    }),
    MatterModule,
    YamlModule,
  ],
  providers: [RepositoryService, RepositoryResolver],
})
export class RepositoryModule {}
