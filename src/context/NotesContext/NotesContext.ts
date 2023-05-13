import { createContext } from "react";

import { INoteContext } from "./NotesContext.type";

const NotesContext = createContext<INoteContext>({
  notes: [],
  setNotes: () => {},
  db: null,
  selectedNote: null,
  setSelectedNote: () => {},
  searchFilter: "",
  setSearchFilter: () => {},
});

export default NotesContext;
