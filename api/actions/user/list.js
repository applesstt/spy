const User = require('../../db/user');

export default function list(req) {
  const currentPage = parseInt(req.query.currentPage) || 1;
  const perPage = 20;
  return new Promise((resolve, reject) => {
    let options = {
      currentPage,
      perPage
    };
    User.list(options, function (err, users) {
      if (err) {
        reject(err);
      } else {
        User.count({}, (err, count) => {
          const total = Math.ceil(count / perPage);
          resolve({
            users,
            total,
            ...options
          });
        })
      }
    });
  })
}
