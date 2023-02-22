const Spy = require('../../db/spy');

export default function list(req) {
  const currentPage = parseInt(req.query.currentPage) || 1;
  const perPage = 20;
  const user = req.session.user;
  const city = user ? user.city : 'jinzhou';
  return new Promise((resolve, reject) => {
    let options = {
      currentPage,
      perPage,
      criteria: {
        city
      }
    };
    Spy.list(options, function (err, spys) {
      if (err) {
        reject(err);
      } else {
        Spy.count({}, (err, count) => {
          const total = Math.ceil(count / perPage);
          resolve({
            spys,
            total,
            ...options
          });
        })
      }
    });
  })
}
