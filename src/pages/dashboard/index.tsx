import { Todo, TodoList } from "@prisma/client";
import { GetServerSidePropsContext, NextPage } from "next";
import React, { useEffect, useState } from "react";
import { UserRecap } from "../../components/Dashboard/UserRecap";
import { TheTable } from "../../components/UI/TheTable";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { useAppDispatch } from "../../store/hooks/hooks";
import {
  INCREMENT_VISIT_COUNTER,
  SET_SHOW_NAVBAR,
} from "../../store/slicers/appStatusSlice";
import { SET_USER_INFOS } from "../../store/slicers/userSlice";
import { makeSerializable } from "../../utils/makeSerializable";

interface DashboardProps {
  sessionUser: {
    name: string;
    email: string;
    image: string;
    id: string;
    role: string;
  };
  userTodoList: TodoList[];
}

export type RefetchTodoListArray = Array<{
  todos: Todo[];
  description: string;
  title: string;
}>;
const Dashboard: NextPage<DashboardProps> = ({ sessionUser, userTodoList }) => {
  const [todoList, setTodoList] = useState<TodoList[] | RefetchTodoListArray>(
    userTodoList
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(SET_SHOW_NAVBAR(true));
    dispatch(INCREMENT_VISIT_COUNTER());
    dispatch(SET_USER_INFOS(sessionUser));
  }, [dispatch, sessionUser]);

  return (
    <section>
      <UserRecap setTodoList={setTodoList} />
      {/* tabella recap progetti todos  */}
      <article className="mt-10 flex flex-col space-y-6">
        <h2 className="text-2xl uppercase ">Your TODO&apos;s Lists</h2>
        {todoList.length > 0 && (
          <TheTable
            toBeDisplayed={todoList}
            baseDetailsUrl="/dashboard/todolist/"
            tableContext="todo-list"
          />
        )}
      </article>
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

  const todoList = await prisma?.todoList.findMany({
    where: { userId: session.user?.id },
    select: { title: true, description: true, todos: true },
  });

  return {
    props: {
      sessionUser: makeSerializable(session.user),
      userTodoList: todoList || [],
    },
  };
}

export default Dashboard;
