const express = require('express');
const router = express.Router();
const fetchuser = require('../middleWare/fetchuser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Notes');

// route 1: get all notes using GET "api/v1/notes/getnotes"
router.get('/getnotes', fetchuser, async (req, res)=>{
    try{
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal server Error");
    }
})
// route 2: add all notes using POST "api/v1/notes/getnotes"
router.post('/addnote', fetchuser,[
    body('title', 'Enter a valid Title').isLength({min: 3}),
    body('description', 'Enter a valid Description').isLength({min: 5}),
], async (req, res)=>{
    try{
        const errors = validationResult(req);
        const {title, description, tag} = req.body;
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal server Error");
    }
})
// route 3: update notes using PUT "api/v1/notes/update"
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    try{
        const {title, description, tag} = req.body;
        const newNote = {};
        if(title){
            newNote.title = title;
        }
        if(description){
            newNote.description = description
        }
        if(tag){
            newNote.tag = tag
        }
        // find the note to be updated
        let note = await Notes.findById(req.params.id);
        if(!note){
            res.status(404).send({error:"Note Not found"})
        }
        if (String(note.user) !== req.user.id){
            res.status(401).send("Nice try Buddy")
        }
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note})
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal server Error");
    }
})
// route 4: delete notes using DELETE "api/v1/notes/deletenote"
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    try{
        // find the note to be deleted
        let note = await Notes.findById(req.params.id);
        if(!note){
            res.status(404).send({error:"Note Not found"})
        }
        //allow deletion only if the user owns the notes
        if (String(note.user) !== req.user.id){
            res.status(401).send("Nice try Buddy")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"successs" : "Note has been deleted", note: note})
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal server Error");
    }
})

module.exports = router