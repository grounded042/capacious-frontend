
function run(Restangular, $rootScope, $localStorage, $state) {
  Restangular.setBaseUrl('http://localhost:8000/api/v1');

  // check for auth on state change
  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
    if (toState.auth && $localStorage.token === undefined) {
      console.log("uh, we need auth!");
      $state.go('login');
      event.preventDefault();
    }
  });

  // change the body class
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $rootScope.bodyClass = toState.bodyClass;
  });
}

run.$inject = [
  'Restangular',
  '$rootScope',
  '$localStorage',
  '$state',
];

export default run;
