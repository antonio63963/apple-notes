import { FC } from "react";
import cn from 'classnames';
import { Note } from "..";
import { getFormatedTime } from "../../utils/date";

import styles from './NotesList.module.css';

interface INote {
  id: string;
  title: string;
  date: Date;
  description: string;
  isSelected: boolean;
}
const mock: INote[] = [
  {
    id: "1",
    title: "Test 1",
    date: new Date(),
    description:
      "Необхідно створити спрощену копію програми Нотатки з операційної системи Apple macOS за допомогою Reactjs. Програма має бути створена за допомогою create-react-app",
    isSelected: false,
  },
  {
    id: "2",
    title: "Test 2",
    date: new Date(),
    description:
      "Зовнішній вигляд програми складається з сайдбару, області для перегляду/редагування/додавання нотатки та пошуку за нотатками",
    isSelected: false,
  },
  {
    id: "3",
    title: "Test 3",
    date: new Date(),
    description:
      "При виборі нотатки зліва, праворуч повинен відображатися відрендерований Markdown текст із локальної бази даних браузера (дивитися на indexeddb)",
    isSelected: false,
  },
];

interface INotesList {
  notes: INote[] | [];
  onNoteSelect: (data: string) => void;
}

const NotesList: FC<INotesList> = ({notes, onNoteSelect}) => {
  // const onNoteSelect = useCallback((id: string) => {
  //   setNotes((currentData) =>
  //     currentData.map((note) => {
  //       if (note.id === id) {
  //         note.isSelected = true;
  //         return note;
  //       } else {
  //         note.isSelected = false;
  //         return note;
  //       }
  //     })
  //   );
  // }, []);

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
            isSelected={note.isSelected}
            onClick={() => onNoteSelect(note.id)}
 
          />
        );
      })}
    </aside>
  );
};

export default NotesList;
