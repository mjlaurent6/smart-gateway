require("./config/config");
require('dotenv').config(); // this loads env vars

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const logger = require('morgan');

const app = express();
app.disable('etag');

//connection from db here
db.connect(app);
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//  adding routes
// require("./routes")(app);
require("./routes/login")(app);
require("./routes/gateway")(app);
require("./routes/end_device")(app);

app.on("ready", () => {
    app.listen(3000, () => {
        console.log("Server is up on port", 3000);
    });
});

module.exports = app;
