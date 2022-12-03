/**
 * Wrapper per getServerAuthSession
 * https://next-auth.js.org/configuration/nextjs
 * Protezione routes lato server
 */
import { authOptions } from "@pages/api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";

// passo un ctx formato da req e res
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  const { req, res } = ctx;
  return await unstable_getServerSession(req, res, authOptions);
};
