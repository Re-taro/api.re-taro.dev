import type { ParseOptions, DocumentOptions, SchemaOptions, ToJSOptions } from "yaml";
import type { Reviver } from "yaml/dist/doc/applyReviver";

declare module "yaml" {
  // eslint-disable-next-line unicorn/prevent-abbreviations
  function parse<T>(src: string, options?: ParseOptions & DocumentOptions & SchemaOptions & ToJSOptions): T;
  // eslint-disable-next-line unicorn/prevent-abbreviations
  function parse<T>(
    src: string,
    reviver: Reviver,
    options?: ParseOptions & DocumentOptions & SchemaOptions & ToJSOptions,
  ): T;
}
