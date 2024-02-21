import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { ReactElement } from 'react';
import { LoginForm } from './_components/LoginForm';

async function Login(): Promise<ReactElement> {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return (
    <LoginForm />
  );
}

export default Login;
