
export default function eventInfo() {
  return {
    restrict: 'E',
    scope: {
      getLocClass: '&',
      name: '=',
      time: '=',
      location: '=',
      inviteeName: '=',
      getStartedFn: '&',
    },
    template: require('./event_info.html'),
  }
};
