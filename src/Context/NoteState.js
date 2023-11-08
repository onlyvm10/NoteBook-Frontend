import React, { useState } from "react";
import noteContext from "./NoteContext";




const NoteState = (props) => {

    const host = "http://localhost:5000";


    const [notes, setNotes] = useState([]);

    //fetch all notes

    const fetchNotes = async () => {


        const response = await fetch(`${host}/api/note/fetchAllNotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            }
        });

        const json = await response.json();
        setNotes(json.note);
    }


    //Create a note
    const addNote = async (title, description, tag) => {
        //TODO: API CALL
        const response = await fetch(`${host}/api/note/addNote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },

            body: JSON.stringify({ title, description, tag }),
        });

        console.log(await response.json());


        fetchNotes();
    }

    //Update a note

    const editNote = async (id, title, description, tag) => {
        //API CALL : 
        const response = await fetch(`${host}/api/note/updateNote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },

            body: JSON.stringify({ title, description, tag }),
        });

        console.log(await response.json());

        fetchNotes();
    }

    //Delete a note

    const deleteNote = async (id) => {
        //Server side deletion 
        //TODO: API CALL
        const response = await fetch(`${host}/api/note/deleteNote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            }
        });

        console.log(await response.json());


        //Client side deletion
        console.log("Deleing a note with id" + id);
        const newNotes = notes.filter((note) => { return (id !== note._id) });
        setNotes(newNotes);
    }



    return (
        <noteContext.Provider value={{ notes, editNote, addNote, deleteNote, fetchNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;