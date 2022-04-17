const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const auth = require('../auth');

// login user
// test successful
router.post('/login', (req, res) => {
	UserController.login(req.body).then(result => res.send(result));
});

// register user
// test successful
router.post('/register', (req, res) => {
	UserController.register(req.body).then(result => res.send(result));
});

// Get user details
router.get('/details', auth.verify, (req, res) => {
  const user = auth.decode(req.headers.authorization);
  
  UserController.get({ userId: user.id }).then(user => res.send(user));
});

// add category
// test successfull
router.post('/add-category', auth.verify, (req, res) => {
	req.body.userId = auth.decode(req.headers.authorization).id;

	UserController.addCategory(req.body).then(result => res.send(result));
});

// test successful
router.post('/add-record', auth.verify, (req, res) => {
	req.body.userId = auth.decode(req.headers.authorization).id;

	UserController.addRecord(req.body).then(result => res.send(result));
});

// get categories
// test successful
router.post('/get-categories', auth.verify, (req, res) => {
  req.body.userId = auth.decode(req.headers.authorization).id;

  UserController.getCategories(req.body).then(result => res.send(result));
});

// get records
router.post('/get-records', auth.verify, (req, res) => {
	req.body.userId = auth.decode(req.headers.authorization).id;

	UserController.getRecords(req.body).then(result => res.send(result));
});

// get category range breakdown
router.post('/get-records-breakdown-by-range', auth.verify, (req, res) => {
  req.body.userId = auth.decode(req.headers.authorization).id;

  UserController.getRecordsBreakdownRange(req.body).then(result => res.send(result));
});


module.exports = router;