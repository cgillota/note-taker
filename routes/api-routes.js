const app = require("express").Router();
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

//get route fo retrieving all notes
app.get('/notes', (req, res) => {
 readfromFile('./db/db.json'). then((data) => res.json(JSON.parse(data)));
});

//post route for new note
app.post('/notes', (req, res) => {
    console.log(req.body); 

    const {title, noteBody} = req.body;

    if (req.body) { 
        const newNote = { 
            title,
            noteBody,
            note_id: uuid(),
        }; 

        readAndAppend(newNote, './db/db.json'); 
        res.json(`Note has been added!`); 
    } else { 
        res.error('Error adding note');
    }
    });

module.exports = app;