import { NoteAPI } from "./api/note-api";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { useDispatch } from "react-redux";
import { setNoteList } from "./store/notes/notes-slice";
import { useEffect } from "react";

export function App() {
  const dispatch = useDispatch();

  async function fetchAllNotes(){
    const noteList = await NoteAPI.fetchAll();
    dispatch(setNoteList(noteList));
  }

  useEffect(() => {
    fetchAllNotes();
  }, []);

  return <div>
    <Header/>

    <Outlet/>
  </div>;
}
