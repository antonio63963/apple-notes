import { FC, useCallback } from "react";
import cn from "classnames";
import {
  IoAdd,
  IoTrashOutline,
  IoCreateOutline,
  IoMenu,
  IoClose,
} from "react-icons/io5";

import styles from "./OnNoteButtonsGroup.module.css";
import Button from "../Button/Button";

interface IButtonGroup {
  onAddNote: () => void;
  onUpdateNote: () => void;
  onDeleteNote: () => void;
  onMenu: () => void;
  isOpen: boolean;
  isDisabled: boolean;
}

const ButtonsGroup: FC<IButtonGroup> = ({
  onAddNote,
  onDeleteNote,
  onUpdateNote,
  isDisabled,
  onMenu,
  isOpen,
}) => {
  return (
    <>
      <div className={cn(styles.menuButton)} onClick={onMenu}>
        {isOpen ? <IoClose size={24} /> : <IoMenu size={24}/>}
      </div>
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
    </>
  );
};

export default ButtonsGroup;
