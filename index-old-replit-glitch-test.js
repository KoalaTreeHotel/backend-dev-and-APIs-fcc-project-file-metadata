let express = require("express");
let cors = require("cors");
require("dotenv").config();

let app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
    res.sendFile(process.cwd() + "/views/index.html");
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Your app is listening on port " + port);
});


//////////
const multer = require("multer");
const upload = multer();

app.post("/api/fileanalyse",
    upload.single("upfile"), function (req, res) {
        const { originalname, mimetype, size } = req.file;
        res.json({ name: originalname, type: mimetype, size: size });
    });
