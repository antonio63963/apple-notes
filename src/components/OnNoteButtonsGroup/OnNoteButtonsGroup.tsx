import { FC, useCallback } from "react";
import cn from "classnames";
import { IoAdd, IoTrashOutline, IoCreateOutline } from "react-icons/io5";

import styles from "./OnNoteButtonsGroup.module.css";
import Button from "../Button/Button";

interface IButtonGroup {
  onAddNote: () => void;
  onUpdateNote: () => void;
  onDeleteNote: () => void;
  isDisabled: boolean;
}

const ButtonsGroup: FC<IButtonGroup> = ({
  onAddNote,
  onDeleteNote,
  onUpdateNote,
  isDisabled,
}) => {
  return (
    <div className={cn(styles.container)}>
      <Button onClick={onAddNote}>
        <IoAdd size={24} />
      </Button>
      <Button isDisabled={isDisabled} onClick={onDeleteNote}>
        <IoTrashOutline size={24} />
      </Button>
      <Button isDisabled={isDisabled} onClick={onUpdateNote}>
        <IoCreateOutline size={24} />
      </Button>
    </div>
  );
};

export default ButtonsGroup;
