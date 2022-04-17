const jwt = require('jsonwebtoken');

require('dotenv').config();
const secret = process.env.SECRET;

module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email: user.email,
	}

	return jwt.sign(data, secret, {});
};

// Verify the access token
module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;

	if (typeof token !== 'undefined') {
		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (err, data) => {
			return (err) ? res.send({ auth: 'failed' }) : next()
		});
	} else {
		return null;
	}
};

// Decode the token
module.exports.decode = (token) => {
	if (typeof token !== 'undefined') {
		token = token.slice(7, token.length)

		return jwt.verify(token, secret, (err, data) => {
			return (err) ? null : jwt.decode(token, { complete: true }).payload
		});
	} else {
		return null;s
	}
};
