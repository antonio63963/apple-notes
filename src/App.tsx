import React, { useState, useEffect, useCallback } from "react";
import { NotesContext, INote, IDBMethods } from "./context/NotesContext";
import AppContext from "./context/AppContext";

import initLocalDB from "./services/IndexedDB/indexedDB";

import useDB from "./hooks/useDB";

import MainPage from "./pages/MainPage";

import "./App.css";
import { MessageModal, SelectDBModal } from "./components";

type IName = "indexed" | "quinta" | null;
function App() {
  const [isSelectDBModal, setIsSelectDBModal] = useState<boolean>(true);
  const [dbName, setDbName] = useState<IName>(null);
  const [notes, setNotes] = useState<INote[]>([]);
  const [db, setDb] = useState<IDBMethods | null>(null);
  const [errorInfo, setErrorInfo] = useState<{
    title: string;
    message: string;
  } | null>(null);
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useDB(dbName, setDb, setNotes);
  useEffect(() => {
    console.log("db: ", db, "dbName: ", dbName);
  }, [dbName, db]);
  return (
    <AppContext.Provider
      value={{ errorInfo, setErrorInfo, isSidebarOpen, setIsSidebarOpen }}
    >
      <NotesContext.Provider
        value={{
          db,
          notes,
          setNotes,
          selectedNote,
          setSelectedNote,
          searchFilter,
          setSearchFilter,
        }}
      >
        <div className="App">
          {isSelectDBModal && (
            <SelectDBModal
              title="What DB do you want to use?"
              onClose={() => setIsSelectDBModal(false)}
              onSelectDB={setDbName}
            />
          )}
          {db && dbName ? <MainPage /> : <h1>Loading...</h1>}
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
