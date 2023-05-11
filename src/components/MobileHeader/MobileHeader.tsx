import { FC } from "react";
import cn from "classnames";
import { IoMenu, IoClose } from "react-icons/io5";

import styles from "./MobileHeader.module.css";
import ButtonsGroup from "../OnNoteButtonsGroup/OnNoteButtonsGroup";
import SearchBox from "../../containers/SearchBox/SearchBox";

interface IMobileHeader {
  onMenu: () => void;
  isOpen: boolean;
  onAddNote: () => void;
  onUpdateNote: () => void;
  onDeleteNote: () => void;
  isSelectedNote: boolean;
}

const MobileHeader: FC<IMobileHeader> = ({
  onMenu,
  isOpen,
  onAddNote,
  onDeleteNote,
  onUpdateNote,
  isSelectedNote,
}) => {
  return (
    <div className={cn(styles.container)}>
      <div className={cn(styles.menuButton)} onClick={onMenu}>
        {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
      </div>
      {isOpen ? (
        <SearchBox />
      ) : (
        <ButtonsGroup
          isDisabled={!isSelectedNote}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          onUpdateNote={onUpdateNote}
        />
      )}
    </div>
  );
};

export default MobileHeader;
