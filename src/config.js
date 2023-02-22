require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  db: 'mongodb://localhost/moe',
  app: {
    title: '见微知萌',
    description: '街头情报网络',
    head: {
      titleTemplate: '见微知萌',
      meta: [
        {name: 'description', content: '你身边的城市情报圈'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: '见微知萌'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'zh'},
        {property: 'og:title', content: '见微知萌'},
        {property: 'og:description', content: '你身边的城市情报圈'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@apple'},
        {property: 'og:creator', content: '@apple'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
