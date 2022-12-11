import { GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import { TheButton } from "../../../components/UI/TheButton";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { TheDivider } from "../../../components/UI/TheDivider";
import { InsertTodo } from "../../../components/Dashboard/TodoList/InsertTodo";
import { Severity, TheBadge } from "../../../components/UI/TheBadge";
import { TodoTable } from "../../../components/Dashboard/TodoList/TodoTable";

import { trpc } from "../../../utils/trpc";
import { useRouter } from "next/router";

const TodoListPage = () => {
  const utils = trpc.useContext();

  const router = useRouter();
  const { slug } = router.query;

  const [isDoneChangeLoading, setIsDoneChangeLoading] = useState("");

  const { data: selectedTodoList } = trpc.todo.getTodoListBySlug.useQuery({
    slug: slug as string,
  });

  const { mutateAsync: updateTodoStatus } =
    trpc.todo.changeTodoStatus.useMutation({
      onSuccess() {
        utils.todo.getTodoListBySlug.invalidate();
      },
    });

  const { mutateAsync: deleteTodo } = trpc.todo.deleteTodo.useMutation({
    onSuccess() {
      utils.todo.getTodoListBySlug.invalidate();
    },
  });

  /*  https://trpc.io/docs/useContext#query-invalidation => Query invalidation */

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
  };

  const handleTodoDelete = async (listTitle: string, id: string) => {
    setIsDoneChangeLoading(id);

    const res = await deleteTodo({ listTitle, id });

    if (!res?.todos) {
      return;
    }

    setIsDoneChangeLoading("");
  };

  return (
    <section>
      <h2 className="text-4xl">
        {selectedTodoList ? selectedTodoList.title : "Loading..."}
      </h2>
      <TheDivider />
      <InsertTodo
        listSlug={(selectedTodoList && selectedTodoList.slug) || ""}
      />
      <TheDivider>
        <TheBadge label="TODO" severity={Severity.SECONDARY} />
      </TheDivider>
      {selectedTodoList && selectedTodoList.todos.length ? (
        <TodoTable
          todos={selectedTodoList.todos}
          listTitle={selectedTodoList.title}
          isDoneChangeLoading={isDoneChangeLoading}
          handleUpdateTodoStatus={handleUpdateTodoStatus}
          handleTodoDelete={handleTodoDelete}
        />
      ) : (
        <p className="text-center text-2xl">No TODOS yet...</p>
      )}
      <div className="flex justify-end p-2">
        <TheButton
          severity="primary"
          label="Go Back"
          icon={faArrowLeft}
          funcToExecute={() => {
            router.push("/dashboard");
          }}
        />
      </div>
    </section>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}

export default TodoListPage;
