export default function foodInfo() {
  return {
    restrict: 'E',
    scope: {
      getLocClass: '&',
      inviteeName: '=',
      inviteeMenuChoices: '=',
      inviteeNote: '=',
      friendName: '=',
      friendMenuChoices: '=',
      friendAttending: '=',
      friendNote: '=',
      menuItems: '=',
      backFn: '&',
      saveAndContinueFn: '&'
    },
    template: require('./food_info.html')
  }
};
