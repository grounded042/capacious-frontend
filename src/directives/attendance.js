
export default function attendance() {
  return {
    restrict: 'E',
    scope: {
      getLocClass: '&',
      willAttendFn: '&',
      willNotAttendFn: '&',
      attending: '=',
      backFn: '&',
      saveAndContinueFn: '&',
    },
    template: require('./attendance.html'),
  }
};
