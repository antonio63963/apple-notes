import { FC } from "react";
import cn from "classnames";
import styles from "./NoteDetails.module.css";

const EmptyDetails: FC = () => {
  return (
    <div className={cn(styles.emptyContainer)}>
      <h1>No selected note...</h1>
    </div>
  );
};

export default EmptyDetails;
