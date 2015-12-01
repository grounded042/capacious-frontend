export default class EventAdminService {
  constructor(restangular, $q) {
    this.api = restangular;
    this.$q = $q;
  }

  init() {
    this.api.one('events').getList().then((events) => {
      console.log(events);
      this.events = events;
    }, () => {
      console.log("error getting all events");
    });
  }

  loadInviteesForEvent(id) {
    let d = this.$q.defer();

    this.api.all('events').one(id).one('relationships').one('invitees').getList().then((invitees) => {
      console.log(invitees);
      this.event_invitees = invitees;
      d.resolve();
    }, () => {
      console.log("error getting invittes");
      d.reject();
    });

    return d.promise;
  }
}

EventAdminService.$inject = [
  'Restangular',
  '$q'
];
