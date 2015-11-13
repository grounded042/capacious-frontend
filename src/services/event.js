export default class EventService {
  constructor(restangular) {
    this.api = restangular;
  }

  init(eventId) {
    this.api.one('events', eventId).get().then((data) => {
      this.eventInfo = data;
      console.log(data);
    }, (data) => {
      console.log("failed");
      console.log(data);
    });
  }
}

EventService.$inject = ['Restangular'];
