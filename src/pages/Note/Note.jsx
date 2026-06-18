import { NoteForm } from "../../components/NoteForm/NoteForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { NoteAPI } from "../../api/note-api";
import { updateNote , deleteNote } from "../../store/notes/notes-slice"

export function Note(props){
    const {noteId}= useParams();
    const note = useSelector((store)=> store.notesSlice.noteList.find((note)=> note.id === noteId));
    const [isEditable,setIsEditable] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const submit = async (formValues) => {
        const updatedNote = await NoteAPI.updateById(note.id,formValues);
        dispatch(updateNote(updatedNote));
        setIsEditable(false);
    };

   async function deleteNote_(){
       if(window.confirm('Do you want to delete the note?')){
        NoteAPI.deteleById(note.id);
        dispatch(deleteNote(note));
        navigate('/');
       }
    }

    return (
    <>
        {note && (
            <NoteForm 
                isEditable = {isEditable}
                title = {isEditable ? 'Edit note' : note.title} 
                note = {note}
                onClickDelete={deleteNote_}
                onClickEdit={()=> setIsEditable(!isEditable)}
                onSubmit={isEditable && submit}
            />
        )}
    </>
    );
}