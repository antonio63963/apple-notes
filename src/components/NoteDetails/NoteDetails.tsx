import { FC } from "react";
import cn from "classnames";
import styles from "./NoteDetails.module.css";

interface INote {
  title: string;
  description: string;
  date: string;
}

const NoteDetails: FC<INote> = ({ title, description, date }) => {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.dateWrapper)}>
        <p className={cn(styles.date)}>{date}</p>
      </div>
      <h4 className={cn(styles.title)}>{title}</h4>
      <p className={cn(styles.description)}>{description}</p>
    </div>
  );
};

export default NoteDetails;
