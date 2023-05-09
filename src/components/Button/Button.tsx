import { FC, ReactNode } from "react";
import cn from "classnames";

import styles from "./Button.module.css";

interface IButton {
  children: ReactNode;
  onClick: () => void;
}

const IconButton: FC<IButton> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={cn(styles.button)}>
      {children}
    </button>
  );
};

export default IconButton;
