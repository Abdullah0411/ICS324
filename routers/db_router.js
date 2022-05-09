const express = require('express');
const router = express.Router();
const path = require('path');

const db = require('../models/db.js');


router.get('/', (req, res) => {
	try {
		res.send(db.getTicket(211))
	}
	catch (error) {
		console.log("error")
	}
});
// get planes
router.get('/planes', (req, res) => {
	res.send(db.getPlanes());
});
// get all flights based on source city & destination 
router.get('/flights/:sourceCity/:destenation', (req, res) => {
	try {
		res.send(db.getFlights(req.params));
	}
	catch (e) {
		console.log(e);
	}
});
// get all users
router.get('/users', (req, res) => {
	res.send(db.getUsers());
});
// get user
router.get('/user', (req, res) => {
	res.send(db.getUser(`bb@gg.com`));
});
// get admin
router.get('/admin', (req, res) => {
	res.send(db.admin(`bb@gg.com`));
});
// get flights based on email
router.get('/userFlights/:email', (req, res) => {
	console.log(db.getTickets(req.params.email));
	const tickets = db.getTickets(req.params.email);

	let flight = [];
	for (ticket in tickets) {
		flight[ticket] = db.getUserFlights(tickets[ticket].flightID)
	}
	console.log(flight);


	res.send(flight);
});

// add flight
router.post('/addFlight', async (req, res) => {
	try {
		const info = await db.addFlight(req.body)
		res.redirect('/')
	}
	catch (e) {
		console.log(e);
	}
});

// Sign up
router.post('/signup', async (req, res) => {
	try {
		req.body['role'] = 'user'
		const info = await db.addUser(req.body)
		res.redirect('/')
	}
	catch (e) {
		console.log(e);
	}
});
// get flight
router.get('/:flightID', (req, res) => {
	let flightID = parseInt(req.params.flightID);
	try {
		res.send(db.getFlight(flightID))
	}
	catch (e) {
		console.log(e);
	}
})
// add ticket
router.post('/:flightID/addTicket', async (req, res) => {
	let id = parseInt(req.params.flightID);
	try {
		req.body['flightID'] = id
		req.body['status'] = 'pending'
		const info = await db.addTicket(req.body)
		res.redirect('/')
	}
	catch (e) {
		console.log(e);
	}
});


module.exports = router;