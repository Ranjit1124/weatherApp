<template>
  <div class="template">
    <weatherApp></weatherApp>
  </div>
</template>

<script>
import weatherApp from './components/weatherApp.vue';
export default {
  name: 'App',
  components: {
    weatherApp,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.template {
  background-color: #181c20;
  border-radius: 1em;
  padding: 20px;
}
</style>
