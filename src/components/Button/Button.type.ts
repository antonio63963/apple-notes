import { ReactNode } from "react";

interface IButton {
  children: ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
}

export type { IButton };
