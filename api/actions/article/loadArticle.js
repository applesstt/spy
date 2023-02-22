const Article = require('../../db/article');

export default function loadArticle(req) {
  const id = req.query.articleId;
  return new Promise((resolve, reject) => {
    Article.load(id, (err, article) => {
      if(err) {
        reject(err);
      } else {
        resolve({article});
      }
    });
  });
}
