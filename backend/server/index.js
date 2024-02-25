const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const userController = require('./controllers/userController');

app.use(cors());
app.use(express.json());

app.get('/check', () => {
    console.log('checked');
})

app.post("/create-user", userController.createUser)

app.listen(5000, () => {
    console.log("The server has been started on port 5000");
})