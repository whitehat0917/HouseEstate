const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

var corsOptions = {
    origin: "http://localhost:4000"
};

app.use(cors());

app.use('/images', express.static(__dirname + '/app/images'));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to application." });
// });

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

app.use(express.static(path.join(__dirname, './build')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'));
});

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});