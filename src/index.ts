import type { TSESLint } from "@typescript-eslint/utils";

import type { Linter } from "eslint";

import { name as packageName, version as packageVersion } from "../package.json";
import { luaTruthiness } from "./rules/lua-truthiness/rule";
import { misleadingLuaTupleChecks } from "./rules/misleading-lua-tuple-checks/rule";
import { noAny } from "./rules/no-any/rule";
import { noArrayPairs } from "./rules/no-array-pairs/rule";
import { noEnumMerging } from "./rules/no-enum-merging/rule";
import { noExportAssignableLet } from "./rules/no-export-assignment-let/rule";
import { noForIn } from "./rules/no-for-in/rule";
import { noFunctionExpressionName } from "./rules/no-function-expression-name/rule";
import { noGetSet } from "./rules/no-get-set/rule";
import { noImplicitSelf } from "./rules/no-implicit-self/rule";
import { noInvalidIdentifier } from "./rules/no-invalid-identifier/rule";
import { noNamespaceMerging } from "./rules/no-namespace-merging/rule";
import { noNull } from "./rules/no-null/rule";
import { noObjectMath } from "./rules/no-object-math/rule";
import { noPostFixNew } from "./rules/no-post-fix-new/rule";
import { noPrecedingSpreadElement } from "./rules/no-preceding-spread-element/rule";
import { noPrivateIdentifier } from "./rules/no-private-identifier/rule";
import { noUnsupportedSyntax } from "./rules/no-unsupported-syntax/rule";
import { noUserDefinedLuaTuple } from "./rules/no-user-defined-lua-tuple/rule";
import { noValueTypeof } from "./rules/no-value-typeof/rule";
import { preferGetPlayers } from "./rules/prefer-get-players/rule";
import { preferTaskLibrary } from "./rules/prefer-task-library/rule";
import { sizeMethod } from "./rules/size-method/rule";

const PLUGIN_NAME = packageName.replace(/^eslint-plugin-/, "");

/**
 * Generates a rules record where all plugin rules are set to "error".
 *
 * @param pluginName - The plugin identifier used to prefix rule names.
 * @param rules - The rules record to transform.
 * @returns A Linter.RulesRecord with all rules enabled.
 */
function getRules(
	pluginName: string,
	rules: Record<string, TSESLint.RuleModule<any, any>>,
): Linter.RulesRecord {
	return Object.fromEntries(
		Object.keys(rules).map((ruleName) => [`${pluginName}/${ruleName}`, "error"]),
	);
}

const plugin = {
	meta: {
		name: PLUGIN_NAME,
		version: packageVersion,
	},
	rules: {
		"lua-truthiness": luaTruthiness,
		"misleading-lua-tuple-checks": misleadingLuaTupleChecks,
		"no-any": noAny,
		"no-array-pairs": noArrayPairs,
		"no-enum-merging": noEnumMerging,
		"no-export-assignment-let": noExportAssignableLet,
		"no-for-in": noForIn,
		"no-function-expression-name": noFunctionExpressionName,
		"no-get-set": noGetSet,
		"no-implicit-self": noImplicitSelf,
		"no-invalid-identifier": noInvalidIdentifier,
		"no-namespace-merging": noNamespaceMerging,
		"no-null": noNull,
		"no-object-math": noObjectMath,
		"no-post-fix-new": noPostFixNew,
		"no-preceding-spread-element": noPrecedingSpreadElement,
		"no-private-identifier": noPrivateIdentifier,
		"no-unsupported-syntax": noUnsupportedSyntax,
		"no-user-defined-lua-tuple": noUserDefinedLuaTuple,
		"no-value-typeof": noValueTypeof,
		"prefer-get-players": preferGetPlayers,
		"prefer-task-library": preferTaskLibrary,
		"size-method": sizeMethod,
	},
} satisfies TSESLint.FlatConfig.Plugin;

const allRules = getRules(PLUGIN_NAME, plugin.rules);

const configs = {
	/**
	 * Recommended configuration for ESLint v9+ (flat config). Enables all
	 * plugin rules.
	 *
	 * @example
	 *
	 * ```ts
	 * // eslint.config.js
	 * import roblox from "eslint-plugin-roblox-ts-x";
	 *
	 * export default [roblox.configs.recommended];
	 * ```
	 */
	"recommended": {
		plugins: {
			[PLUGIN_NAME]: plugin,
		},
		rules: allRules,
	} satisfies TSESLint.FlatConfig.Config,

	/**
	 * Recommended configuration for legacy ESLint v8. Enables all plugin rules.
	 *
	 * @example
	 *
	 * ```ts
	 * // .eslintrc.js
	 * module.exports = {
	 * 	extends: ["plugin:roblox-ts-x/recommended-legacy"],
	 * };
	 * ```
	 */
	"recommended-legacy": {
		plugins: [PLUGIN_NAME],
		rules: allRules,
	} satisfies Linter.LegacyConfig,
};

// Default export for ESLint v9+ (flat config)
export default {
	...plugin,
	configs,
};

// Named exports for ESLint v8 (legacy config)
export const { rules } = plugin;
export { configs };

export type RuleOptions = {
	[K in keyof RuleDefinitions]: RuleDefinitions[K]["defaultOptions"];
};

export type Rules = {
	[K in keyof RuleOptions]: Linter.RuleEntry<RuleOptions[K]>;
};

type RuleDefinitions = typeof plugin.rules;
