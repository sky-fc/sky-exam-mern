const Note = require("../models/note.model");

const createNote = (req, res) => {
  Note.create(req.body)
    .then((newNote) => {
      res.json({ newNote });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const updateNote = (req, res) => {
  Note.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedNote) => {
      res.json({ updatedNote });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const deleteNote = (req, res) => {
  Note.deleteOne({ _id: req.params.id })
    .then((deletedResponse) => {
      res.json({ deletedResponse });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const getNote = (req, res) => {
  Note.findOne({ _id: req.params.id })
    .then((queriedNote) => {
      res.json(queriedNote);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const getNotes = (req, res) => {
  Note.find()
    .then((allNotes) => {
      res.json(allNotes);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  getNote,
  getNotes,
};
