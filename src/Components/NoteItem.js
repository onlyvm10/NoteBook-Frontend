import React,{useContext} from 'react'
import noteContext from "../Context/NoteContext"


export default function NoteItem(props) {


    const Note = useContext(noteContext);
    const { deleteNote } = Note;

    const { note ,updateNote,showAlert} = props;
    return (



        <div className="col-md-3">
            <div className="card my-2">

                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} </p>

                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);
                    showAlert("Note Deleted","success")}}></i>
                    <i className="fa-solid fa-pen mx-2" onClick={()=>{updateNote(note)}}></i>


                </div>
            </div>
        </div>

    )
}
