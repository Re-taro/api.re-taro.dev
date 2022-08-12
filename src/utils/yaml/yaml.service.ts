import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { parse } from "yaml";

@Injectable()
export class YamlService {
  // eslint-disable-next-line class-methods-use-this
  async readFile<T>(path: string): Promise<T> {
    const filePath = resolve(process.cwd(), "assets", path);
    const raw = await readFile(filePath, "utf8");
    return parse<T>(raw);
  }

  // eslint-disable-next-line class-methods-use-this
  async fetchFile<T>(path: string): Promise<T> {
    const raw = await axios.get<string>(`https://raw.githubusercontent.com/Re-taro/re-taro.d/main/${path}`);
    return parse<T>(raw.data);
  }
}
