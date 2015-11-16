
export default function verify() {
  return {
    restrict: 'E',
    scope: {
      getLocClass: '&',
      inviteeFirstName: '=',
      inviteeLastName: '=',
      friendFirstName: '=',
      friendLastName: '=',
      inviteeAttending: '=',
      friendAttending: '=',
      menuItems: '=',
      inviteeMenuChoices: '=',
      friendMenuChoices: '=',
      inviteeNote: '=',
      friendNote: '=',
      seatingRequests: '=',
      backFn: '&',
      saveAndContinueFn: '&',
    },
    template: require('./verify.html')
  }
};
