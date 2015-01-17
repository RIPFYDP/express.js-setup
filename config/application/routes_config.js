var indexRoutes = require('../../app/routes/index'),
    usersRoutes = require('../../app/routes/users'),
    routes      = [];

routes = [
  {router: indexRoutes, base: '/'},
  {router: usersRoutes, base: '/users'}
];

module.exports = routes;
