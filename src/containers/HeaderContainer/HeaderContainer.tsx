import { FC, useCallback, useState, useContext } from "react";

import FormContainer from "../FormContainer/FormContainer";
import { Header, DesktopHeader, MobileHeader } from "../../components";

import { NotesContext } from "../../context/NotesContext";
import AppContext from "../../context/AppContext";

type FormType = "create" | "update" | null;

const HeaderContainer: FC = () => {
  const [formType, setFormType] = useState<FormType>(null);
  const [isShownForm, setIsShownForm] = useState<boolean>(false);

  const { localDB, setNotes, selectedNote } = useContext(NotesContext);
  const { setErrorInfo, isSidebarOpen, setIsSidebarOpen } =
    useContext(AppContext);

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

  const onMenu = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen, setIsSidebarOpen]);

  return (
    <>
      {isShownForm && (
        <FormContainer
          selectedNote={formType === "update" ? selectedNote : null}
          close={() => setIsShownForm(false)}
        />
      )}
      <Header>
        <MobileHeader
          onMenu={onMenu}
          isOpen={isSidebarOpen}
          isSelectedNote={!!selectedNote}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          onUpdateNote={onUpdateNote}
        />
        <DesktopHeader
          isSelectedNote={!!selectedNote}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          onUpdateNote={onUpdateNote}
        />
      </Header>
    </>
  );
};

export default HeaderContainer;
