import {builder} from '../builder.js';
import './postOperations.js';
import './userOperations.js';
import './voteOperations.js';
import './commentOperations.js';
import './messageOperations.js';
import '../types.js';

builder.queryType({
  fields: (t) => ({})
});

builder.mutationType({
  fields: (t) => ({})
});

builder.subscriptionType({
  fields: (t) => ({})
});

builder.queryFields((t) => ({
  info: t.string({resolve: () => `This is the API of a Hackernews Clone`}),
}));

export default builder.toSchema();
