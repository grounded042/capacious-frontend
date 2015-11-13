routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      template: require('./features/home/index.html'),
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .state('reply', {
      url: '/reply/{eventId}/{inviteeId}',
      template: require('./features/reply/index.html'),
      controller: 'ReplyController',
      controllerAs: 'reply'
    });
}
