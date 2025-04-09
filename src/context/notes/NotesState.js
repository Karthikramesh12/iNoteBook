import React, { useState } from "react";
import noteContext from "./noteContext";

const NotesState = (props)=>{
    const host = "http://localhost:5000"
    const initialNotes = []
    const [notes, setNotes] = useState([initialNotes])

    // get note

    const getNotes = async()=>{
        const url = `${host}/api/v1/notes/getnotes`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token') || ''
            }
        });
        const json = await response.json()
        setNotes(json)
    }

    const addNote = async (title, description, tag) =>{
        // todo api call
        const url = `${host}/api/v1/notes/addnote`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json()
        const note = json;
        setNotes(notes.concat(note))
    }
    //edit note
    const editNote = async (id, title, description, tag) =>{
        // API call 
        const url = `${host}/api/v1/notes/updatenote/${id} `
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json()
        console.log(json)
        //logic to edit in client
        for (let index = 0; index<notes.length;index++){
            const element = notes[index]
            if(element._id === id){
                element.title = title
                element.description = description
                element.tag = tag
            }
        }
    }

    //delete note

    const deleteNote = async (id) =>{
        // TODO api call
        const url = `${host}/api/v1/notes/deletenote/${id} `
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
        });
        const json = response.json()
        console.log(json)
        const newNotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes)
    }
    return(
        <noteContext.Provider value={{notes,addNote, editNote, deleteNote, getNotes}}>
            {props.children}    
        </noteContext.Provider>
    )
}

export default NotesState;
