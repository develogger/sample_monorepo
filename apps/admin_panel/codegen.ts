import { CodegenConfig } from '@graphql-codegen/cli';
import 'dotenv/config';
const token = process.env.TOKEN_API;
const config: CodegenConfig = {
  config: {
    headers: {
      Authorization: token,
    },
  },
  documents: ['src/services/**/*.{ts,tsx,vue}'],
  generates: {
    './src/graphql/': {
      config: {
        enumsAsTypes: false,
        futureProofEnums: true,
        noExport: false,
      },
      preset: 'client',
      presetConfig: {
        importTypesNamespace: 'SchemaTypes',
      },
    },
  },
  ignoreNoDocuments: true,
  overwrite: true,
  schema: [
    'https://v4-demo.hamrah.in/api/v4/graphql',
    'https://v4-demo.hamrah.in/api/v4/graphql/out',
  ],
};

export default config;
