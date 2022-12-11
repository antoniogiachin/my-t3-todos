import { Todo, TodoList } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";
import { TheButton } from "../../../components/UI/TheButton";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { makeSerializable } from "../../../utils/makeSerializable";

import { faSave } from "@fortawesome/free-solid-svg-icons";
import { TheDivider } from "../../../components/UI/TheDivider";
import { InsertTodo } from "../../../components/Dashboard/TodoList/InsertTodo";
import { Severity, TheBadge } from "../../../components/UI/TheBadge";
import { TodoTable } from "../../../components/Dashboard/TodoList/TodoTable";

import { trpc } from "../../../utils/trpc";

interface TodoListPageProps {
  selectedTodoList: TodoList & {
    todos: Todo[];
  };
}

const TodoListPage = ({ selectedTodoList }: TodoListPageProps) => {
  // const utils = trpc.useContext(); => per Query Invalidation

  const [todos, setTodos] = useState<Partial<Todo>[]>(selectedTodoList.todos);
  const [isDoneChangeLoading, setIsDoneChangeLoading] = useState("");

  const { mutateAsync: updateTodoStatus } =
    trpc.todo.changeTodoStatus.useMutation();

  const { mutateAsync: deleteTodo } = trpc.todo.deleteTodo.useMutation();

  /* ? https://trpc.io/docs/useContext#query-invalidation => Query invalidation *
  
    trpc.todo.changeTodoStatus.useMutation({
      onSuccess() {
        utils.todo.getAllTodos.invalidate();
      },
    });
  */

  const handleUpdateTodoStatus = async (
    listTitle: string,
    done: boolean,
    id = "",
    mode = "single"
  ) => {
    if (mode === "single") {
      setIsDoneChangeLoading(id);
    } else {
      setIsDoneChangeLoading("multiple");
    }
    const res = await updateTodoStatus({ listTitle, id, done, mode });
    if (!res?.todos) {
      return;
    }

    setIsDoneChangeLoading("");
    setTodos(res?.todos);
  };

  const handleTodoDelete = async (listTitle: string, id: string) => {
    setIsDoneChangeLoading(id);

    const res = await deleteTodo({ listTitle, id });

    if (!res?.todos) {
      return;
    }

    setIsDoneChangeLoading("");
    setTodos(res?.todos);
  };

  return (
    <section>
      <h2 className="text-4xl">{selectedTodoList.title}</h2>
      <TheDivider />
      <InsertTodo setTodos={setTodos} listSlug={selectedTodoList.slug} />
      <TheDivider>
        <TheBadge label="TODO" severity={Severity.SECONDARY} />
      </TheDivider>
      {todos.length ? (
        <TodoTable
          todos={todos}
          listTitle={selectedTodoList.title}
          isDoneChangeLoading={isDoneChangeLoading}
          handleUpdateTodoStatus={handleUpdateTodoStatus}
          handleTodoDelete={handleTodoDelete}
        />
      ) : (
        <p className="text-center text-2xl">No TODOS yet...</p>
      )}
      <div className="flex justify-end p-2">
        <TheButton severity="primary" label="save" icon={faSave} />
      </div>
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
