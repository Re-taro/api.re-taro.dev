import { Injectable } from "@nestjs/common";
import { YamlService } from "../../utils/yaml/yaml.service";
import { Bio } from "./type/bio.model";

const BIO = "bio.yaml";

@Injectable()
export class BioService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly yamlService: YamlService) {}

  async fetchBio(): Promise<Array<Bio>> {
    return process.env.NODE_ENV === "production"
      ? // eslint-disable-next-line no-return-await
        await this.yamlService.fetchFile<Array<Bio>>(BIO)
      : // eslint-disable-next-line no-return-await,security/detect-non-literal-fs-filename
        await this.yamlService.readFile<Array<Bio>>(BIO);
  }
}
