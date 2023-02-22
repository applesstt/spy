export default function requireLogin(req) {
  return new Promise((resolve, reject) => {
    const user = req.session.user;
    if(user) {
      resolve(user);
    } else {
      reject(new Error('This api need login!'));
    }
  });
}
