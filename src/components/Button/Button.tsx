import { FC, ReactNode } from "react";
import cn from "classnames";

import styles from "./Button.module.css";

import { IButton } from "./Button.type";

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
