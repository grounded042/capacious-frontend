config.$inject = ['$httpProvider', '$stateProvider'];

export default function config($httpProvider, $stateProvider) {

  $httpProvider.interceptors.push(['$q', '$location', '$localStorage', ($q, $state, $localStorage) => {
    return {
      'request': (config) => {
        config.headers = config.headers || {};
        if ($localStorage.token) {
          config.headers.Authorization = `Bearer ${$localStorage.token}`;
        }
        return config;
      },
      'responseError': (response) => {
        if (response.status === 401) {
          $state.go("login");
          delete $localStorage.token;
        }
        return $q.reject(response);
      }
    };
  }]);
}
