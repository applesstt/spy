const Article = require('../../db/article');

export default function load(req) {
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
    Article.list(options, function (err, articles) {
      if (err) {
        reject(err);
      } else {
        Article.count({}, (err, count) => {
          const total = Math.ceil(count / perPage);
          resolve({
            articles,
            total,
            ...options
          });
        })
      }
    });
  })
}
