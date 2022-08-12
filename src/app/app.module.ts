import { Module } from "@nestjs/common";
import { Components } from "../components";
import { EnvironmentModule } from "../config/environment/getter/getter.module";
import { GraphQLConfig } from "../config/graphql/graphql.config";

@Module({
  imports: [EnvironmentModule, GraphQLConfig, ...Components],
})
export class AppModule {}
