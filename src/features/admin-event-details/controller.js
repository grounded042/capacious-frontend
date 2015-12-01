export default class EventDetailsAdminController {
  constructor(AdminSvc, $stateParams) {
    this.aSvc = AdminSvc;
    this.event_id = $stateParams.id;
    this.totalAttending = 0;
    this.showAttending = true;
    this.showNotAttending = true;

    this.aSvc.loadInviteesForEvent(this.event_id).then(() => {
      this.aSvc.event_invitees.forEach((invitee) => {
        this.totalAttending += this.numAttendingForInvitee(invitee);
      });
      console.log(this.totalAttending);
    }, () => {

    });

    console.log("welcome to event admin");
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
  '$stateParams'
];
