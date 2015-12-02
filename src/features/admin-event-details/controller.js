export default class EventDetailsAdminController {
  constructor(AdminSvc, $stateParams, $q) {
    this.aSvc = AdminSvc;
    this.$q = $q;
    this.event_id = $stateParams.id;
    this.totalAttending = 0;
    this.showAttending = true;
    this.showNotAttending = true;

    this.pagination = {
      size: 10,
      page: 1,
      total: 0,
    };

    this.paginationchange = this.paginationchange.bind(this);
    this.paginationchange(this.pagination.page, this.pagination.size);
  }

  paginationchange(page, size) {
    let d = this.$q.defer();

    this.aSvc.loadInviteesForEvent(
      this.event_id,
      size,
      page
    ).then((pInfo) => {
      d.resolve();
      this.pagination.size = pInfo.page_size;
      this.pagination.total = pInfo.total_items;
    }, () => {
      d.reject();
    });

    return d.promise;
  }


  filterAttendingNotAttending(showAttending, showNotAttending) {
    return (invitee) => {
      if (showNotAttending && showAttending) {
        return true;
      } else if (invitee.self.attending && showAttending) {
        return true;
      } else if (!invitee.self.attending && showNotAttending) {
        return true;
      }

      return false;
    }
  }

  numAttendingForInvitee(invitee) {
    if (!invitee.self.attending) {
      return 0;
    } else if (invitee.friends[0] != undefined && invitee.friends[0].self.attending) {
      return 2;
    }

    return 1;
  }
}

EventDetailsAdminController.$inject = [
  'EventAdminService',
  '$stateParams',
  '$q'
];
