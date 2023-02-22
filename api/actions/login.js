import crypto from 'crypto';
const User = require('../db/user');

var _encrypt = function(password, salt) {
  return crypto
    .createHmac('sha1', salt)
    .update(password)
    .digest('hex');
};

export default function login(req) {
  return new Promise((resolve, reject) => {
    const name = req.body.name;
    const password = req.body.password;
    User.load({
      criteria: { name: name }
    }, (err, user) => {
      if(err || !user) {
        reject(err || 'Can\'t find username');
      } else {
        if(_encrypt(password, user.salt) === user.hashed_password) {
          req.session.user = user;
          resolve(user);
        } else {
          reject('Password error');
        }
      }
    })
  });
}
