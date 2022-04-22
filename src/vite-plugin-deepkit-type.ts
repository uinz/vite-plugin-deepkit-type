import { Plugin } from "vite";
import { transformer, declarationTransformer } from "@deepkit/type-compiler";
import { transpileModule } from "typescript";

export interface Options {
  test: RegExp;
}

export function deepkitType(options: Options): Plugin {
  throw new Error("not implemented yet");

  return {
    name: "deepkit-type",
    enforce: "pre",
    transform(code, fileName) {
      if (!options.test.test(fileName)) return;

      const transformed = transpileModule(code, {
        fileName,
        transformers: {
          before: [transformer],
          after: [declarationTransformer],
        },
      });

      return {
        code: transformed.outputText,
        map: transformed.sourceMapText,
      };
    },
  };
}
