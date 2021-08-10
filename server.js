// connection file
const connectDB = require("./server/database/connection");
const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

// Log request
const morgan = require("morgan");
app.use(morgan("tiny"));

// mongodb connection
connectDB();

const bodyparser = require("body-parser");
// Parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine
const path = require("path");
app.set("view engine", "ejs");
//app.set('views',path.resolve(__dirname,'views/ejs'))

// Load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// load routes
app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
