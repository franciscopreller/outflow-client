<template>
  <div class="black-bg" v-on:click="focusOnPrompt">
    <md-whiteframe md-elevation="4" class="client-window" v-html="content"></md-whiteframe>
    <client-prompt :height="promptHeight" :uuid="uuid"></client-prompt>
  </div>
</template>

<script>
import UUID from 'uuid/v4';
import ClientPrompt from './ClientPrompt';

export default {
  name: 'client-window',
  components: {
    ClientPrompt,
  },
  props: [
    'host',
    'port',
  ],
  data() {
    return {
      content: '',
      uuid: UUID(),
      promptHeight: 34,
    };
  },
  mounted() {
    /* eslint-disable no-console */
    const connection = {
      host: this.host,
      port: this.port,
    };
    this.connect(connection);
    this.bindWindowSize();
    window.onresize = () => this.bindWindowSize();
  },
  methods: {
    bindWindowSize() {
      const toolbarHeight = document.querySelector('#main-toolbar').offsetHeight;
      const navTabsHeight = document.querySelector('.md-tabs-navigation').offsetHeight;
      // @TODO fix magic numbers here, some dumb fuckery needs fixing
      const height = (window.innerHeight - toolbarHeight - navTabsHeight);
      this.windowHeight = height;
      this.$el.style.height = `${height}px`;
      this.$el.querySelector('.client-window').style.height = `${height - this.promptHeight}px`;
    },
    connect({ host, port }) {
      this.bindOutputHandler();
      this.$root.$emit('server.connect', { connection: { host, port }, uuid: this.uuid });
      this.addCommandOutput(`Connecting to: [ ${host}:${port} ]...<br>`);
    },
    bindOutputHandler() {
      this.$root.$on(`server.output.${this.uuid}`, (data) => {
        this.addServerOutput(data);
      });
    },
    addServerOutput(data) {
      this.content += data;
      this.scrollToBottom();
    },
    addCommandOutput(command) {
      this.content += `<span style="color: yellow">${command}</span><br>`;
      this.scrollToBottom();
    },
    scrollToBottom() {
      setTimeout(() => {
        const el = this.$el.querySelector('.client-window');
        el.scrollTop = el.scrollHeight - el.clientHeight;
      }, 10);
    },
    focusOnPrompt() {
      const selected = (window.getSelection) ? window.getSelection().toString() : null;
      // @TODO: Instead of preventing auto-focus, it would be nice to auto-copy instead
      if (!selected) {
        this.$el.querySelector('input').focus();
      }
    },
  },
};
</script>

<style scoped>
.black-bg {
  background: #000;
}
.client-window {
  font-family: 'Anonymous Pro', monospace;
  font-size: 14px;
  line-height: 14px;
  color: #bcbec4;
  margin: 0 auto;
  width: 100%;
  overflow-y: auto;
  padding: 20px;
  text-align: left;
  float: left;
}
</style>
