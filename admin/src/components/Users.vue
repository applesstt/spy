<template>
  <div class="users">
    <table class="table table-striped">
      <tbody>
        <tr v-for="user in users">
          <td>{{user.name}}</td>
        </tr>
      </tbody>
    </table>
    <router-link to="/users/apple">show user detail</router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters({
    users: 'users'
  }),
  methods: mapActions([
    'addToCart'
  ]),
  created () {
    this.$store.dispatch('getUsers')
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
