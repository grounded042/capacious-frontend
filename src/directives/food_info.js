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
      disableSaveFn: '&',
      backFn: '&',
      saveAndContinueFn: '&'
    },
    template: require('./food_info.html')
  }
};
