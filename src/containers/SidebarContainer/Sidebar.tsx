import { FC, useCallback, useContext } from "react";

import { NotesContext, INote } from "../../context/NotesContext";

import { NotesList } from "../../components";

const Sidebar: FC = () => {
  const { notes, setNotes, setSelectedNote, searchFilter } =
    useContext(NotesContext);

  const onNoteSelect = useCallback((id: string) => {
    setNotes((currentData: INote[]): INote[] =>
      currentData.map((note) => {
        if (note.id === id) {
          note.isSelected = true;
          setSelectedNote(note);
          return note;
        } else {
          note.isSelected = false;
          return note;
        }
      })
    );
  }, []);

  return (
    <>
      <NotesList
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
