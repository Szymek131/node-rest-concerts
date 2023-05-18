const express = require('express');
const router = express.Router();
const db = require('../db')
const { v4: uuid4 } = require("uuid");

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  const seatId = req.params.id;
  const seat = db.seats.find(item => item.id === seatId);
  res.json(seat);
});

router.route('/seats').post((req, res) => {
  const randomId = uuid4();
  const { day, seat, client, email } = req.body;
  if (db.seats.some(item => item.day === day) && db.seats.some(item => item.seat === seat)) {
    res.status(304).json({ message: 'The slot is already taken' })
  } else {
    db.seats.push({ id: randomId, day, seat, client, email });
    res.json({ message: 'ok' });
  }

});

router.route('/seats/:id').delete((req, res) => {
  const seatId = req.params.id;
  const index = db.seats.findIndex(item => item.id === seatId);
  db.seats.splice(index, 1);
  res.json({ message: "deleted" });
});

router.route('/seats/:id').put((req, res) => {
  const seatId = req.params.id;
  const seatToChange = db.seats.find(item => item.id === seatId);
  const { day, seat, client, email } = req.body;
  seatToChange.day = day;
  seatToChange.seat = seat;
  seatToChange.client = client;
  seatToChange.email = email;
  res.json({ message: 'update complete' })
});

module.exports = router;