import Vue from 'vue'

export default {
  list (cb, errorCb) {
    Vue.http.get('/api/user/list').then((result) => {
      cb(result.data.users)
    }, (result) => {
      errorCb(result.data.error)
    })
  },

  buyProducts (products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  }
}
