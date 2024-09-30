//create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = 3000;

//read comments.json file
let comments = fs.readFileSync(path.join(__dirname, 'comments.json'));
let commentsJSON = JSON.parse(comments);

//use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get all comments
app.get('/comments', (req, res) => {
    res.json(commentsJSON);
});

//post a comment
app.post('/comments', (req, res) => {
    let newComment = req.body;
    if (!newComment.name || !newComment.comment) {
        return res.status(400).json({ error: 'Please enter name and comment' });
    }
    commentsJSON.push(newComment);
    fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(commentsJSON));
    res.json(newComment);
});

//start web server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});