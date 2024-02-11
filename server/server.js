const DATABASE_URL = "mongodb://localhost:27017/reachdb"
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

// Database connection
let router;
mongoose.connect(DATABASE_URL)
    .then(() => {           // makes sure that models are loaded and used after connection
        console.log("Connected to mongodb");
        router = require("./routes/router");
        app.use("/api/posts", router);
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server in development!")
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started listening on ${PORT}`);
});