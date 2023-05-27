// const express = require('express');
// const router = express.Router();
// const db = require('../db')
// const { v4: uuid4 } = require("uuid");

// router.route('/testimonials').get((req, res) => {
//   res.json(db.testimonials);
// });

// router.route('/testimonials/random').get((req, res) => {
//   const randomNumber = Math.floor(Math.random() * db.testimonials.length)
//   const randomTestimonial = db.testimonials[randomNumber]
//   console.log(randomNumber);
//   res.json(randomTestimonial);
// });

// router.route('/testimonials/:id').get((req, res) => {
//   const testimonial = db.testimonials.find(item => item.id === req.params.id)
//   res.json(testimonial);
// });

// router.route('/testimonials/:id').put((req, res) => {
//   const testimonialId = req.params.id;
//   const { author, text } = req.body;
//   const testimonial = db.testimonials.find(item => item.id === testimonialId);
//   testimonial.author = author;
//   testimonial.text = text;
//   res.json({ message: 'ok' });
// });

// router.route('/testimonials').post((req, res) => {
//   const randomId = uuid4();
//   const { author, text } = req.body;
//   db.testimonials.push({ id: randomId, author, text });
//   res.json({ message: 'ok' });
// });

// router.route('/testimonials/:id').delete((req, res) => {
//   const index = db.testimonials.findIndex(item => item.id === req.params.id)
//   db.testimonials.splice(index, 1);
//   res.json({ message: 'deleted' });
// });

// module.exports = router;