const router = require('express').Router();
const uuid = require('../helpers/uuid');
const fs = require('fs');

//get route fo retrieving all notes

router.get('/api/notes', async (req, res) => {
    const dbJson = await JSON.parse(fs.readFileSync("db/db.json","utf8"));
    res.json(dbJson);
  });
  
  // Defines the post request to this routes end point '/api/notes'
  router.post('/api/notes', (req, res) => {
    const dbJson = JSON.parse(fs.readFileSync("db/db.json","utf8"));
    const newFeedback = {
      title: req.body.title,
      text: req.body.text,
      id: uuid(),
    };
    dbJson.push(newFeedback);
    fs.writeFileSync("db/db.json",JSON.stringify(dbJson));
    res.json(dbJson);
  }); 

  // the dreadful delete feature
  
  router.delete('/api/notes/:id', (req, res) => {
    let data = fs.readFileSync("db/db.json", "utf8");
    const dataJSON =  JSON.parse(data);
    const newNotes = dataJSON.filter((note) => { 
      return note.id !== req.params.id;
    });
    fs.writeFileSync("db/db.json",JSON.stringify(newNotes));
    res.json("Note deleted.");
  });
  
module.exports = router;