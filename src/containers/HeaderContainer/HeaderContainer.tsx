import { FC, useState } from "react";
import cn from 'classnames';
import styles from "./Header.module.css";
import SearchBox from "../SearchBox/SearchBox";


const Header: FC = () => {

  return (
    <header className={cn(styles.header, 'shadow')}>
      <div className={cn('appWidthContent', styles.content)}>
        <div className={cn(styles.buttonRow)}>
          <button>Add</button>
          <button>Delete</button>
          <button>Update</button>
        </div>
        <div className={cn(styles.inputContainer)}>
          <SearchBox />
        </div>
      </div>
    </header>
  );
};

export default Header;
