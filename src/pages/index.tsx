import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Hero } from "../components/Index/Hero";
import { LoggedWelcome } from "../components/Index/LoggedWelcome";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { getVisitorCounter } from "../store/slicers/appStatusSlice";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  let contentActive: string | null;
  const [showLoggedContent, setShowLoggedContent] = useState(false);

  const visitorCounter = useAppSelector(getVisitorCounter);

  const { data: sessionData } = useSession();
  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleAppStart = async () => {
    if (!sessionData) {
      await signIn("google", { callbackUrl: "/dashboard", redirect: false });
    } else {
      if (visitorCounter === 0) {
        setShowLoggedContent(true);
        setTimeout(() => {
          router.replace("/dashboard");
        }, 2000);
      } else {
        router.replace("/dashboard");
      }
    }
  };

  return (
    <>
      <section>
        {!showLoggedContent && <Hero handleAppStart={handleAppStart} />}
        {/* se auth allora mostra  */}
        {showLoggedContent && (
          <LoggedWelcome name={sessionData?.user?.name as string} />
        )}
      </section>
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => signOut() : () => signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
