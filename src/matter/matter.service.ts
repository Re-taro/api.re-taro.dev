import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { parse } from "yaml";

@Injectable()
export class MatterService {
  // eslint-disable-next-line class-methods-use-this
  parser<T>(code: string): { content: string; data: T } {
    // eslint-disable-next-line init-declarations
    let data: T;
    const content = code.replace(
      // eslint-disable-next-line prefer-named-capture-group,require-unicode-regexp, regexp/match-any
      /^---.*\r?\n([\S\s]*?)---\n\n/,
      // eslint-disable-next-line id-length
      (_, d) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        data = parse<T>(d);
        return "";
      },
    );
    return { content, data };
  }

  async readFile<T>(path: string): Promise<{ content: string; data: T }> {
    const filePath = resolve(process.cwd(), "assets/blog", path, "main.md");
    const raw = await readFile(filePath, "utf8");
    return this.parser(raw);
  }

  async fetchFile<T>(path: string): Promise<{ content: string; data: T }> {
    const raw = await axios.get<string>(
      `https://raw.githubusercontent.com/Re-taro/re-taro.d/main/blog/${path}/main.md`,
    );
    return this.parser(raw.data);
  }
}
