// Lock in production environment
process.env.NODE_ENV = 'production';
process.env.PORT = 8080;

const project = require('../config/project.config');
const server = require('../server/main');

server.listen(project.server_port);
console.log(`Server is now running on port ${project.server_port}.`);
