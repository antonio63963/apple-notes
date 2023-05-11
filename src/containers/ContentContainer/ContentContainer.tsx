import { FC } from "react";
import cn from "classnames";
import styles from './Content.module.css'
import { Sidebar } from "../../components";
import NoteDetailsContainer from "../NoteDetailsContainer/NoteDetailesContainer";

const ContentContainer: FC = () => {
  return (
    <div
      className={cn("appWidthContent", "topPadding", styles.layout)}
    >
      <Sidebar />
      <NoteDetailsContainer />
    </div>
  );
};

export default ContentContainer;
