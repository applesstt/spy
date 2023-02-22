const User = require('../db/user');

export default function signup(req) {
  let user = new User(req.body);
  return new Promise((resolve, reject) => {
    User.load({
      criteria: { name: user.name }
    }, (err, userObj) => {
      if(err || userObj) {
        reject(err || 'User name is already taken');
      } else {
        user.save((err) => {
          if (err) {
            reject(err);
          } else {
            req.session.user = user;
            resolve(user);
          }
        })
      }
    })
  });
}
