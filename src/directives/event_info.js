
export default function eventInfo() {
  return {
    restrict: 'E',
    scope: {
      getLocClass: '&',
      name: '=',
      time: '=',
      location: '=',
      inviteeName: '=',
      active: '=',
      nextFn: '&',
    },
    template: require('./event_info.html'),
  }
};
