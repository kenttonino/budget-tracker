const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoDB connection
require('dotenv').config();

const connectionString = process.env.DB_CONNECT

mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
	console.log('Connected to mongoDB');
});

// to make server online
const PORT = process.env.PORT

app.listen(PORT || 4000, () => {
  console.log(`Server is online at port ${PORT}`);
});

// optional, to check response on localhost
app.get('/', (req, res) => {
	res.send("Server is online");
});

app.use(cors());

// all routes
app.use('/api/users', userRoutes);