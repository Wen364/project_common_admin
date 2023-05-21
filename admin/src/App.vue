<template>
  <div id="app">
    
    <!-- <User></User>
    <Home></Home> -->
    <!-- <Main></Main> -->
    
    <router-view></router-view>
     
  </div>
</template>

<script>
import User from '@/views/User/index.vue'
import Home from '@/views/Home/index.vue'
import Main from '@/views/Main'
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // User,
    // Home
    Main
  },
  mounted() {
    // console.log(this.$router);
  },
}
</script>

<style>
html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td, select {
  margin: 0;
  padding: 0;
}

</style>
