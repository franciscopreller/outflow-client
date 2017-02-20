<template>
  <div id="app">
    <toolbar/>
    <router-view></router-view>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar';

export default {
  name: 'app',
  components: { Toolbar },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #979a9e;
  height: 100%;
}
</style>
