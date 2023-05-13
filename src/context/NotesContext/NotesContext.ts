import { createContext } from "react";

import { INoteContext } from "./NotesContext.type";

const authContext = createContext<INoteContext>({
  notes: [],
  setNotes: () => {},
  localDB: null,
  selectedNote: null,
  setSelectedNote: () => {},
  searchFilter: "",
  setSearchFilter: () => {},
});

export default authContext;
// export type { INote, IDBMethods, IError, ISuccess };
