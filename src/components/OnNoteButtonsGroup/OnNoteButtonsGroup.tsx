import { FC, useCallback } from "react";
import cn from "classnames";
import { IoAdd, IoTrashOutline, IoCreateOutline } from "react-icons/io5";

import styles from "./OnNoteButtonsGroup.module.css";
import Button from "../Button/Button";

const ButtonsGroup: FC = () => {
  const onAddNote = useCallback(() => {
    console.log("ADDD BUTTON");
  }, []);
  const onUpdateNote = useCallback(() => {
    console.log("Update BUTTON");
  }, []);
  const onDeleteNote = useCallback(() => {
    console.log("Delete BUTTON");
  }, []);
  return (
    <div className={cn(styles.container)}>
      <Button onClick={onAddNote}>
        <IoAdd size={24} />
      </Button>
      <Button onClick={onDeleteNote}>
        <IoTrashOutline size={24} />
      </Button>
      <Button onClick={onUpdateNote}>
        <IoCreateOutline size={24} />
      </Button>
    </div>
  );
};

export default ButtonsGroup;
