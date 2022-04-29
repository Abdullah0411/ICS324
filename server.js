const express = require('express');
const db_router = require('./routers/db_router')
const bodyParser = require('body-parser')
const path = require('path');

const db = require('./models/db.js');


const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

const port = 8080;

app.use('/', db_router)


app.post('/', (req, res) => {

})




app.listen(port, () => {
    console.log(`listening on port ${port}`);
});