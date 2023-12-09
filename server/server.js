const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/mongoose.config");
require("./routes/note.routes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Hi! I'm Listening at Port ${PORT} ...`);
});

// OLD VERSION
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const config = require("./config");

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// require("./config/mongoose.config");
// require("./routes/note.routes")(app);

// const PORT = config.port || 8000;
// app.listen(PORT, () => {
//   console.log(`Hi! I'm Listening at Port ${PORT}`);
// });
