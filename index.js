const server = require('./server');

const port = process.env.port || 5000;
server.listen(port, () => console.log(`\nServer is listening on port ${port}\n`));
