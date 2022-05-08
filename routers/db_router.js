const express = require('express');
const router = express.Router();
const path = require('path');


const db = require('../models/db.js');


router.get('/', (req, res) => {
    res.send(db.getTicket(211))
});

router.get('/planes', (req, res) => {
    res.send(db.getPlanes());
});

router.get('/user', (req, res) => {
    res.send(db.getUser(`bb@gg.com`));
});

router.get('/admin', (req, res) => {
    res.send(db.admin(`bb@gg.com`));
});


router.post('/', (req, res) => {

});


module.exports = router;