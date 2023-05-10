import { FC, ReactNode } from "react";
import cn from "classnames";
import styles from "./Header.module.css";

interface IHeader {
  children: ReactNode;
}

const Header: FC<IHeader> = ({ children }) => {
  return (
    <header className={cn(styles.header, "shadow")}>
      <div className={cn("appWidthContent", styles.content)}>{children}</div>
    </header>
  );
};

export default Header;
