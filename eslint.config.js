import { defineConfig } from "eslint/config";
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettier from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
    {
        files: ["**/*.ts", "**/*.cts", "**/*.mts"],
        plugins: {
            prettier,
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    trailingComma: 'all',
                },
            ],

            'simple-import-sort/imports': 2,
            'simple-import-sort/exports': 2,
        },
      languageOptions: {
          parser: tsParser,
      }
    },
]);