import { ReactEventHandler, Dispatch, SetStateAction } from "react";
import { getBaseUrl, trpc } from "../../utils/trpc";
import { useState } from "react";
import { signIn } from "next-auth/react";

interface AuthFormProps {
  isLoginForm: boolean;
  setIsLoginForm: Dispatch<SetStateAction<boolean>>;
}

export const AuthForm = ({ isLoginForm, setIsLoginForm }: AuthFormProps) => {
  const mutation = trpc.auth.register.useMutation();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAuthForm = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!isLoginForm) {
      const { isLoading, isSuccess, isError, mutateAsync, error, data } =
        mutation;

      await mutateAsync({ name, surname, email, password, confirmPassword });

      if (isError) {
        console.log(error);
      } else if (isLoading) {
        console.log("loading");
      }
    }
    try {
      await signIn("google");
    } catch (error) {}
  };

  return (
    <div className="w-2/3 rounded-md border-2 border-slate-100 py-4 px-5 shadow-sm shadow-slate-200">
      <form
        onSubmit={handleAuthForm}
        className="w-100 flex w-full flex-col justify-center space-y-4"
      >
        {!isLoginForm && (
          <>
            <div className="flex flex-col items-center space-y-2">
              <label htmlFor="name">NAME:</label>
              {mutation.isError && <p>CIAO</p>}
              <input
                id="name"
                type="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Insert your name"
                className="input-bordered input w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col items-center space-y-2">
              <label htmlFor="surname">SURNAME:</label>
              <input
                id="surname"
                type="surname"
                onChange={(e) => {
                  setSurname(e.target.value);
                }}
                placeholder="Insert your surname"
                className="input-bordered input w-full max-w-xs"
              />
            </div>
          </>
        )}
        <div className="flex flex-col items-center space-y-2">
          <label htmlFor="email">EMAIL:</label>
          <input
            id="email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Insert your email"
            className="input-bordered input w-full max-w-xs"
          />
        </div>
        <div className="flex flex-col items-center space-y-2">
          <label htmlFor="password">PASSWORD:</label>
          <input
            id="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Insert your password"
            className="input-bordered input w-full max-w-xs"
          />
        </div>
        {!isLoginForm && (
          <div className="flex flex-col items-center space-y-2">
            <label htmlFor="confirm-password">CONFIRM PASSWORD:</label>
            <input
              id="confirm-password"
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder="Re-insert your password"
              className="input-bordered input w-full max-w-xs"
            />
          </div>
        )}
        <div className="flex justify-center">
          <div className="flex w-80 items-center justify-between">
            <button className="btn-primary btn">
              {isLoginForm ? "LOGIN" : "REGISTER"}
            </button>
            <span
              onClick={() => {
                setIsLoginForm((prevState: boolean) => !prevState);
              }}
              className="mr-12 cursor-pointer hover:underline hover:underline-offset-1"
            >
              {isLoginForm ? "Not registered yet?" : "Already registered?"}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
