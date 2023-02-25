const express = require("express");
const bodyParser = require("body-parser");

const placesRouter = require("./routes/places-routes");

const port = 5000;
const app = express();
app.use("/api/places", placesRouter);

app.listen(port, () => console.log(`Server running on port ${port} `));
