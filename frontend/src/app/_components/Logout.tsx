"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC } from "react";


export const Logout: FC<{}> = () => {
  const router = useRouter();
  return (
    <button
      type="button"
      className="btn btn-outline-danger"
      onClick={() => signOut({ redirect: false }).then(() => {
        router.push("/");
        router.refresh();
      })}
    >
      Logout
    </button>
  );
}