import { FC, useCallback, useState, useContext } from "react";
import SearchBox from "../SearchBox/SearchBox";
import { Header, Form, ButtonsGroup } from "../../components";

const HeaderContainer: FC = () => {
  const [titleInput, setTitleInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [isForm, setIsForm] = useState<boolean>(false);

  

  const onClose = useCallback(() => {
    setIsForm(false);
  }, []);

  const onSubmit = useCallback(() => {}, []);

  const onAddNote = useCallback(() => {
    setIsForm(true)
  }, []);
  const onUpdateNote = useCallback(() => {
    console.log("Update BUTTON");
  }, []);
  const onDeleteNote = useCallback(() => {
    console.log("Delete BUTTON");
  }, []);
  return (
    <Header>
      {isForm && (
        <Form
          titleValue={titleInput}
          descriptionValue={descriptionInput}
          onTitleChange={setTitleInput}
          onDescriptionChange={setDescriptionInput}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}
      <ButtonsGroup
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        onUpdateNote={onUpdateNote}
      />
      <SearchBox />
    </Header>
  );
};

export default HeaderContainer;
