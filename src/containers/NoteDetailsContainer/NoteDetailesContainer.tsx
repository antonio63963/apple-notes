import { FC, useContext } from "react";
import { NotesContext } from "../../context/NotesContext";
import { NoteDetails } from "../../components";

import { getFormatedTime, getMmDdYy } from "../../utils/date";

const NoteDetailsContainer: FC = () => {
  const { selectedNote } = useContext(NotesContext);
  function getFormatedDate(date: Date) {
    return `${getMmDdYy(date)} at ${getFormatedTime(date)}`;
  }
  return (
    <>
      {!selectedNote ? (
        <h1>No selected note...</h1>
      ) : (
        <NoteDetails
          date={getFormatedDate(selectedNote.date)}
          title={selectedNote.title}
          description={selectedNote.description}
        />
      )}
    </>
  );
};

export default NoteDetailsContainer;
