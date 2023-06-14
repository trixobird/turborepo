import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4001/graphql',
  watch: true,
  emitLegacyCommonJSImports: false,
  generates: {
    './src/generated/schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
  config: {
    scalars: {
      Date: 'Date',
      UUID: 'string',
    },
  },
};
export default config;
