import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../Context/NoteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from "react-router-dom";


export default function Notes(props) {
  const Note = useContext(noteContext);
  const { notes, fetchNotes, editNote } = Note;
  let history = useNavigate();

  const { showAlert } = props;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchNotes()
    }
    else {
      history("/login");
    }
    // eslint-disable-next-line
  }, [])

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {

    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag)
    console.log("Updated", note);
    showAlert("Note Updated", "success");
    refClose.current.click();
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }


  return (
    <>
      <AddNote showAlert={showAlert} />
      <>
        {/* Button trigger modal */}
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>


                  <div className="mb-3 my-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange} />

                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="description" className="form-control" value={note.edescription} id="edescription" name='edescription' onChange={onChange} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="tag" className="form-control" id="etag" value={note.etag} name='etag' onChange={onChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
                <button disabled={note.etitle.length < 5 || note.edescription.length < 5 || note.etag.length === 0} type="button" className="btn btn-primary" onClick={handleClick}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </>

      <h1 className='my-3'>Your Notes</h1>
      <div >
        <p><i><b>  {notes.length === 0 && "*You have not added any notes yet."}</b></i></p>
      </div >
      <div className='row my-3'>
        {notes.map((element) => {
          return <NoteItem key={element._id} updateNote={updateNote} note={element} showAlert={showAlert} />;

        })}



      </div>
    </>
  )
}
