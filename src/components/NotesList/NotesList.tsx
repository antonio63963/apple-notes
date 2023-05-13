import { FC } from "react";
import cn from "classnames";
import { Note } from "..";
import { getFormatedTime } from "../../utils/date";

import styles from "./NotesList.module.css";

import { INotesList } from "./NoteList.type";

const NotesList: FC<INotesList> = ({ notes, onNoteSelect, isOpen }) => {
  return (
    <aside className={cn(styles.container)}>
      <div className={cn(styles.list, isOpen ? styles.mobileSidebar : null)}>
        <div className={cn(styles.listInnerContainer)}>
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
        </div>
      </div>
    </aside>
  );
};

export default NotesList;
