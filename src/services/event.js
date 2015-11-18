export default class EventService {
  constructor(restangular, $q) {
    this.api = restangular;
    this.$q = $q;
    this.q = $q.defer();
  }

  init(eventId) {
    this.eventId = eventId;

    this.api.one('events', eventId).get().then((data) => {
      this.eventInfo = data;
      this.loadSeatingRequestChoices().then(() => {
        this.q.resolve();
      }, () => {
        this.q.reject();
      });
      this.q.resolve();
      console.log(data);
    }, (data) => {
      this.q.reject();
      console.log("failed");
      console.log(data);
    });
  }

  loadSeatingRequestChoices() {
    let defer = this.$q.defer();

    this.eventInfo.customGET(this.eventId + '/relationships/seating_request_choices').then((d) => {
      this.SeatingRequestChoices = d.map((data) => {
        data.full_name = `${data.first_name} ${data.last_name}`;
        return data;
      });
      defer.resolve();
    }, (d) => {
      defer.reject();
      console.log(d);
    });

    return defer.promise;
  }
}

EventService.$inject = ['Restangular', '$q'];
