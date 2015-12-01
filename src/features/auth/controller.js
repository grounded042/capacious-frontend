export default class AuthController {
  constructor(Auth, $state) {
    this.auth = Auth;
    this.$state = $state;
    console.log("welcome to auth");
  }

  login(userLogin) {
    this.auth.login(userLogin).then(() => {
      // TODO: route to location the user was trying to go to
      this.$state.go('admin');
    }, () => {
      // show error here
      console.log("invalid credentials");
    });
  }
}

AuthController.$inject = [
  'AuthService',
  '$state'
];
