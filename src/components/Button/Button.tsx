import { FC, ReactNode } from "react";
import cn from "classnames";

import styles from "./Button.module.css";

interface IButton {
  children: ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
}

const IconButton: FC<IButton> = ({ children, onClick, isDisabled = false }) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={cn(styles.button, isDisabled ? styles.disabled : null)}
    >
      {children}
    </button>
  );
};

export default IconButton;
