const express = require('express');
const db_router = require('./routers/db_router')
const bodyParser = require('body-parser')
const path = require('path');
var cors = require('cors')
const db = require('./models/db.js');


const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}));

const port = 8080;

app.use('/', db_router)





app.listen(port, () => {
    console.log(`listening on port ${port}`);
});