const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve('database.db'), { fileMustExist: true });

class data {
    getTicket(TID) {
        return db.prepare(`SELECT * FROM Ticket WHERE TID == ?`).get(TID);
    }

    getUser(email) {
        return db.prepare(`SELECT * FROM Account WHERE email == ?`).get(email);
    }

    getUser(email) {
        return db.prepare(`SELECT * FROM Account WHERE email == ?`).get(email);
    }

    getPlanes() {
        return db.prepare(`SELECT * FROM Plan`).all();
    }

    addTicket(TID, time, Class, seat, status, email) {

        const flightID = 22;
        const result = db.prepare(`INSERT INTO Ticket (TID, lightID, time, classType, seatNumber, status, email) VALUES (?,?,?,?,?,?,?)`).run(TID, flightID, time, Class, seat, status, email);
        let message = 'Error in creating ticket';
        if (result.changes) {
            message = 'ticket created successfully';
        }

        return { message };
    }

    getFlight(flightID) {
        return db.prepare(`SELECT * FROM Flight WHERE flightID = ?`).get(flightID)
    }


}

module.exports = new data();