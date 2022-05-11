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
router.get('/:email', (req, res) => {
	let email = req.params.email
	res.send(db.getUser(email));
});
// get admin
router.get('/admin', (req, res) => {
	res.send(db.admin(`bb@gg.com`));
});
// get flights based on email
router.get('/userFlights/:email', (req, res) => {
	try {
		const tickets = db.getTickets(req.params.email);

		let flight = [];
		for (ticket in tickets) {
			flight[ticket] = db.getUserFlights(tickets[ticket].flightID)
		}


		res.send(flight);
	}
	catch (e) {
		console.log(e);
	}
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
router.post('/:email/:flightID/addTicket', async (req, res) => {
	let flightID = parseInt(req.params.flightID);
	let email = req.params.email;
	try {
		let date = new Date(Date.now());
		date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
		req.body['date'] = date;
		req.body['flightID'] = flightID
		req.body['status'] = 'pending'
		req.body['email'] = email
		const info = await db.addTicket(req.body)
		res.redirect('/')
	}
	catch (e) {
		console.log(e);
	}
});
// edit ticket
router.put('/:email/:TID/editTicket', async (req, res) => {
	let TID = parseInt(req.params.TID);
	let email = req.params.email;
	try {
		role = db.getUser(email).role
		req.body['TID'] = TID
		if (role == 'admin') {
			const info = await db.editAdmin(req.body)
			res.redirect('/')
		}
		else if (role == 'user') {
			const info = await db.editUser(req.body)
			res.redirect('/')
		}

	}
	catch (e) {
		console.log(e);
	}
});


module.exports = router;