const DATABASE_URL = "mongodb://localhost:27017/reachdb"
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

// Database connection
mongoose.connect(DATABASE_URL)
    .then(() => {           // makes sure that models are loaded and used after connection
        console.log("Connected to mongodb");
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
const postSchema = new mongoose.Schema({
    name: String,
    location: String,
    image: String,
    title: String,
    caption: String,
    postType: String
});

const Post = mongoose.model("post", postSchema);

app.post("/api/posts", async (req, res) => {
    const post = new Post(req.body);
    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

app.get("/api/posts", async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.get("/api/posts/:id", async (req, res) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {                        // for id's that are formatted incorrectly
        return res.status(400).json({ message: "Invalid id" });
    }
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "No such post exists" });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.put("/api/posts/:id", async (req, res) => {
    let id = req.params.id;
    let options = {};
    options = req.body;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {                        // for id's that are formatted incorrectly
        return res.status(400).json({ message: "Invalid id" });
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, options);
        if (!updatedPost) {
            return res.status(404).json({ message: "No such post exists" })
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

app.delete("/api/posts/:id", async (req, res) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {                        // for id's that are formatted incorrectly
        return res.status(400).json({ message: "Invalid id" });
    }
    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: "No such post exists" })
        }
        res.status(200).json(deletedPost);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started listening on ${PORT}`);
});