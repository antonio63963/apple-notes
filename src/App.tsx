import React, { useState, useEffect, useCallback } from "react";
import {
  NotesContext,
  INote,
  IDBMethods,
  IError,
  ISuccess,
} from "./context/NotesContext";
import initLocalDB from "./services/indexedDB";

import MainPage from "./pages/MainPage";

import "./App.css";
import { MessageModal } from "./components";

function App() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [localDB, setLocalDB] = useState<IDBMethods | null>(null);
  const [errorInfo, setErrorInfo] = useState<{
    title: string;
    message: string;
  } | null>(null);
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);

  const getLocalDB = useCallback(async () => {
    try {
      const { data: db } = await initLocalDB("appDB", "notes");
      setLocalDB(db);
      if (db) {
        const { data } = await db.getAll();
        setNotes(data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getLocalDB();
  }, []);

  return (
    <NotesContext.Provider
      value={{
        localDB,
        notes,
        setNotes,
        errorInfo,
        setErrorInfo,
        selectedNote,
        setSelectedNote,
      }}
    >
      <div className="App">
        {localDB ? <MainPage /> : <h1>Loading...</h1>}
        {errorInfo && (
          <MessageModal
            onClose={() => setErrorInfo(null)}
            title={errorInfo.title}
            message={errorInfo.message}
          />
        )}
      </div>
    </NotesContext.Provider>
  );
}

export default App;
