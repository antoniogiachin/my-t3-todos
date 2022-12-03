import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { hashPassword } from "../../common/pwdSecurityHandler";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  // register: publicProcedure
  //   .input(
  //     z.object({
  //       name: z
  //         .string()
  //         .min(3, { message: "Must be 3 or more characters long" })
  //         .max(20, { message: "Must be 20 or less characters long" }),
  //       surname: z
  //         .string()
  //         .min(3, { message: "Must be 3 or more characters long" })
  //         .max(20, { message: "Must be 20 or less characters long" }),
  //       email: z.string().email({ message: "Invalid email address" }),
  //       password: z
  //         .string()
  //         .min(8, { message: "Must be 8 or more characters long" }),
  //       confirmPassword: z
  //         .string()
  //         .min(8, { message: "Must be 8 or more characters long" }),
  //     })
  //   )
  //   .mutation(async ({ input, ctx }) => {
  //     if (input.password !== input.confirmPassword) {
  //       throw new TRPCError({
  //         code: "BAD_REQUEST",
  //         message: "Passwords are different!",
  //       });
  //     }

  //     const { name, surname, email, password } = input;

  //     let slug: string = `${name}-${surname}-${new Date()
  //       .getTime()
  //       .toString()}`;
  //     console.log("SLUG", slug);

  //     // controlla slug email
  //     const userWithGivenEmailExistsCheck = await ctx.prisma.user.findUnique({
  //       where: { email },
  //     });

  //     if (userWithGivenEmailExistsCheck) {
  //       throw new TRPCError({
  //         code: "BAD_REQUEST",
  //         message: "User with given email already exist!",
  //       });
  //     }
  //     const userWithSlugExistsCheck = await ctx.prisma.user.findFirst({
  //       where: { slug },
  //     });

  //     if (userWithSlugExistsCheck) {
  //       slug = `${name}-${surname}-${new Date().getTime().toString()}`;
  //     }

  //     // prende i roles
  //     const userRole = await ctx.prisma.role.findFirst({
  //       where: { name: "user" },
  //     });
  //     // fa login ?

  //     const hashedPass = await hashPassword(password);

  //     const newUser = await ctx.prisma.user.create({
  //       data: {
  //         name,
  //         surname,
  //         email,
  //         password: hashedPass,
  //         slug,
  //         roles: [userRole?.id as string],
  //       },
  //     });

  //     return {
  //       user: {
  //         name,
  //         surname,
  //         email,
  //         roles: newUser.roles,
  //       },
  //     };
  //   }),
});
