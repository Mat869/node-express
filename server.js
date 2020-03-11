const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const validation = require('./validation');
const photoValidation = require('./photo-validation');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

let users = [];

app.put('/user', (req, res) => {
    //console.log(req.body);
    if(!validation(req.body.username, req.body.password)) {
        res.status(400).send();
        return;
    }
    users.push({
        id: users.length + 1,
        username: req.body.username,
        password: req.body.password
    });
    res.status(201).send();
});

app.get('/user/', (req, res) => {
    res.json(users);
});

app.get('/user/:id', (req, res) => {
    const requesteUser = users.find(user => { // .find is like forEach();
        return user.id === parseInt(req.params.id); //'params' get the same that is after the '/' --> user/:id
    });
    if (!requesteUser) { // !.. = if is null / undefined / empty str
        res.status(404).send();
        return;
    }
    res.json(requesteUser);
});

app.post('/user/:id', (req, res) => {
    const requestedUser = users.find(user => {
        return user.id === parseInt(req.params.id);
    });
    if(!requestedUser) {
        res.status(404).send();
        return;
    }
    res.status(200).send();
});

app.post('/user/:id/login', (req, res) => {
    const requestedUser = users.find(user => {
        return user.id === parseInt(req.params.id);
    });
    let username = req.body.username;
    let password = req.body.password;

    if(!requestedUser) {
        res.status(404).send();
        return;
    }
    if(requestedUser.username === username && requestedUser.password === password){
        res.status(200).send();
        return;
    }
    res.status(404).send();
});

app.delete('/user/:id', (req, res) => {
    const requesteUser = users.find(user => {
        return user.id === parseInt(req.params.id);
    });
    if (!requesteUser) {
        res.status(404).send();
        return;
    }
    const index = users.indexOf(requesteUser);
    users.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

let photos = [];

app.put('/photo', (req, res) => {
    if(!photoValidation(req.body.title, req.body.filename)) {
        res.status(400).send();
        return;
    }
    photos.push({
        id: photos.length + 1,
        title: req.body.title,
        filename: req.body.filename
    });
    res.status(201).send();
});

app.get('/photo/', (req, res) => {
    res.json(photos);
});

app.get('/photo/:id', (req, res) => {
    const requestedPhoto = photos.find(photo => { 
        return photo.id === parseInt(req.params.id); 
    });
    if (!requestedPhoto) { 
        res.status(404).send();
        return;
    }
    res.status(200).json(requestedPhoto);
});

app.delete('/photo/:id', (req, res) => {
    const requestedPhoto = photos.find(photo => { 
        return photo.id === parseInt(req.params.id); 
    });
    if (!requestedPhoto) { 
        res.status(404).send();
        return;
    }
    const index = photos.indexOf(requesteUser);
    photos.splice(index, 1);
    res.status(204).send();
});


