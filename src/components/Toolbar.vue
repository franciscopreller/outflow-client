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
          <md-button v-else class="menu-btn" @click.native="handleItemClick(item)">
            <md-icon>{{ item.icon }}</md-icon>
            <span>{{ item.text }}</span>
          </md-button>
        </md-list-item>
      </md-list>
    </md-sidenav>

    <md-dialog ref="newConnDialog">
      <md-dialog-title>Create new Connection</md-dialog-title>
      <md-dialog-content>
        <form novalidate @submit.stop.prevent="submit">
          <md-input-container>
            <label>Name</label>
            <md-input placeholder="Connection Name" v-model="newConn.name"></md-input>
          </md-input-container>
          <md-input-container>
            <label>Host</label>
            <md-input placeholder="yourdomain.com" v-model="newConn.host"></md-input>
          </md-input-container>
          <md-input-container>
            <label>Port</label>
            <md-input placeholder="200" v-model="newConn.port"></md-input>
          </md-input-container>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeNewConnection()">Cancel</md-button>
        <md-button class="md-primary" @click.native="addConnection()">Start</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  export default {
    name: 'toolbar',
    data() {
      return {
        mainTitle: 'OutFlow (ALPHA)',
        menuItems: [
          { id: 'newConnMenuItem', icon: 'add_box', text: 'New Connection', method: 'openNewConnection' },
          { id: 'preferencesMenuItem', icon: 'settings', text: 'Preferences', method: 'openPreferences' },
          { divider: true },
          { id: 'aboutMenuItem', icon: 'chat', text: 'About', method: 'openAbout' },
        ],
        newConn: {
          host: '',
          port: '',
          name: '',
        },
      };
    },
    methods: {
      toggleLeftSidenav() {
        this.$refs.leftSidenav.toggle();
      },
      handleItemClick(item) {
        const method = this[item.method];
        if (typeof method === 'function') {
          method();
        } else {
          // eslint-disable-next-line
          console.error(`No method found '${item.method}' for item:`, item);
        }
      },
      addConnection() {
        const conn = Object.assign({}, this.newConn);
        console.log('Emitting connection', conn);
        this.$root.$emit('connections.add', { conn });
        this.newConn = {
          host: '',
          port: '',
          name: '',
        };
      },
      openNewConnection() {
        this.$refs.newConnDialog.open();
      },
      closeNewConnection() {
        this.$refs.newConnDialog.close();
      },
    },
  };

</script>

<style scoped>
  .menu-btn {
    width: 100%;
    text-align: left;
  }
  .menu-btn span {
    padding: 1.5em;
  }
</style>
