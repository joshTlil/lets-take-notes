const note = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');



note.post('/', (req, res) => {
    console.info(`${req.method} request received to add a review`);

    const { title, text } = req.body;

    if(title && text) {
        const newNotes = {
            title,
            text,
            notes_id: uuid(),
        };
       

           const response = {
               status: 'success',
               body: newNotes,
           };
          
           readAndAppend(newNotes, './db/db.json');
           
           
           res.json(response);
}      else {
       res.json('Error in posting feedback');
}
});

note.get('/', (req, res) => {
    console.info(`${req.method} request received for feedback`);
  
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  note.delete('/:_id', (req, res) => {
    console.info(`${req.method} request received for deletion.`);
  
  

 
    // if (req.params.notes_id) {
    //   console.info(`${req.method} request received to get a single a review`);
    //   const notesId = req.params.notes_id;
    //   for (let i = 0; i < note.length; i++) {
    //     const currentNote = note[i];
    //     if (currentNote.notes_id === notesId) {
    //       res.json(currentNote);
    //       return;
    //     }
    //   }
    //   res.status(404).send('Review not found');
    // } else {
    //   res.status(400).send('Review ID not provided');
    // }
  });

  


  


  module.exports = note;