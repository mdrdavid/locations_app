const express = require("express");
const bodyParser = require("body-parser");

const placesRouter = require("./routes/places-routes");

const port = 5000;
const app = express();
app.use("/api/places", placesRouter);

// error handling middleware
app.use((error, req, res, next)=>{
  if(res.headerSet){
    return next(error)
  }
  res.status(error.code || 500)
  res.json({message: error.message || "An unknown error occurred"})
})

app.listen(port, () => console.log(`Server running on port ${port} `));
