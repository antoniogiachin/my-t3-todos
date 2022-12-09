import { string, z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const todoRouter = router({
  getAllTodos: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany();
  }),
  createTodoList: protectedProcedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { title, description } = input;
      const { email, id } = ctx.session.user;

      const slug = `${title}-${description}-${new Date().getTime()}-${
        email?.split("@")[0]
      }`;

      await ctx.prisma.todoList.create({
        data: {
          title,
          description,
          slug,
          User: { connect: { email: email as string } },
        },
      });

      return await prisma?.todoList.findMany({
        where: { userId: id },
        select: { title: true, description: true, todos: true },
      });
    }),
  getTodoList: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.todoList.findFirst({
        where: { title: input.title, AND: { userId: ctx.session.user.id } },
        select: { slug: true },
      });
    }),
});
