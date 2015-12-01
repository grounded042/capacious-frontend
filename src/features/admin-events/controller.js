export default class EventAdminController {
  constructor(AdminSvc, $state) {
    this.aSvc = AdminSvc;
    this.$state = $state;

    this.aSvc.init();

    console.log("welcome to event admin");
  }

  showInviteesForEvent(id) {
    console.log(id);
    this.$state.transitionTo('admin.event_details', {id: id});
  }

  numAttendingForInvitee(invitee) {
    if (!invitee.self.attending) {
      return 0;
    } else if (invitee.friends[0].self.attending) {
      return 2;
    }

    return 1;
  }
}

EventAdminController.$inject = [
  'EventAdminService',
  '$state'
];
