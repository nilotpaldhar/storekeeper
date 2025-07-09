import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";

import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";

import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Enable support for legacy configs (e.g., eslint:recommended, prettier, etc.)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default defineConfig([
	// Global ignore patterns (equivalent to .eslintignore)
	globalIgnores([
		"**/.next",
		"**/.github",
		"**/.vscode",
		"**/next-env.d.ts",
		"**/node_modules",
		"**/yarn.lock",
		"**/package.json",
		"**/package-lock.json",
		"**/public",
		"**/dist",
		"**/LICENSE",
		"**/CHANGELOG.md",
		"**/CODE_OF_CONDUCT.md",
		"**/CONTRIBUTING.md",
		"**/README.md",
		"**/eslint.config.mjs",
		"src/types/**",
	]),

	// Core ESLint config
	{
		// Legacy config compatibility (Next.js, Prettier, TS rules, etc.)
		extends: compat.extends(
			"next/core-web-vitals",
			"next/typescript",
			"eslint:recommended",
			"plugin:@typescript-eslint/recommended",
			"plugin:@typescript-eslint/stylistic",
			"prettier"
		),

		// Plugin definitions (needed in flat config)
		plugins: {
			"@typescript-eslint": tsPlugin,
			"react-hooks": reactHooks,
			import: importPlugin,
		},

		// Core JS/TS/React/Next config
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: "./tsconfig.json",
			},
			ecmaVersion: "latest",
			sourceType: "module",
		},

		// Linting rules
		rules: {
			// General
			"no-console": ["warn", { allow: ["warn", "error"] }],
			"no-unused-vars": "off",

			// TypeScript
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ argsIgnorePattern: "^_", caughtErrors: "none" },
			],
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-empty-function": ["warn", { allow: ["arrowFunctions"] }],
			"@typescript-eslint/consistent-type-definitions": ["error", "type"],

			// React Hooks
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",

			"import/order": [
				"error",
				{
					groups: [
						"type", // ✅ Type imports FIRST
						"builtin", // Node builtins (fs, path, etc.)
						"external", // npm packages (react, next)
						"internal", // aliased internal modules (hooks, components, lib)
						["parent", "sibling", "index"], // relative imports
					],
					pathGroups: [
						{
							pattern: "@/hooks/**",
							group: "internal",
							position: "before",
						},
						{
							pattern: "@/components/**",
							group: "internal",
							position: "after",
						},
						{
							pattern: "@/lib/**",
							group: "internal",
							position: "after",
						},
					],
					pathGroupsExcludedImportTypes: ["builtin"],
					"newlines-between": "always",
					alphabetize: {
						order: "asc",
						caseInsensitive: true,
					},
				},
			],
		},
	},
]);
