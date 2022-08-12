import { Injectable } from '@nestjs/common';
import {YamlService} from "../../utils/yaml/yaml.service";
import {Basic} from "./type/basic.model";

const BASIC = "basic.yaml";

@Injectable()
export class BasicService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly yamlService: YamlService) {}

  async fetchBasic(): Promise<Basic> {
    return process.env.NODE_ENV === "production"
      ? // eslint-disable-next-line no-return-await
      await this.yamlService.fetchFile<Basic>(BASIC)
      : // eslint-disable-next-line no-return-await,security/detect-non-literal-fs-filename
      await this.yamlService.readFile<Basic>(BASIC);
  }
}
