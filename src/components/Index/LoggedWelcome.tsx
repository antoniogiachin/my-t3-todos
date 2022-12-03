import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

interface LoggedWelcomeProps {
  name: string;
}

export const LoggedWelcome = ({ name }: LoggedWelcomeProps) => {
  return (
    <article className="grid min-h-screen place-items-center">
      <div className="flex flex-col space-y-5 text-center">
        <h1 className="text-9xl font-bold">Welcome back</h1>
        <h1 className="text-9xl font-bold">{name}</h1>
        <p>We are redirecting you...</p>
        <FontAwesomeIcon icon={faSync} className="fa-spin" />
      </div>
    </article>
  );
};
