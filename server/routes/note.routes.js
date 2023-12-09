const noteController = require("../controllers/note.controller");

module.exports = (app) => {
  app.get("/api/notes", noteController.getNotes);

  app.get("/api/notes/:id", noteController.getNote);

  app.post("/api/notes", noteController.createNote);

  app.put("/api/notes/:id", noteController.updateNote);
  
  app.delete("/api/notes/:id", noteController.deleteNote);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Oops! Something went wrong!");
  });
};
