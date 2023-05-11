import { FC, useState, useCallback, useContext } from "react";
import { uid } from "uid";
import { IError, NotesContext } from "../../context/NotesContext";
import { Form } from "../../components";

type FormType = "create" | "update" | null;

interface INote {
  id: string;
  title: string;
  date: Date;
  description: string;
  isSelected: boolean;
}

interface IForm {
  close: () => void;
  formType: FormType;
  selectedNote?: INote | null;
}

const FormContainer: FC<IForm> = ({ close, formType, selectedNote }) => {
  const { localDB, setErrorInfo, setNotes } = useContext(NotesContext);

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
          setNotes((currentData) => [newNote, ...currentData]);
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

  return (
    <Form
      formTitle={formType === "create" ? "Create new note" : "Update note"}
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
