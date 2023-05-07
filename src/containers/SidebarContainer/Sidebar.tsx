import { FC } from "react";
import cn from 'classnames';

import styles from './Sidebar.module.css';
import NotesListContainer from "../NotesListContainer/NotesListContainer";

const Sidebar: FC = () => {
  return <aside className={cn(styles.container)}>
    <NotesListContainer />
  </aside>;
};

export default Sidebar;
