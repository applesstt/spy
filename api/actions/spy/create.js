const Spy = require('../../db/spy');

export default function create(req) {
  const spy = new Spy(req.body);
  const user = req.session.user;
  return new Promise((resolve, reject) => {
    spy.user = user;
    spy.city = user.city;
    spy.save((err) => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    })
  });
}
