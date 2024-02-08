import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC } from "react";
import { RegisterForm } from "./_components/RegisterForm";

const Register: FC<{}> = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  };
  return (
    <RegisterForm />
  );
}

export default Register;