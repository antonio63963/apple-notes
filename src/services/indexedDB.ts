interface ILocalDB {
  openRequest: IDBOpenDBRequest | null;
  // db: IDBDatabase | null;
  open: () => {
    add: (note: INote) => void;
    delete: () => void;
    deleteDB: () => void;
  };
}
interface INote {
  id: string;
  date: Date;
  title: string;
  description: string;
}
interface IEventError extends Event {
  target: { error?: string } | any;
}

class LocacDB {
  db: IDBDatabase | null = null;
  async open() {
    return new Promise((resolve, reject) => {
      const openRequest = indexedDB.open("appDB", 1);
      openRequest.onupgradeneeded = () => {
        const dbOpen = openRequest.result;
        if (!dbOpen.objectStoreNames.contains("notes")) {
          dbOpen.createObjectStore("notes", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      };
      openRequest.onsuccess = (event: IEventError) => {
        const db = event.target?.result;
        resolve({
          deleteDB: this.deleteDB,
          add: (note: INote) => this.add(db, note),
          put: (note: INote, id: string) => this.put(db, note, id),
          delete: (id: string) => this.delete(db, id),
          clearDB: () => this.clearDB(db),
          getAll: () => this.getAll(db),
        });
      };
      openRequest.onerror = () => {
        reject("Open DB Error!");
      };
    });
  }

  deleteDB() {
    const deleteRequest = indexedDB.deleteDatabase("appDB");
    deleteRequest.onsuccess = function () {
      console.log("DB has been deleted... ", deleteRequest.result);
    };
    deleteRequest.onerror = function () {
      console.log("Delete Error...", deleteRequest.error);
    };
  }

  add(db: IDBDatabase, note: INote) {
    const notes = db?.transaction("notes", "readwrite").objectStore("notes");

    const request = notes.add(note);
    request.onsuccess = function () {
      console.log("Note was added in store...", request.result);
    };
    request.onerror = function () {
      console.log("Error", request.error, "---", request);
    };
  }
  put(db: IDBDatabase, updatedNote: INote, id: string) {
    const notes = db?.transaction("notes", "readwrite").objectStore("notes");
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
  delete(db: IDBDatabase, id: string) {
    const notes = db?.transaction("notes", "readwrite").objectStore("notes");
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
  clearDB(db: IDBDatabase) {
    const notes = db?.transaction("notes", "readwrite").objectStore("notes");
    const clearStorage = notes.clear();
    clearStorage.onsuccess = () => {
      console.log("DB has been cleared...", clearStorage.result);
    };
  }
  getAll(db: IDBDatabase) {
    const notes = db?.transaction("notes", "readwrite").objectStore("notes");
    const getAllRequest = notes.getAll();
    getAllRequest.onsuccess = () => {
      console.log("Got all items...", getAllRequest.result);
    };
  }
}

export default new LocacDB();
