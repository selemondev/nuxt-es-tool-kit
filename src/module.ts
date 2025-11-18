import { addImports, defineNuxtModule, createResolver } from "@nuxt/kit";
import {
  esToolkitArray,
  esToolkitFunction,
  esToolkitMath,
  esToolkitObject,
  esToolkitPredicate,
  esToolkitPromise,
  esToolkitString,
  esToolkitUtil,
  esToolkitError,
} from "./runtime/es-toolkit/index";
import { firstLetterToUpperCase } from "./utils";

type Utilities =
  | "array"
  | "function"
  | "math"
  | "object"
  | "predicate"
  | "promise"
  | "string"
  | "util"
  | "error";

export interface ModuleOptions {
  prefix: string;
  alias: Iterable<[string, string]>;
  utilities: Utilities[];
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-es-toolkit",
    configKey: "esToolkit",
  },
  defaults: {
    prefix: "",
    alias: [],
    utilities: [],
  },
  setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const aliasMap = new Map<string, string>(_options.alias);
    const optionsObj = {
      array: {
        name: "esToolkitArray",
        import: esToolkitArray,
      },
      function: {
        name: "esToolkitFunction",
        import: esToolkitFunction,
      },
      math: {
        name: "esToolkitMath",
        import: esToolkitMath,
      },
      object: {
        name: "esToolkitObject",
        import: esToolkitObject,
      },
      predicate: {
        name: "esToolkitPredicate",
        import: esToolkitPredicate,
      },
      promise: {
        name: "esToolkitPromise",
        import: esToolkitPromise,
      },
      string: {
        name: "esToolkitString",
        import: esToolkitString,
      },
      util: {
        name: "esToolkitUtil",
        import: esToolkitUtil,
      },
      error: {
        name: 'esToolkitError',
        import: esToolkitError
      }
    };
    _options.utilities.forEach((utility) => {
      if (Object.keys(optionsObj).includes(utility)) {
        for (const name of Object.keys(optionsObj[utility]?.import)) {
          const alias = aliasMap.has(name) ? aliasMap.get(name)! : name;
          const as = _options.prefix
            ? _options.prefix + firstLetterToUpperCase(alias)
            : alias;
          addImports({
            name: name,
            as,
            from: resolve(`./runtime/es-toolkit/es-toolkit-${utility}`),
          });
          _nuxt.hook("nitro:config", (nitroConfig) => {
            nitroConfig.imports = nitroConfig.imports || {};
            nitroConfig.imports.presets = nitroConfig.imports.presets || [];
            nitroConfig.imports.presets.push({
              from: resolve(`./runtime/es-toolkit/es-toolkit-${utility}`),
              imports: [{ name, as }],
            });
          });
        }
      }
    });
  },
});
