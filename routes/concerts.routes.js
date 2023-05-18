const express = require('express');
const router = express.Router();
const db = require('../db')
const { v4: uuid4 } = require("uuid");

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  const concert = db.concerts.find(item => item.id === req.params.id);
  res.json(concert);
});

router.route('/concerts').post((req, res) => {
  const randomId = uuid4();
  const { performer, genre, price, day, image } = req.body;
  db.concerts.push({ id: randomId, performer, genre, price, day, image });
  res.json({ message: 'ok' });
});

router.route('/concerts/:id').delete((req, res) => {
  const index = db.concerts.findIndex(item => item.id === req.params.id);
  db.concerts.splice(index, 1);
  res.json({ message: 'deleted' });
});

router.route('/concerts/:id').put((req, res) => {
  const concertId = req.params.id;
  const { performer, genre, price, day, image } = req.body;
  const concert = db.concerts.find(item => item.id === concertId);
  concert.performer = performer;
  concert.genre = genre;
  concert.price = price;
  concert.day = day;
  concert.image = image;
  res.json({ message: 'ok' });
});

module.exports = router;