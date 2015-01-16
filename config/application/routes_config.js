var indexRoutes = require('./routes/index'),
    usersRoutes = require('./routes/users'),
    routes      = [];

routes = [
  {router: indexRoutes, base: '/'},
  {router: usersRoutes, base: '/users'}
];

module.exports = routes;
