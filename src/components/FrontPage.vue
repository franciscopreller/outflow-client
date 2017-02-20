<template>
  <div class="front-page">
  </div>
</template>

<script>

export default {
  name: 'front-page',
  data() {
    return {
      mainTitle: 'OutFlow',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  background: #292b30;
}
h1 {
  font-weight: normal;
  display: block;
  width: 100%;
  border-bottom: 1px solid #47484c;
  margin: 0;
  padding: 12px 0;
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  background: #313338;
}
a {
  color: #42b983;
}
</style>
