import React, { useContext, useEffect, useRef, useState  } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const navigate  = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote} = context
  const [note, setNote] = useState({id:"",etitle: "", edescription: "", etag: "default"})
  useEffect(() => {
    if (localStorage.getItem('token')){
      getNotes()
    }
    else{
      props.showAlert("Please login", "waring")
      navigate("/login")
    }
    //eslint-disable-next-line
  },[])

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    if (ref.current) {
      ref.current.click(); // Simulate a click on the referenced element
    } else {
      console.error("ref.current is null. Make sure the ref is correctly assigned.");
    }
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  };
  const handelClick = (e)=>{
    editNote(note.id, note.etitle, note.edescription, note.etag)
    if (refClose.current) {
      refClose.current.click(); // Simulate a click on the referenced element
    } else {
      console.error("ref.current is null. Make sure the ref is correctly assigned.");
    }
    props.showAlert("Updated a Note Successfully", "success")
}
const onChange = (e)=>{
    e.preventDefault(); 
    setNote({...note, [e.target.name]: e.target.value})
}
  return (
    <>
      <div>
        {/* Button to trigger the modal */}
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
        <div className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"  
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className={`form-label text-${props.mode}`}>Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" placeholder="Title" value={note.etitle} onChange={onChange} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className={`form-label text-${props.mode}`}>Description</label>
                  <textarea className="form-control" id="edescription" name='edescription' rows="3" value={note.edescription}onChange={onChange} required></textarea>
                  <label htmlFor="tag" className={`form-label text-${props.mode}`}>Tag</label>
                  {/* <input type="text" className="form-control" id="tag" name="tag" placeholder="Default" onChange={onChange}/> */}
                  <input type='text' className="form-control" id='etag' name='etag' placeholder="Default" onChange={onChange} value={note.etag}/>
                </div>
              </div>
              <div className="modal-footer">
                <button ref={refClose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button disabled={note.etitle.length<3 || note.edescription.length<3}type="button" className="btn btn-primary" onClick={handelClick}>
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`row Title my-4 text-${props.mode}`}>
        <h4>Your Notes</h4>
        <div className="container mx-2">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.length > 0 && notes.map((note) => {
          return <Noteitem key={note._id} note={note} updateNote={updateNote} mode={props.mode} showAlert={props.showAlert}/>;
        })}
      </div>
    </>
  );
}

export default Notes;
