import requireLogin from './requireLogin';

const RequireLogin = {
  paths: [
    ['article', 'createArticle'],
    ['spy', 'create'],
    ['uploadImage']
  ],
  error: 'This api require login!'
};

const RequireAdmin = {
  paths: [
    ['user', 'list']
  ],
  error: 'This api require admin role!'
};

function checkPaths(urls, {paths, error}, authFlag, errorMsg) {
  return new Promise((resolve, reject) => {
    let hit = false;
    if(authFlag) {
      resolve();
    }
    for(let subPaths of paths) {
      if(subPaths.length > urls.length) continue;
      let equal = true;
      subPaths.forEach((path, index) => {
        if(path !== urls[index]) {
          equal = false;
        }
      })
      hit = hit || equal;
      if(hit) break;
    }
    if(!hit) {
      resolve();
    } else {
      reject(new Error(error));
    }
  })
}

export default function checkAuth(req, urls = []) {
  return checkPaths(urls, RequireLogin, !!req.session.user)
    .then(() => {
      return checkPaths(urls, RequireAdmin, !!req.session.user && !!req.session.user.isAdmin);
    });
}
