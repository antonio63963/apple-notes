import { FC, useState } from "react";
import cn from "classnames";
import styles from "./Header.module.css";
import SearchBox from "../SearchBox/SearchBox";
import { ButtonsGroup } from "../../components";

const Header: FC = () => {
  return (
    <header className={cn(styles.header, "shadow")}>
      <div className={cn("appWidthContent", styles.content)}>
        <ButtonsGroup />
        <SearchBox />
      </div>
    </header>
  );
};

export default Header;
