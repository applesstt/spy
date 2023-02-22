<template>
  <div id="app">
    <div v-if="error !== ''" class="alert alert-danger">{{error}}</div>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <ul class="nav nav-pills nav-stacked">
            <router-link to="/" tag="li" active-class="active">
              <a href="javascript:void(0)">用户列表</a>
            </router-link>
          </ul>
        </div>
        <div class="col-md-9">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cart from './components/Cart'
import ProductList from './components/ProductList'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    Cart, ProductList
  },
  computed: mapGetters({
    error: 'error'
  })
}
</script>

<style>
body {
  font-family: tahoma,arial,'Hiragino Sans GB','\5b8b\4f53',sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#app {
  margin-top: 60px;
}
</style>
