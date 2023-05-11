import { FC, useCallback, useContext } from "react";

import { NotesContext, INote } from "../../context/NotesContext";
import AppContext from "../../context/AppContext";

import { NotesList } from "../../components";

const Sidebar: FC = () => {
  const { notes, setNotes, setSelectedNote, searchFilter } =
    useContext(NotesContext);
  const { isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);

  const onNoteSelect = useCallback(
    (id: string) => {
      setNotes((currentData: INote[]): INote[] =>
        currentData.map((note) => {
          if (note.id === id) {
            note.isSelected = true;
            setSelectedNote(note);
            setIsSidebarOpen(false);
            return note;
          } else {
            note.isSelected = false;
            setIsSidebarOpen(false);
            return note;
          }
        })
      );
    },
    [setSelectedNote, setNotes]
  );

  return (
    <>
      <NotesList
        isOpen={isSidebarOpen}
        notes={
          searchFilter
            ? notes.filter((note) => note.title.includes(searchFilter))
            : notes
        }
        onNoteSelect={onNoteSelect}
      />
    </>
  );
};

export default Sidebar;
