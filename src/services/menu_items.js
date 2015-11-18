export default class MenuItems {
  constructor(restangular, $q) {
    this.api = restangular;
    this.menuItems = [];
    this.q = $q.defer();
  }

  init(eventId) {
    this.api.one('events', eventId).customGET('relationships/menu_items').then((data) => {
      this.menuItems = data;
      this.q.resolve();
      console.log(data);
    }, (data) => {
      this.q.reject();
      console.log("failed");
      console.log(data);
    });
  }
}

MenuItems.$inject = ['Restangular', '$q'];
