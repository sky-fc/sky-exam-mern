const mongoose = require("mongoose");
const db = "notes";

mongoose
  .connect("mongodb://localhost/notes", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Hi! I established a connection to the database ..."))
  .catch((err) =>
    console.log(
      "Oops! Something went wrong when connecting to the database ... ",
      err
    )
  );