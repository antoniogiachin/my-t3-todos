import { useState } from "react";
import { AuthForm } from "../../components/Auth/AuthForm";

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(false);

  return (
    <section className="mt-10 grid place-items-center gap-8">
      <h1 className="text-5xl uppercase">
        {isLoginForm ? "Login" : "Register"}
      </h1>
      <AuthForm isLoginForm={isLoginForm} setIsLoginForm={setIsLoginForm} />
    </section>
  );
};

export default Login;
