import {builder, prisma} from "../builder";
import {VoteDto} from "../types";
import {pubSub} from "../pubsub";
import {Vote} from "../../.prisma";

builder.queryFields(t => ({
  votes: t.prismaField({
    type: ['Vote'],
    args: {
      postId: t.arg.string({required: true}),
    },
    resolve: async (query, root, args, ctx, info) =>
      prisma.vote.findMany({
        ...query,
        where: {postId: args.postId},
      })
  })
}));

builder.mutationFields(t => ({
  createVote: t
    .withAuth({authenticated: true})
    .field({
      type: VoteDto,
      args: {
        postId: t.arg.string({required: true}),
      },
      resolve: async (root, args, ctx, info) => {
        const existingVote = await prisma.vote.findUnique({
          where: {
            postId_userId: {postId: args.postId, userId: ctx.currentUserId}
          }
        });
        if (existingVote) {
          throw new Error(`Already voted for post: ${args.postId}`);
        }
        const newVote = await prisma.vote.create({
          data: {...args, userId: ctx.currentUserId},
        });
        pubSub.publish('newVote', { newVote });
        return newVote;
      }
    })
}));

builder.subscriptionFields(t => ({
  newVote: t.field({
    type: VoteDto,
    resolve: async (value: { newVote: Vote }) => value.newVote,
    subscribe: async (root, args, ctx) => pubSub.subscribe('newVote')
  })
}));
