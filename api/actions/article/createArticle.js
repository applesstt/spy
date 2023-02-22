import {requireLogin} from '../../utils';
const Article = require('../../db/article');

export default function createArticle(req) {
  const article = new Article(req.body);
  const user = req.session.user;
  return new Promise((resolve, reject) => {
    article.user = user;
    article.city = user.city;
    article.save((err) => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    })
  });
}
