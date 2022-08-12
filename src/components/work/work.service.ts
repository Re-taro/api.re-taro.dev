import { Injectable } from "@nestjs/common";
import { YamlService } from "../../utils/yaml/yaml.service";
import { WorkId } from "./type/work.argument";
import { Work } from "./type/work.model";

const WORKS = "works.yaml";

@Injectable()
export class WorkService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly yamlService: YamlService) {}

  async fetchWork(argument: WorkId): Promise<Work> {
    const works =
      process.env.NODE_ENV === "production"
        ? await this.yamlService.fetchFile<Array<Work>>(WORKS)
        : // eslint-disable-next-line security/detect-non-literal-fs-filename
          await this.yamlService.readFile<Array<Work>>(WORKS);
    return works.find(wo => wo.id === argument.id);
  }

  async fetchWorks(): Promise<Array<Work>> {
    return process.env.NODE_ENV === "production"
      ? // eslint-disable-next-line no-return-await
        await this.yamlService.fetchFile<Array<Work>>(WORKS)
      : // eslint-disable-next-line security/detect-non-literal-fs-filename,no-return-await
        await this.yamlService.readFile<Array<Work>>(WORKS);
  }
}
