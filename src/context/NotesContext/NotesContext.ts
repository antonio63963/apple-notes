import { createContext } from "react";

interface INote {
  id: string;
  title: string;
  date: Date;
  description: string;
  isSelected: boolean;
}
interface ISuccess {
  status: string;
  data: any;
}
interface IError {
  title: string;
  message: any;
}
interface IDBMethods {
  getAll?: () => Promise<ISuccess | IError>;
  deleteDB?: () => Promise<ISuccess | IError>;
  deleteStorage?: () => void;
  add?: (note: INote) => Promise<ISuccess | IError>;
  put?: (note: INote, id: string) => Promise<ISuccess | IError>;
  delete?: (id: string) => Promise<ISuccess | IError>;
  clearDB?: () => Promise<ISuccess | IError>;
}

interface INoteContext {
  notes: INote[] | [];
  setNotes: (data: INote[]) => void;
  localDB: IDBMethods | null;
}

const authContext = createContext<INoteContext>({
  notes: [],
  setNotes: () => {
    console.log();
  },
  localDB: {},
});

export default authContext;
export type { INote, IDBMethods };
