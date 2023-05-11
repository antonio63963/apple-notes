import { FC, useState, useCallback, useContext, useEffect } from "react";
import { uid } from "uid";
import { NotesContext } from "../../context/NotesContext";
import AppContext from "../../context/AppContext";

import { Form } from "../../components";

// type FormType = "create" | "update" | null;

interface INote {
  id: string;
  title: string;
  date: Date;
  description: string;
  isSelected?: boolean;
}

interface IForm {
  close: () => void;
  selectedNote?: INote | null;
}

const FormContainer: FC<IForm> = ({ close, selectedNote }) => {
  const { localDB, setNotes, setSelectedNote } = useContext(NotesContext);
  const { setErrorInfo } = useContext(AppContext);

  const [titleInput, setTitleInput] = useState<string>(
    selectedNote ? selectedNote.title : ""
  );
  const [descriptionInput, setDescriptionInput] = useState<string>(
    selectedNote ? selectedNote.description : ""
  );

  const onClose = useCallback(() => {
    setTitleInput("");
    setDescriptionInput("");
    close();
  }, []);

  const onSave = useCallback(async () => {
    const newNote = {
      id: uid(),
      title: titleInput,
      description: descriptionInput,
      date: new Date(),
      isSelected: false,
    };
    if (localDB && localDB.add) {
      console.log("Works", newNote);
      console.log(titleInput);
      try {
        const { data } = await localDB.add(newNote);
        if (data) {
          setNotes((currentData) => [
            { ...newNote, isSelected: true },
            ...currentData.map((note) => {
              note.isSelected = false;
              return note;
            }),
          ]);
          setSelectedNote({ ...newNote, isSelected: true });
          onClose();
        } else {
          setErrorInfo({
            title: "Error!!!",
            message: "Somethig has gone wrong!",
          });
        }
      } catch (err: any) {
        setErrorInfo(err);
        onClose();
      }
    }
  }, [setNotes, localDB, titleInput, descriptionInput]);
  //update
  const onUpdateTitle = useCallback(async (title: string) => {
    if (selectedNote && localDB && localDB.put) {
      const noteWithNewTitle = { ...selectedNote, title };
      try {
        const { data } = await localDB.put(
          { ...selectedNote, title, isSelected: false },
          selectedNote.id
        );
        if (data) {
          setSelectedNote(noteWithNewTitle);
          setNotes((currentData) => {
            const idx = currentData.findIndex(
              (note) => note.id === selectedNote.id
            );
            if (idx !== -1) {
              currentData[idx] = noteWithNewTitle;
              return [...currentData];
            }
            return currentData;
          });
        }
      } catch (err: any) {
        setErrorInfo({ title: err.title, message: err.message });
      }
    }
  }, []);
  const onUpdateDescription = useCallback(async (description: string) => {
    if (selectedNote && localDB && localDB.put) {
      const noteWithNewTitle = { ...selectedNote, description };
      try {
        const { data } = await localDB.put(noteWithNewTitle, selectedNote.id);
        if (data) {
          setSelectedNote(noteWithNewTitle);
          setNotes((currentData) => {
            const idx = currentData.findIndex(
              (note) => note.id === selectedNote.id
            );
            if (idx !== -1) {
              currentData[idx] = noteWithNewTitle;
              return [...currentData];
            }
            return currentData;
          });
        }
      } catch (err: any) {
        setErrorInfo({ title: err.title, message: err.message });
      }
    }
  }, []);

  useEffect(() => {
    if (selectedNote) {
      onUpdateTitle(titleInput);
    }
  }, [titleInput]);

  useEffect(() => {
    if (selectedNote) {
      onUpdateDescription(descriptionInput);
    }
  }, [descriptionInput]);

  return (
    <Form
      type={!selectedNote ? "create" : "update"}
      formTitle={!selectedNote ? "Create new note" : "Update note"}
      titleValue={titleInput}
      descriptionValue={descriptionInput}
      onTitleChange={setTitleInput}
      onDescriptionChange={setDescriptionInput}
      onClose={onClose}
      onSave={onSave}
    />
  );
};

export default FormContainer;
