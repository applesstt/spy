<template>
  <div class="user">
    <h1>this is a user named apple.</h1>
    <h2>{{ $route.params.id + ' ' + msg }}</h2>
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      msg: 'Welcome to user detail.'
    }
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
