const User = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../auth');
const moment = require('moment');

// login user
// test successful
module.exports.login = (params) => {
	return User.findOne({ email: params.email }).then(user => {

		if (user === null) {
			return false;
		}

		const isPasswordMatched = bcrypt.compareSync(params.password, user.password);

		if (isPasswordMatched) {
			return { accessToken: auth.createAccessToken(user.toObject()) };
		}
		else {
			return false;
		}
	});
};

// register user
// test successful
module.exports.register = (data) => {
	let newUser = new User({
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email,
		mobileNo: data.mobileNo,
		password: bcrypt.hashSync(data.password, 10),
		loginType: 'email'
	});

	return newUser.save().then((user, err) => {
		return (err) ? false : true;
	});
};

// user details
// test successful
module.exports.get = (params) => {
  return User.findById(params.userId).then(user => {
    user.password = undefined;
    return user;
  });
};

// add category
// test successful
module.exports.addCategory = (params) => {
	return User.findById(params.userId).then(user => {
		
		user.categories.push({
			name: params.name,
			type: params.type
		});

		return user.save().then((user, err) => {
			return (err) ? false : true
		});
	});
};

// add record
// test succesful
module.exports.addRecord = (params) => {
  return User.findById(params.userId).then(user => {

    let balanceAfterTransaction = 0;

    if (user.transactions.length !== 0) {
      const balanceBeforeTransaction = user.transactions[user.transactions.length - 1].balanceAfterTransaction;

      if (params.type === 'Income') {
        balanceAfterTransaction = balanceBeforeTransaction + params.amount;

      } else {
        balanceAfterTransaction = balanceBeforeTransaction - params.amount;

      }
    } else {
      balanceAfterTransaction = params.amount;

    }

    user.transactions.push({
      categoryName: params.categoryName,
      type: params.type,
      amount: params.amount,
      description: params.description,
      balanceAfterTransaction: balanceAfterTransaction
    });

    return user.save().then((user, error) => {
      return (error) ? false : true;
    });
  });
};

// retreive categories
// test successful
module.exports.getCategories = (params) => {
  return User.findById(params.userId).then(user => {
    return user.categories;

    if (typeof params.type === "undefined") {
      return user.categories;
    }
    return user.categories.filter((category) => {
      if (category.type === params.type) {
        return category;
      }
    });
  });
};

module.exports.getRecords = (params) => {
  return User.findById(params.userId).then(user => {

    return user.transactions;

    if(typeof paramstype === 'undefined') {
      return user.transactions;
    }
    return user.transactions.filter((transaction) => {
      if(category.type === params.type) {
        return transaction;
      }
    });
  });
};

// retreive records breakdown
module.exports.getRecordsBreakdownRange = (params) => {
  return User.findById(params.userId).then(user => {
    const summary = user.categories.map((category) => {
      return {
        categoryName: category.name,
        totalAmount: 0
      };
    });

    user.transactions.filter((transaction) => {
      const isSameOrAfter = moment(transaction.dateAdded).isSameOrAfter(params.fromDate, 'day');
      const isSameOrBefore = moment(transaction.dataAdded).isSameOrBefore(params.toDate, 'day');

      if(isSameOrAfter && isSameOrBefore) {
        for(let i = 0; i < summary.length; i++) {
          if(summary[i].categoryName === transaction.categoryName) {
            summary[i].totalAmount += transaction.amount;
          }
        }
      } 
    });

    return summary;
  });
};