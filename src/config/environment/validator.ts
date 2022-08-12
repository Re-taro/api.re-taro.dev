import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";

class EnvironmentValidator {
  NODE_ENV: "development" | "production" | "test";

  PORT = 3003;

  APOLLO_KEY: string;

  APOLLO_GRAPH_ID: string;
}

const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToClass(EnvironmentValidator, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};

export { validate };
