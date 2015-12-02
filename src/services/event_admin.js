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

  loadInviteesForEvent(id, size, page) {
    let d = this.$q.defer();

    let params = {
      "page[number]": page,
      "page[size]": size,
    };

    this.api.all('events').one(id).one('relationships').one(`invitees`)
    .get(params).then((data) => {
      console.log(data);
      this.event_invitees = data.data;
      d.resolve(data.pagination);
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
