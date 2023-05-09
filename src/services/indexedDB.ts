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
  getAll: () => Promise<ISuccess | IError>;
  deleteDB: () => Promise<ISuccess | IError>;
  deleteStorage: () => void;
  add: (note: INote) => Promise<ISuccess | IError>;
  put: (note: INote, id: string) => Promise<ISuccess | IError>;
  delete: (id: string) => Promise<ISuccess | IError>;
  clearDB: () => Promise<ISuccess | IError>;
}
interface IOpenDB {
  status: string;
  data: IDBMethods;
}

async function initLocalDB(
  storageName: string,
  dbName: string
): Promise<IOpenDB> {
  function deleteStorage(db: IDBDatabase): void {
    db?.deleteObjectStore(dbName);
  }
  function deleteDB(): Promise<ISuccess | IError> {
    return new Promise((resolve, reject) => {
      const deleteRequest = indexedDB.deleteDatabase(storageName);

      deleteRequest.onsuccess = function () {
        console.log("DB has been deleted... ", deleteRequest.result);
        resolve({ status: "ok", data: deleteRequest.result });
      };
      deleteRequest.onerror = function () {
        console.log("Delete Error...", deleteRequest.error);
        reject({ title: "Delete Error...", message: deleteRequest.error });
      };
    });
  }

  function add(db: IDBDatabase, note: INote): Promise<ISuccess | IError> {
    return new Promise((resolve, reject) => {
      const notes = db?.transaction([dbName], "readwrite").objectStore(dbName);
      const request = notes.add(note);
      request.onsuccess = function () {
        console.log("Note was added in store...", request.result);
        resolve({ status: "ok", data: request.result });
      };
      request.onerror = function () {
        console.log("Error", request.error);
        reject({ title: `Added Error...`, message: request.error });
      };
    });
  }
  function put(db: IDBDatabase, updatedNote: INote, id: string): Promise<ISuccess | IError> {
    return new Promise((resolve, reject) => {
      const notes = db?.transaction(dbName, "readwrite").objectStore(dbName);
      const idRequest = notes.get(id);

      idRequest.onsuccess = () => {
        const data = Object.assign(idRequest.result, updatedNote);
        const updatedNoteRequest = notes.put(data);

        updatedNoteRequest.onsuccess = () => {
          console.log("UPDATED!!!");
          resolve({ status: "ok", data: updatedNoteRequest.result });
        };
        updatedNoteRequest.onerror = () => {
          console.log("Update Error... ", updatedNoteRequest.error);
          reject({
            title: "Update Error...",
            message: updatedNoteRequest.error,
          });
        };
      };
    });
  }
  function deleteItem(db: IDBDatabase, id: string): Promise<ISuccess | IError> {
    return new Promise((resolve, reject) => {
      const notes = db?.transaction(dbName, "readwrite").objectStore(dbName);
      const idRequest = notes.get(id);

      idRequest.onsuccess = () => {
        const deletedNoteRequest = notes.delete(id);

        deletedNoteRequest.onsuccess = () => {
          console.log("DELETED!!!");
          resolve({ status: "ok", data: deletedNoteRequest.result });
        };
        deletedNoteRequest.onerror = () => {
          console.log("Delete Error...", deletedNoteRequest.error);
          reject({
            title: "Delete Error...",
            message: deletedNoteRequest.error,
          });
        };
      };
    });
  }
  function clearDB(db: IDBDatabase): Promise<ISuccess | IError> {
    return new Promise((resolve, reject) => {
      const notes = db?.transaction(dbName, "readwrite").objectStore(dbName);
      const clearRequest = notes.clear();
      clearRequest.onsuccess = () => {
        console.log("DB has been cleared...", clearRequest.result);
        resolve({ status: "ok", data: clearRequest.result });
      };
      clearRequest.onerror = () => {
        reject({ title: "DB hasn't deleted...", message: clearRequest.error });
      };
    });
  }
  function getAll(db: IDBDatabase): Promise<ISuccess | IError> {
    return new Promise((resolve, reject) => {
      const notes = db?.transaction(dbName, "readwrite").objectStore(dbName);
      const getAllRequest = notes.getAll();

      getAllRequest.onsuccess = () => {
        console.log("Got all items...", getAllRequest.result);
        resolve({ status: "ok", data: getAllRequest.result });
      };
      getAllRequest.onerror = () => {
        reject({ title: "Request is failed...", message: getAllRequest.error });
      };
    });
  }

  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open(storageName, 1);
    openRequest.onupgradeneeded = () => {
      const dbOpen = openRequest.result;
      if (!dbOpen.objectStoreNames.contains(dbName)) {
        dbOpen.createObjectStore(dbName, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
    openRequest.onsuccess = (event: IEventError) => {
      const db = event.target?.result;
      resolve({
        status: "ok",
        data: {
          getAll: () => getAll(db),
          deleteDB,
          deleteStorage: () => deleteStorage(db),
          add: (note: INote) => add(db, note),
          put: (note: INote, id: string) => put(db, note, id),
          delete: (id: string) => deleteItem(db, id),
          clearDB: () => clearDB(db),
        },
      });
    };
    openRequest.onerror = () => {
      reject({ title: "Open DB Error!", message: openRequest.error });
    };
  });
}

export default initLocalDB;
export type { INote, ISuccess, IError };
