import { FC } from "react";
import cn from "classnames";

import styles from "./DesktopHeader.module.css";
import ButtonsGroup from "../OnNoteButtonsGroup/OnNoteButtonsGroup";
import SearchBox from "../../containers/SearchBox/SearchBox";

interface IDesktopHeader {
  onAddNote: () => void;
  onUpdateNote: () => void;
  onDeleteNote: () => void;
  isSelectedNote: boolean;
}

const DesktopHeader: FC<IDesktopHeader> = ({
  onAddNote,
  onDeleteNote,
  onUpdateNote,
  isSelectedNote,
}) => {
  return (
    <div className={cn(styles.container)}>
      <ButtonsGroup
        isDisabled={!isSelectedNote}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        onUpdateNote={onUpdateNote}
      />
      <SearchBox />
    </div>
  );
};

export default DesktopHeader;
