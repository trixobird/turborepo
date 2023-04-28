import {builder, prisma} from '../builder.js';
import {PostDto} from '../types.js';
import { Post } from '../../.prisma';
import {pubSub} from '../pubsub.js';

builder.queryFields((t) => ({
  post: t.prismaField({
    args: {
      postId: t.arg.string({required: true}),
    },
    type: 'Post',
    resolve: async (query, root, args, ctx, info) =>
      prisma.post.findUniqueOrThrow({
        ...query,
        where: {id: args.postId},
      }),
  }),
  feed: t.prismaConnection({
    type: 'Post',
    cursor: 'id',
    totalCount: async (connection, args, ctx, info) =>
      await prisma.post.count(),
    resolve: async (query, root, args, ctx, info) =>
      await prisma.post.findMany({
        ...query,
      })
  })
}));

builder.mutationFields(t => ({
  createPost: t.withAuth({authenticated: true}).field({
    type: PostDto,
    args: {
      url: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
    },
    resolve: async (root, args, ctx, info) => {
      const newPost = await prisma.post.create({
        data: { ...args, postedById: ctx.currentUserId},
      });
      pubSub.publish('newPost', { newPost });
      return newPost;
    }
  })
}));

builder.subscriptionFields(t => ({
  newPost: t.field({
    type: PostDto,
    resolve: async (value: { newPost: Post }) => value.newPost,
    subscribe: async (root, args, ctx) => pubSub.subscribe('newPost')
  })
}));
