import React, { useState, useEffect, useCallback } from "react";
import { NotesContext, INote, IDBMethods } from "./context/NotesContext";
import AppContext from "./context/AppContext";

import initLocalDB from "./services/IndexedDB/indexedDB";
import { getAll, createNote } from "./services/quintaDB/quinta";

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
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

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
    <AppContext.Provider
      value={{ errorInfo, setErrorInfo, isSidebarOpen, setIsSidebarOpen }}
    >
      <NotesContext.Provider
        value={{
          localDB,
          notes,
          setNotes,
          selectedNote,
          setSelectedNote,
          searchFilter,
          setSearchFilter,
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
    </AppContext.Provider>
  );
}

export default App;
