"use client";

import { Provider } from "jotai";
import { FC } from "react";

interface Props {
  children: React.ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  return <Provider>{children}</Provider>;
};
