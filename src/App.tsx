import React, { useState, useEffect, useCallback } from "react";
import { NotesContext, INote, IDBMethods } from "./context/NotesContext";
import initLocalDB from "./services/indexedDB";

import MainPage from "./pages/MainPage";

import "./App.css";

function App() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [localDB, setLocalDB] = useState<IDBMethods | null>(null);

  const getLocalDB = useCallback(async () => {
    try {
      const { data: db } = await initLocalDB("appDB", "notes");
      setLocalDB(db);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getLocalDB();
  }, []);

  return (
    <NotesContext.Provider value={{localDB, notes, setNotes}}>
      <div className="App">
        <MainPage />
      </div>
    </NotesContext.Provider>
  );
}

export default App;
