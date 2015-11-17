
export default function eventInfo() {
  return {
    restrict: 'E',
    scope: {
      getLocClass: '&',
      name: '=',
      time: '=',
      location: '=',
      inviteeName: '=',
      respondBy: '=',
      getStartedFn: '&',
    },
    template: require('./event_info.html'),
  }
};
