"use strict";

// SKELETON START
var express = require("express");
var cors = require("cors");
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
    res.sendFile(process.cwd() + "/views/index.html");
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Your app is listening on port " + port);
});
// SKELETON END

// going to be using multer middleware module for file uploading.
// multer usage: https://www.npmjs.com/package/multer
const myMulter = require("multer");

// multer configuration: filename construction and location to save uploaded file
let storageInfo = myMulter.diskStorage(
    {
        // setting destination for multer uploaded file
        destination: "./public/uploads/",
        // prepending unix timestamp to the name of the uploaded file
        filename: function ( req, file, cb ) {
            // unix timestamp in seconds (+ unary op convert date to number)
            const unix = Math.round(+new Date()/1000);
            cb( null, unix.toString()+"-"+file.originalname);
        }
    }
);
// configured multer instance
const myUpload = myMulter({"storage": storageInfo});

// multer middleware for uploading a single file (goes between
// the route and the req/res callback). get the name of the file
// to upload (upfile) from the html form 
app.post("/api/fileanalyse", myUpload.single("upfile"), (req, res) => {
    // output file info to console
    console.log("req.file = ");
    console.log(req.file);
    console.log("req.body = ");
    console.log(req.body);
    // grab the fields requested by fcc
    const theSize = req.file.size;
    const theName = req.file.originalname;
    const theType = req.file.mimetype;
    // respond with json data
    res.json({ "name": theName, "type": theType, "size": theSize });
});
