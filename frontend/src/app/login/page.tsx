
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC } from "react";
import { LoginForm } from "./_components/LoginForm";

const Login: FC<{}> = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  };
  return (
    <LoginForm />
  );
}

export default Login;