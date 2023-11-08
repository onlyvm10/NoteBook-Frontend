import React, { useContext, useState } from 'react'
import noteContext from '../Context/NoteContext'




const AddNote = (props) => {
    const { showAlert } = props;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const context = useContext(noteContext);


    const { addNote } = context;



    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        showAlert("Note Added", "success")
        setNote({ title: "", description: "", tag: "" })
    }


    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <form>

                <h1>Add a note</h1>

                <div className="mb-3 my-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={3} required />
                    <div id="emailHelp" class="form-text"><i>*Title must me 3 characters long</i></div>

                </div>
               
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="description" className="form-control"
                        value={note.description} id="description" name='description' onChange={onChange} minLength={8} required />
                        <div id="emailHelp" class="form-text"><i>*Description must me 8 characters long</i></div>
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="tag" className="form-control" id="tag"
                        value={note.tag} name='tag' onChange={onChange} />
                         <div id="emailHelp" class="form-text"><i>*Tag must be given</i></div>
                </div>


                <button disabled={note.description.length < 8 || note.title.length < 3 || note.tag.length === 0} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>




            </form>
        </div>
    )
}

export default AddNote
