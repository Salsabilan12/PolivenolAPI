const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const port = process.env.PORT || 3000;

const start = async () => {
  const server = Hapi.server({
    port: port,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register(require('@hapi/vision'));

  server.views({
    engines: {
      html: require('handlebars'),
    },
    relativeTo: __dirname,
    path: 'views',
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
}

start();