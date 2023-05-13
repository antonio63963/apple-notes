interface INote {
  id: string;
  date: Date;
  title: string;
  description: string;
}
interface ISuccess {
  status: string;
  data: any;
}
interface IError {
  title: string;
  message: any;
}
interface IEventError extends Event {
  target: { error?: string } | any;
}
interface IDBMethods {
  getAll: () => Promise<ISuccess>;
  deleteDB: () => Promise<ISuccess>;
  deleteStorage: () => void;
  add: (note: INote) => Promise<ISuccess>;
  put: (note: INote, id: string) => Promise<ISuccess>;
  delete: (id: string) => Promise<ISuccess>;
  clearDB: () => Promise<ISuccess>;
}
interface IOpenDB {
  status: string;
  data: IDBMethods;
}

export type { INote, IError, ISuccess, IEventError, IOpenDB };
