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
  getTodoListByUserId: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.todoList.findFirst({
        where: { title: input.title, AND: { userId: ctx.session.user.id } },
        select: { slug: true },
      });
    }),
  addTodoToList: protectedProcedure
    .input(
      z.object({
        done: z.boolean(),
        title: z.string(),
        description: z.string(),
        listSlug: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { title, done, description, listSlug: slug } = input;
      const { session } = ctx;

      return await ctx.prisma.todo.create({
        data: {
          done,
          title,
          description,
          TodoList: { connect: { slug } },
          User: { connect: { email: session.user.email as string } },
        },
      });
    }),
  changeTodoStatus: protectedProcedure
    .input(
      z.object({
        done: z.boolean(),
        id: z.string(),
        listTitle: z.string(),
        mode: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, done, listTitle, mode } = input;

      if (mode === "single") {
        await ctx.prisma.todo.update({
          where: { id },
          data: { done },
        });
      } else {
        await ctx.prisma.todo.updateMany({
          where: { TodoList: { title: listTitle } },
          data: { done },
        });
      }

      return await ctx.prisma.todoList.findFirst({
        where: { title: input.listTitle, AND: { userId: ctx.session.user.id } },
        include: { todos: true },
      });
    }),
  deleteTodo: protectedProcedure
    .input(z.object({ id: z.string(), listTitle: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      await ctx.prisma.todo.delete({ where: { id } });

      return await ctx.prisma.todoList.findFirst({
        where: { title: input.listTitle, AND: { userId: ctx.session.user.id } },
        include: { todos: true },
      });
    }),
});
