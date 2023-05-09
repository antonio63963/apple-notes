interface INote {
  id: string;
  date: Date;
  title: string;
  description: string;
}
interface IEventError extends Event {
  target: { error?: string } | any;
}
interface IDBMethods {
  getAll: () => Promise<INote[]>;
  deleteDB: () => void;
  deleteStorage: () => void;
  add: (note: INote) => any;
  put: (note: INote, id: string) => any;
  delete: (id: string) => any;
  clearDB: () => any;
}

async function initLocalDB(
  storageName: string,
  dbName: string
): Promise<IDBMethods> {
  function deleteStorage(db: IDBDatabase) {
    db?.deleteObjectStore(dbName);
  }
  function deleteDB() {
    const deleteRequest = indexedDB.deleteDatabase(storageName);
    deleteRequest.onsuccess = function () {
      console.log("DB has been deleted... ", deleteRequest.result);
    };
    deleteRequest.onerror = function () {
      console.log("Delete Error...", deleteRequest.error);
    };
  }

  function add(db: IDBDatabase, note: INote): Promise<any> {
    return new Promise((resolve, reject) => {
      const notes = db?.transaction([dbName], "readwrite").objectStore(dbName);
      const request = notes.add(note);
      request.onsuccess = function () {
        console.log("Note was added in store...", request.result);
        resolve(request.result);
      };
      request.onerror = function () {
        console.log("Error", request.error);
        reject(`Error!!! Item hasn't added`);
      };
    });
  }
  function put(db: IDBDatabase, updatedNote: INote, id: string) {
    const notes = db?.transaction(dbName, "readwrite").objectStore(dbName);
    const idRequest = notes.get(id);

    idRequest.onsuccess = () => {
      const data = Object.assign(idRequest.result, updatedNote);
      const updatedNoteRequest = notes.put(data);

      updatedNoteRequest.onsuccess = () => {
        console.log("UPDATED!!!");
      };
      updatedNoteRequest.onerror = () => {
        console.log("Update Error... ", updatedNoteRequest.error);
      };
    };
  }
  function deleteItem(db: IDBDatabase, id: string) {
    const notes = db?.transaction(dbName, "readwrite").objectStore(dbName);
    const idRequest = notes.get(id);

    idRequest.onsuccess = () => {
      const deletedNoteRequest = notes.delete(id);

      deletedNoteRequest.onsuccess = () => {
        console.log("DELETED!!!");
      };
      deletedNoteRequest.onerror = () => {
        console.log("Delete Error...", deletedNoteRequest.error);
      };
    };
  }
  function clearDB(db: IDBDatabase) {
    const notes = db?.transaction(dbName, "readwrite").objectStore(dbName);
    const clearStorage = notes.clear();
    clearStorage.onsuccess = () => {
      console.log("DB has been cleared...", clearStorage.result);
    };
  }
  function getAll(db: IDBDatabase): Promise<INote[]> {
    return new Promise((resolve, reject) => {
      const notes = db?.transaction(dbName, "readwrite").objectStore(dbName);
      const getAllRequest = notes.getAll();

      getAllRequest.onsuccess = () => {
        console.log("Got all items...", getAllRequest.result);
        resolve(getAllRequest.result);
      };
      getAllRequest.onerror = () => {
        reject("Error... Something has gone wrong...");
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
        getAll: () => getAll(db),
        deleteDB,
        deleteStorage: () => deleteStorage(db),
        add: (note: INote) => add(db, note),
        put: (note: INote, id: string) => put(db, note, id),
        delete: (id: string) => deleteItem(db, id),
        clearDB: () => clearDB(db),
      });
    };
    openRequest.onerror = () => {
      reject("Open DB Error!");
    };
  });
}

export default initLocalDB;
export type { INote };
