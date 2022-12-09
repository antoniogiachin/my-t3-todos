import { TodoList } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";
import { TheButton } from "../../../components/UI/TheButton";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { makeSerializable } from "../../../utils/makeSerializable";

import { faSave } from "@fortawesome/free-solid-svg-icons";

interface TodoListPageProps {
  selectedTodoList: TodoList;
}

const TodoListPage = ({ selectedTodoList }: TodoListPageProps) => {
  const [showInsertForm, setShowInsertForm] = useState(false);

  return (
    <section>
      <h2 className="text-4xl">{selectedTodoList.title}</h2>
      <div className="mt-6">
        <TheButton
          label="Add Todo"
          funcToExecute={() => {
            setShowInsertForm((prev) => !prev);
          }}
        />
      </div>
      {showInsertForm && (
        <div className="mt-6 grid max-w-fit grid-cols-10 place-content-between gap-6 rounded-lg  bg-base-300 p-6">
          <div className="col-span-3">
            <input
              type="text"
              placeholder="Type here"
              className="input w-full max-w-xs"
            />
          </div>
          <div className="col-span-3">
            <input
              type="text"
              placeholder="Type here"
              className="input w-full max-w-xs"
            />
          </div>
          <div className="col-span-3">
            <input
              type="text"
              placeholder="Type here"
              className="input w-full max-w-xs"
            />
          </div>
          <div className="col-span-1 ml-auto max-w-fit">
            <TheButton label={""} icon={faSave} severity="secondary" />
          </div>
        </div>
      )}
    </section>
  );
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
