export default class AuthService {
  constructor(restangular, $q, $localStorage) {
    this.api = restangular;
    this.$q = $q;
    this.$localStorage = $localStorage;
  }

  login(userLogin) {
    let d = this.$q.defer();

    this.api.one('').customPOST(userLogin, 'token').then((data) => {
      console.log('login good!');
      this.$localStorage.token = data.token
      d.resolve();
    }, (data) => {
      console.log('login bad!');
      d.reject();
    })

    return d.promise;
  }

  logout() {
    delete this.$localStorage.token;
  }
}

AuthService.$inject = [
  'Restangular',
  '$q',
  '$localStorage'
];
