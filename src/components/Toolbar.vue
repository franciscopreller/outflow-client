<template>
  <div id="main-toolbar">
    <md-toolbar style="border-bottom: 1px solid #ccc;">
        <div class="md-toolbar-container">
        <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
            <md-icon>menu</md-icon>
        </md-button>
        <h1 class="md-title">{{ mainTitle }}</h1>
        <span style="flex: 1"></span>
        <md-button>
            <md-avatar>
            <md-icon>account_circle</md-icon>
            </md-avatar>
            <span>Sign In</span>
        </md-button>
        </div>
    </md-toolbar>
    <md-sidenav class="md-left" ref="leftSidenav">
        <md-toolbar class="md-large">
            <div class="md-toolbar-container">
                <h3 class="md-title">Outflow</h3>
            </div>
        </md-toolbar>

        <md-list>
            <md-list-item v-for="item in menuItems">
              <md-divider v-if="item.divider"></md-divider>
              <md-button class="menu-btn" v-else>
                <md-icon>{{ item.icon }}</md-icon>
                <span>{{ item.text }}</span>
              </md-button>
            </md-list-item>
        </md-list>
    </md-sidenav>
  </div>
</template>

<script>
export default {
  name: 'toolbar',
  data() {
    return {
      mainTitle: 'OutFlow (ALPHA)',
      menuItems: [
          { icon: 'add_box', text: 'New Connection' },
          { icon: 'settings', text: 'Preferences' },
          { divider: true },
          { icon: 'chat', text: 'About' },
      ],
    };
  },
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
  },
};
</script>

<style scoped>
.menu-btn {
  width:100%;
  text-align: left;
}
.menu-btn span {
  padding: 1.5em;
}
</style>
