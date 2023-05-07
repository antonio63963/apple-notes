import React, { FC } from "react";
import cn from "classnames";

import { Sidebar } from "../components";
import Note from "../components/NoteDetailes/NoteDetailes";
import { ContentContainer, HeaderContainer } from "../containers";

const MainPage: FC = () => {
  return (
    <>
      <HeaderContainer />
      <ContentContainer />
    </>
  );
};

export default MainPage;
