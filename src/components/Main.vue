<template>
  <md-layout md-gutter class="main">
    <md-tabs class="outflow-main-window-tabs md-accent">
      <md-tab v-for="(conn, key) in connections" :id="`cw-${key}`" :md-label="conn.name">
        <client-window :host="conn.host" :port="conn.port"></client-window>
      </md-tab>
    </md-tabs>
  </md-layout>
</template>

<script>
import ClientWindow from './ClientWindow';

export default {
  name: 'main',
  components: {
    ClientWindow,
  },
  data() {
    return {
      mainTitle: 'OutFlow BETA',
      connections: [
        // { name: 'Threshold RPG', host: 'thresholdrpg.com', port: 23 },
      ],
    };
  },
  methods: {
    bindWindowSize() {
      const toolbarHeight = document.querySelector('#main-toolbar').offsetHeight;
      const height = (window.innerHeight - toolbarHeight);
      this.$el.style.height = `${height}px`;
    },
  },
  mounted() {
    window.onresize = () => this.bindWindowSize();
    this.bindWindowSize();
  },
  created() {
    this.$root.$on('connection.added', ({ conn }) => {
      console.log('Got new connection', conn);
      this.connections.push(conn);
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outflow-main-window-tabs .md-tab {
  padding: 0;
}
</style>
