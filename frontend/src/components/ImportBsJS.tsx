"use client"
import { FC, useEffect } from "react";

export const ImportBsJS: FC<{}> = () => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return null;
}
