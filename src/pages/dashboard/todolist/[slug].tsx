import { TodoList } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { makeSerializable } from "../../../utils/makeSerializable";

interface TodoListPageProps {
  selectedTodoList: TodoList;
}

const TodoListPage = ({ selectedTodoList }: TodoListPageProps) => {
  return <section>TodoListPage</section>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.params as ParsedUrlQuery;
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const todoList = await prisma?.todoList.findUnique({
    where: { slug: slug as string },
    include: { todos: true },
  });

  return {
    props: {
      selectedTodoList: makeSerializable(todoList) || [],
    },
  };
}

export default TodoListPage;
