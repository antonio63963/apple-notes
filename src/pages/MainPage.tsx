import React, { FC, useEffect, useState } from "react";
import { ContentContainer, HeaderContainer } from "../containers";
import localDB from "../services/indexedDB";

const MainPage: FC = () => {
  const [db, setDb] = useState<any>(null);

  const getDB = async () => {
    const resp = await localDB.open();
    setDb(resp);
  };
  useEffect(() => {
    getDB();
  }, []);
  useEffect(() => {
    console.log("db ", db);
    const newNote = {id: '8',title: "Test10", date: new Date(), description: 'Some text'}
    if(db) {
      db.put(newNote, '8')
    }
  }, [db]);

  return (
    <>
      <HeaderContainer />
      <ContentContainer />
    </>
  );
};

export default MainPage;
