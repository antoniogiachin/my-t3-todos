import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { AppProps } from "next/app";
import React, { useEffect } from "react";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { useAppDispatch } from "../../store/hooks/hooks";
import {
  INCREMENT_VISIT_COUNTER,
  SET_SHOW_NAVBAR,
} from "../../store/slicers/appStatusSlice";
import { makeSerializable } from "../../utils/makeSerializable";

interface DashboardProps {
  sessionUser: {
    name: string;
    email: string;
    image: string;
    id: string;
  };
}

const Dashboard: NextPage<DashboardProps> = ({ sessionUser }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(SET_SHOW_NAVBAR(true));
    dispatch(INCREMENT_VISIT_COUNTER());
  }, [dispatch]);

  return <div>Dashboard</div>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  return {
    props: { sessionUser: makeSerializable(session.user) },
  };
}

export default Dashboard;
