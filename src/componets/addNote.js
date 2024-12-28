import React ,{useContext, useState}from 'react';
import Notes from './notes';
import noteContext from '../context/notes/noteContext';
const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context 
    const [note, setNote] = useState({title: "", description: "", tag: "default"})
    const handelClick = ()=>{
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: "default"})
        props.showAlert("A Note Is Been Added", "success")
    }
    const onChange = (e)=>{
        e.preventDefault(); 
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <h4 className={`Title my-4 text-${props.mode}`}>Add a Note Here</h4>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className={`form-label text-${props.mode}`}>Title</label>
        <input type="text" className="form-control" id="title" name="title" placeholder="Title" onChange={onChange} required value={note.title}/>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className={`form-label text-${props.mode}`}>Description</label>
        <textarea className="form-control" id="description" name='description' rows="3" onChange={onChange} required value={note.description}></textarea>
        <label htmlFor="tag" className={`form-label text-${props.mode}`}>Tag</label>
        {/* <input type="text" className="form-control" id="tag" name="tag" placeholder="Default" onChange={onChange}/> */}
        <input type='text' className="form-control" id='tag' name='tag' placeholder="Default" onChange={onChange} value={note.tag}/>
        <button disabled={note.title.length<3 || note.description.length<3}type='submit' className={`btn btn-${props.mode} my-3`} onClick={handelClick}>Save</button>
      </div>
      <Notes mode={props.mode} showAlert={props.showAlert}/>      
    </div>
  );
}

export default AddNote;
