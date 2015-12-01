export default class AdminController {
  constructor($state, AuthService) {
    console.log("welcome to admin");

    this.$state = $state;
    this.aSvc = AuthService;
  }

  goToState(stateName) {
    console.log(stateName);
    this.$state.transitionTo(stateName);
  }

  logout() {
    this.aSvc.logout();
    this.$state.transitionTo('login');
  }
}

AdminController.$inject = [
  '$state',
  'AuthService'
];
