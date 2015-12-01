import angular from 'angular';

routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      template: require('./features/home/index.html'),
      controller: 'HomeController',
      controllerAs: 'home',
    })
    .state('reply', {
      url: '/reply/{eventId}/{inviteeId}',
      template: require('./features/reply/index.html'),
      controller: 'ReplyController',
      controllerAs: 'reply',
      bodyClass: 'reply',
    })
    .state('login', {
      url: '/login',
      template: require('./features/auth/index.html'),
      controller: 'AuthController',
      controllerAs: 'ac',
    })
    .state('admin', {
      url: '/admin',
      template: require('./features/admin/index.html'),
      controller: 'AdminController',
      controllerAs: 'ac',
      bodyClass: 'admin',
      auth: true,
    })
    .state('admin.events', {
      url: '/events',
      template: require('./features/admin-events/index.html'),
      controller: 'EventAdminController',
      controllerAs: 'eac',
      bodyClass: 'admin-events',
      auth: true,
    })
    .state('admin.event_details', {
      url: '/events/:id',
      template: require('./features/admin-event-details/index.html'),
      controller: 'EventDetailsAdminController',
      controllerAs: 'edac',
      bodyClass: 'admin-event-details',
      auth: true,
    });
}
