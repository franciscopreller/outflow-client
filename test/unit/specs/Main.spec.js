import Vue from 'vue';
import Main from 'src/components/Main';

describe('Main.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Main),
    });
    expect(vm.$el.querySelector('.main h1').textContent)
      .to.equal('MUD Client');
  });
});
