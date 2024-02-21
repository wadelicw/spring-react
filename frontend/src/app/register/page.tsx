import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { ReactElement } from 'react';
import { RegisterForm } from './_components/RegisterForm';

async function Register(): Promise<ReactElement> {
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return (
    <RegisterForm />
  );
}

export default Register;
