export default class EventService {
  constructor(restangular) {
    this.api = restangular;
  }

  init(eventId) {

    this.eventId = eventId;

    this.api.one('events', eventId).get().then((data) => {
      this.eventInfo = data;
      this.loadSeatingRequestChoices();
    }, (data) => {
      console.log("failed");
      console.log(data);
    });
  }

  loadSeatingRequestChoices() {
    this.eventInfo.customGET(this.eventId + '/relationships/seating_request_choices').then((d) => {
      this.SeatingRequestChoices = d.map((data) => {
        data.full_name = `${data.first_name} ${data.last_name}`;
        return data;
      });

    }, (d) => {
      console.log(d);
    });
  }
}

EventService.$inject = ['Restangular'];
