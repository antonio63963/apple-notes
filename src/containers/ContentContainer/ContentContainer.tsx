import { FC } from "react";
import cn from "classnames";
import { Sidebar } from "../../components";
import NoteDetailsContainer from "../NoteDetailsContainer/NoteDetailesContainer";

const ContentContainer: FC = () => {
  return (
    <div
      style={{ position: "fixed", top: "0", bottom: "0", display: "flex"}}
      className={cn("appWidthContent", "topPadding")}
    >
      <Sidebar />
      <NoteDetailsContainer />
    </div>
  );
};

export default ContentContainer;
