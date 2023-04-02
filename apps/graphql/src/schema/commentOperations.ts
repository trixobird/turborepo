import {builder, prisma} from "../builder";
import {CommentDto} from "../types";

builder.mutationField(
  'createComment', t => t.withAuth({authenticated: true}).field({
    type: CommentDto,
    args: {
      body: t.arg.string({required: true}),
      postId: t.arg.string({required: true}),
    },
    resolve: async (root, args, ctx, info) =>
      await prisma.comment.create({
        data: args,
      })
  })
);
