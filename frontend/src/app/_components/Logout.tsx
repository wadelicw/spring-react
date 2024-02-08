"use client";
import { signOut } from "next-auth/react";
import { FC } from "react";

export const Logout: FC<{}> = () => {
  return (
    <button
      type="button"
      className="btn btn-outline-danger"
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </button>
  );
}