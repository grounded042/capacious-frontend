
export default function attendance() {
  return {
    restrict: 'E',
    scope: {
      getLocClass: '&',
      willAttendFn: '&',
      willNotAttendFn: '&',
      backFn: '&',
      saveAndContinueFn: '&',
    },
    template: require('./attendance.html'),
  }
};
