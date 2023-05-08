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
          deleteStorage: () => this.deleteStorage(db),
          add: (note: INote) => this.add(db, note),
          put: (note: INote, id: string) => this.put(db, note, id),
        });
      };
      openRequest.onerror = () => {
        reject("Open DB Error!");
      };
    });
  }

  deleteStorage(db: IDBDatabase) {
    console.log(db);
    db?.deleteObjectStore("notes");
  }
  deleteDB() {
    const deleteRequest = indexedDB.deleteDatabase("appDB");
    deleteRequest.onsuccess = function () {
      console.log("DB has been deleted... ", deleteRequest.result);
    };
  }

  add(db: IDBDatabase, note: INote) {
    const tx = db?.transaction(["notes"], "readwrite");
    if (!tx) return false;
    const notes = tx.objectStore("notes");
    const request = notes.add(note);
    request.onsuccess = function () {
      console.log("Note was added in store...", request.result);
    };
    request.onerror = function () {
      console.log("Error", request.error, "---", request);
    };
    tx.oncomplete = function () {
      console.log("All added to ", notes);
    };
  }
  put(db: IDBDatabase, updatedNote: INote, id: string) {
    const notes = db?.transaction("notes", "readwrite").objectStore("notes");
    const idRequest = notes.get(id);
console.log(idRequest)
    idRequest.onsuccess = () => {
      const data = Object.assign(idRequest.result, updatedNote);
      const updatedNoteRequest = notes.put(data)

      console.log(`The transaction that this req is ${updatedNoteRequest.transaction}`)
    }

    
    // const request = notes.put(updatedNote);
    // request.onsuccess = function () {
    //   console.log("Note was added in store...", request.result);
    // };
    // request.onerror = function () {
    //   console.log("Error", request.error, "---", request);
    // };
  }
}

export default new LocacDB();
