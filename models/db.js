const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve('database.db'), { fileMustExist: true });

class data {
    getTicket(TID) {
        return db.prepare(`SELECT * FROM Ticket WHERE TID == ?`).get(TID);
    }

    getTickets(email) {
        return db.prepare(`SELECT flightID FROM Ticket WHERE email == ?`).all(email)
    }

    getFlights(city) {
        return db.prepare(`SELECT * FROM Flight WHERE sourceCity == ? AND destenation == ?`).all(city.sourceCity, city.destenation);
    }

    getFlight(flightID) {
        return db.prepare(`SELECT * FROM Flight WHERE flightID ==?`).get(flightID);
    }

    getUserFlights(flightID) {
        return db.prepare(`SELECT * FROM Flight WHERE flightID == ?`).get(flightID)
    }

    getUser(email) {
        return db.prepare(`SELECT * FROM Account WHERE email == ?`).get(email);
    }

    getUsers() {
        return db.prepare(`SELECT * FROM Account`).all();
    }
    getPlanes() {
        return db.prepare(`SELECT * FROM Plane`).all();
    }

    addTicket(ticket) {

        const result = db.prepare(`INSERT INTO Ticket (flightID, time, classType, seatNumber, status, email) VALUES (?,?,?,?,?,?,?)`).run(ticket.flightID, ticket.time, ticket.Class, ticket.seat, ticket.status, ticket.email);
        let message = 'Error in creating ticket';
        if (result.changes) {
            message = 'ticket created successfully';
        }

        return { message };
    }

    addUser(user) {
        const result = db.prepare(`INSERT INTO Account (email, userName, password, role) VALUES (?,?,?,?)`).run(user.email, user.userName, user.password, user.role);
        let message = 'Error in creating user';
        if (result.changes) {
            message = 'User created successfully';
        }
        return { message };
    }

    addFlight(flight) {
        const result = db.prepare(`INSERT INTO Flight (date, sourceCity, destenation, priceForFlight, capacityForFlight) VALUES (?,?,?,?,?)`).run(flight.date, flight.sourceCity, flight.destenation, flight.price, flight.capacity);
        let message = 'Error in creating flight';
        if (result.changes) {
            message = 'Flight created successfully';
        }
        return { message };
    }
}


module.exports = new data();