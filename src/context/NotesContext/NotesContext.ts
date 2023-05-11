import { createContext } from "react";

interface INote {
  id: string;
  title: string;
  date: Date;
  description: string;
  isSelected?: boolean;
}
interface ISuccess {
  status: string;
  data: any;
}
interface IError {
  title: string;
  message: any;
}
type ISetNotes = (data: INote[]) => INote[] | INote[] | [];

interface IDBMethods {
  getAll?: () => Promise<ISuccess>;
  deleteDB?: () => Promise<ISuccess>;
  deleteStorage?: () => void;
  add?: (note: INote) => Promise<ISuccess>;
  put?: (note: INote, id: string) => Promise<ISuccess>;
  delete?: (id: string) => Promise<ISuccess>;
  clearDB?: () => Promise<ISuccess>;
}

interface INoteContext {
  notes: INote[] | [];
  setNotes: (data: ISetNotes) => void;
  localDB: IDBMethods | null;
  selectedNote: INote | null;
  setSelectedNote: (data: INote) => void;
  searchFilter: string;
  setSearchFilter: (data: string) => void;
  // errorInfo: IError | undefined | null;
  // setErrorInfo: (data: IError) => void;
}

const authContext = createContext<INoteContext>({
  notes: [],
  setNotes: () => {},
  localDB: null,
  selectedNote: null,
  setSelectedNote: () => {},
  searchFilter: "",
  setSearchFilter: () => {},
  // errorInfo: null,
  // setErrorInfo: () => {},
});

export default authContext;
export type { INote, IDBMethods, IError, ISuccess };
