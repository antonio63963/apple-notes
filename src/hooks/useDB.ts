import { useState, useEffect, useContext } from "react";

import initLocalDB from "../services/IndexedDB/indexedDB";
import quintaDB from "../services/quintaDB/quinta";
import {
  IDBMethods,
  INote,
  ISuccess,
} from "../services/IndexedDB/indexedDB.type";

type IName = "indexed" | "quinta" | null;

interface IResponse {
  setNotes: (data: INote[]) => void;
  setDB: (data: IDBMethods) => void;
}

const useDB = (
  dbName: IName,
  setDB: (data: IDBMethods) => void,
  setNotes: (data: INote[]) => void
) => {
  const initDB = async () => {
    if(!dbName) return;
    try {
      if (dbName === "indexed") {
        const { data: db } = await initLocalDB("appDB", "notes");
        if (db) {
          const { data } = await db.getAll();
          console.log(data)
          setNotes(data);
          setDB(db);
        }
      }
      if (dbName === "quinta") {
        const { data } = await quintaDB.getAll();
        if (data) {
          setNotes(data);
          console.log(data)
          setDB({
            getAll: quintaDB.getAll,
            add: quintaDB.add,
            put: quintaDB.put,
            delete: quintaDB.delete,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("DB");
    initDB();
  }, [dbName]);
};

export default useDB;
