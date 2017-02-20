// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vue-material/dist/vue-material.css';
import Vue from 'vue';
import VueMaterial from 'vue-material';
import SocketIO from 'socket.io-client';
import App from './App';
import router from './router';

// Plugins
Vue.use(VueMaterial);

/* eslint-disable no-new */
/* eslint-disable no-console */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data() {
    return {
      socket: SocketIO('//outflow.local'),
      socketConnected: false,
      connections: {},
    };
  },
  methods: {
    connectAll() {
      Object.keys(this.connections).forEach((uuid) => {
        const connection = this.connections[uuid];
        if (!connection.connected) {
          this.connectByUuid(connection.uuid);
        }
      });
    },
    connectByUuid(uuid) {
      const conn = this.connections[uuid];
      this.connect(conn).then((connection) => {
        this.connections[uuid] = Object.assign({}, connection, { connected: true });
        if (connection.uuid) {
          this.connectionAcknowledgement(uuid);
        }
      }).catch((err) => {
        console.error('Could not connect to server', err);
      });
    },
    connectionAcknowledgement(uuid) {
      this.socket.emit(`server.connected.${uuid}`);
    },
    connect(connection, attempts = 0) {
      return new Promise((resolve, reject) => {
        this.socket.emit('server.connect', connection, (err, data) => {
          if (err) {
            if (attempts >= 10) {
              resolve(this.connect(connection, attempts + 1));
            } else {
              reject(err);
            }
          } else {
            resolve(data);
          }
        });
      });
    },
    addContent({ uuid, text }) {
      this.$emit(`server.output.${uuid}`, text);
    },
    sendCommand({ uuid, command }) {
      this.socket.emit(`server.command.${uuid}`, { command });
    },
  },
  created() {
    // Bind socket listeners
    this.socket.on('connect', () => {
      this.socketConnected = true;
      this.connectAll();
    });
    this.socket.on('server.output', (data) => {
      this.addContent(data);
    });

    // Bind listeners on $root
    this.$on('server.command', ({ uuid, command }) => {
      console.log(`Sending "${command}" command to connection`, this.connections[uuid]);
      this.sendCommand({ uuid, command });
    });
    this.$on('server.connect', ({ connection, uuid }) => {
      this.connections[uuid] = Object.assign({}, connection, { connected: false, uuid });
      if (this.socketConnected) {
        this.connectByUuid(uuid);
      }
    });
  },
});

Vue.material.registerTheme({
  app: {
    primary: 'teal',
    accent: 'blue-grey',
    warn: 'deep-orange',
    background: 'white',
  },
});
Vue.material.setCurrentTheme('app');
