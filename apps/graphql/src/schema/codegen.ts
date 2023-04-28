import type { CodegenConfig } from '@graphql-codegen/cli'
import { printSchema } from 'graphql';
import schema from './index';

const config: CodegenConfig = {
  schema: printSchema(schema),
  generates: {
    './src/schema/generated/schema.graphql': {
      plugins: ['schema-ast'],
    },
    '../chat-app/src/gql/generated/': {
      documents: ['../chat-app/src/gql/*.graphql'],
      preset: 'client',
      config: {
        withHooks: true,
      }
    }
  },
  config: {
    scalars: {
      DateTime: 'Date',
      UUID: 'string'
    }
  }
}
export default config
