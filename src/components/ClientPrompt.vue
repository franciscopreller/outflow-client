<template>
    <input
      class="client-prompt"
      v-model="prompt"
      v-on:keyup.enter="sendCommand"
      v-on:keyup.up="cycleHistoryUp"
      v-on:keyup.down="cycleHistoryDown">
</template>

<script>
export default {
  name: 'client-prompt',
  props: ['height', 'uuid'],
  data() {
    return {
      prompt: '',
      history: [],
      historyIndex: -1,
    };
  },
  mounted() {
    this.$el.style.height = `${this.height}px`;
  },
  methods: {
    sendCommand() {
      this.$parent.addCommandOutput(this.prompt);
      this.$root.$emit('server.command', { command: this.prompt, uuid: this.uuid });
      this.setHistory(this.prompt);
      this.prompt = '';
    },
    setHistory(prompt) {
      if (prompt.length > 2) {
        const arrayOperator = (this.history.length === 0) ? 'push' : 'unshift';
        this.history[arrayOperator]({ cmd: prompt });
      }
    },
    setPromptToHistoryIndex(index) {
      if (this.history[index]) {
        this.prompt = this.history[index].cmd;
      }
    },
    cycleHistoryUp() {
      if (this.history.length > this.historyIndex) {
        this.historyIndex += 1;
        this.setPromptToHistoryIndex(this.historyIndex);
      }
    },
    cycleHistoryDown() {
      if (this.historyIndex >= 0) {
        this.historyIndex -= 1;
        this.setPromptToHistoryIndex(this.historyIndex);
      } else {
        this.prompt = '';
      }
    },
  },
};
</script>

<style scoped>
.client-prompt {
  background: #313338;
  color: #efefef;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  border: none;
  border-top: 1px solid #47484c;
  padding: 5px;
  font-family: 'Anonymous Pro', monospace;
}
</style>
