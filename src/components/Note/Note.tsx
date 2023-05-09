import { FC } from "react";
import cn from "classnames";

import styles from "./Note.module.css";

interface INote {
  title: string;
  time: string;
  description: string;
  onClick: () => void;
  isSelected: boolean;
}

const Note: FC<INote> = ({
  title,
  time,
  description,
  onClick,
  isSelected,
}) => {
  console.log(isSelected)
  return (
    <div
      className={cn(styles.container, isSelected && styles.selected)}
      onClick={onClick}
    >
      <div className={cn(styles.content)}>
        <h3 className={cn(styles.titlej, styles.cropText)}>{title}</h3>
        <div className={cn(styles.subtitle)}>
          <span className={cn(styles.time)}>{time} PM</span>
          <span className={cn(styles.description, styles.cropText)}>
            {description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Note;
