import { FC } from "react";
import cn from "classnames";
import { Note } from "..";
import { getFormatedTime } from "../../utils/date";

import styles from "./NotesList.module.css";

interface INote {
  id: string;
  title: string;
  date: Date;
  description: string;
  isSelected?: boolean | null;
}

interface INotesList {
  notes: INote[] | [];
  onNoteSelect: (data: string) => void;
}

const NotesList: FC<INotesList> = ({ notes, onNoteSelect }) => {
  return (
    <aside className={cn(styles.container)}>
      {notes.map((note) => {
        const time = getFormatedTime(note.date);
        return (
          <Note
            key={note.id}
            title={note.title}
            time={time}
            description={note.description}
            isSelected={note.isSelected || null}
            onClick={() => onNoteSelect(note.id)}
          />
        );
      })}
    </aside>
  );
};

export default NotesList;
