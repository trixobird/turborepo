import {builder} from "../builder";
import './postOperations';
import './userOperations';
import './voteOperations';
import './commentOperations';
import './messageOperations';
import '../types';

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
