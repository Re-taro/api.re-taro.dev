import { join } from "node:path";
import { ApolloDriver, type ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { match } from "ts-pattern";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { Environment } from "../environment/getter/getter.service";
import { ConfigService } from "@nestjs/config";

const env = new Environment(new ConfigService());

const GraphQLConfigDevelop = () =>
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    path: "/graphql",
    introspection: true,
    cache: "bounded",
    autoSchemaFile: join(process.cwd(), "./graphql/schema.graphql"),
    sortSchema: true,
    playground: false,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
    debug: true,
  });

const GraphQLConfigProduction = () =>
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    apollo: env.ApolloStudioConfig,
    path: "/graphql",
    introspection: true,
    cache: "bounded",
    autoSchemaFile: join(process.cwd(), "./graphql/schema.graphql"),
    sortSchema: true,
    playground: false,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  });

const GraphQLConfigTest = () =>
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    path: "/graphql",
    cache: "bounded",
    autoSchemaFile: join(process.cwd(), "./graphql/schema.graphql"),
    playground: false,
  });

const GraphQLConfig = match(env.NodeEnv)
  .with("develop", () => GraphQLConfigDevelop())
  .with("production", () => GraphQLConfigProduction())
  .with("test", () => GraphQLConfigTest())
  .otherwise(() => GraphQLConfigDevelop());

export { GraphQLConfig };
