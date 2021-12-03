// Require FS
const fs = require('fs');
const generateUniqueId = require('generate-unique-id');

// Function to edit the notes 
const editNote = (updatedNotesArray) => {
  fs.writeFile('./db/db.json', JSON.stringify(updatedNotesArray), (err) => {
     if(err) throw err;
  });
};
// Get data
module.exports = (app) => {
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if(err)throw err;
    res.json(JSON.parse(data));

  });
});

// Post route
app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    const notesArray = JSON.parse(data);
    newNote.id = generateUniqueId({length: 6});
    notesArray.push(newNote);

    editNote(notesArray);
    console.log(`New note added! Title: ${JSON.stringify(newNote.title)}, Text: ${JSON.stringify(newNote.text)}, Id: ${JSON.stringify(newNote.id)} `);
   res.send(notesArray);
});
});

// Delete route
app.delete('/api/notes/:id', (req, res) => {
  const deleteNotesById = req.params.id;

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    let notesArray = JSON.parse(data);
    for(let i = 0; i < notesArray.length; i++){
      if(notesArray[i].id === deleteNotesById){
        notesArray.splice(i, 1);
      }
    }
    editNote(notesArray);
    console.log(`Note Id: ${deleteNotesById} was deleted!`);
    res.send(notesArray);

  });
});

// Put route
app.put('/api/notes/:id', (req, res) => {
  const editNoteId = req.params.id;
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
     if(err) throw err;
     let notesArray = JSON.parse(data);
     let selectedNote = notesArray.find((note) => note.id === editNoteId);
       if(selectedNote){
         let updateNote = {
          title: req.body.title,
          text: req.body.text,
          id: req.body.id
         };
         let targetNoteIndex = notesArray.indexOf(selectedNote);
         notesArray.splice(targetNoteIndex, 1, updateNote);
         res.sendStatus(200);
         editNoteId(notesArray);
         res.json(notesArray);
       } else {
         res.sendStatus(404);
       }
  });
});
};