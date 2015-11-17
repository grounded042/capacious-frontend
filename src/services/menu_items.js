export default class MenuItems {
  constructor(restangular) {
    this.api = restangular;
    this.menuItems = [];
  }

  init(eventId) {
    this.api.one('events', eventId).customGET('relationships/menu_items').then((data) => {
      this.menuItems = data;
      console.log(data);
    }, (data) => {
      console.log("failed");
      console.log(data);
    });
  }
}

MenuItems.$inject = ['Restangular'];
