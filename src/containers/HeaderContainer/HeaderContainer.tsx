import { FC, useCallback, useState, useContext } from "react";

import SearchBox from "../SearchBox/SearchBox";
import { Header, ButtonsGroup } from "../../components";

import { NotesContext } from "../../context/NotesContext";
import FormContainer from "../FormContainer/FormContainer";

type FormType = "create" | "update" | null;

const HeaderContainer: FC = () => {
  const [formType, setFormType] = useState<FormType>(null);
  const [isShownForm, setIsShownForm] = useState<boolean>(false);

  const { localDB, setErrorInfo, setNotes, selectedNote } =
    useContext(NotesContext);

  const onAddNote = useCallback(() => {
    setFormType("create");
    setIsShownForm(true);
  }, [setFormType, setIsShownForm]);
  const onUpdateNote = useCallback(() => {
    setFormType("update");
    setIsShownForm(true);
  }, [setFormType, setIsShownForm]);
  const onDeleteNote = useCallback(async () => {
    if (localDB && localDB.delete && selectedNote) {
      try {
        const response = await localDB?.delete(selectedNote.id);
        if (response.status === "ok") {
          setNotes((currentDate) =>
            currentDate.filter((note) => note.id !== selectedNote.id)
          );
        }
      } catch (err: any) {
        setErrorInfo({ title: err.title, message: err.message });
      }
    }
  }, [localDB, selectedNote, setNotes, setErrorInfo]);

  return (
    <>
      {isShownForm && (
        <FormContainer
          selectedNote={formType === "update" ? selectedNote : null}
          close={() => setIsShownForm(false)}
        />
      )}
      <Header>
        <ButtonsGroup
          isDisabled={!selectedNote}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          onUpdateNote={onUpdateNote}
        />
        <SearchBox />
      </Header>
    </>
  );
};

export default HeaderContainer;
