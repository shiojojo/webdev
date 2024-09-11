import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

let postsArray = [];


app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.listen(port, () => {
    console.log(`Start on port ${port}`)
})

app.get("/", (req, res) => {
    postsArray = [];
    res.render("./index.ejs");
});

app.post("/submit", (req, res) => {
    const newPost = {
        content: req.body.content
    };
    postsArray.push(newPost);

    res.render("./index.ejs",{ messages: postsArray });
});

