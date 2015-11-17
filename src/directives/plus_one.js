
export default function plusOne() {
  return {
    restrict: 'E',
    scope: {
      getLocClass: '&',
      willAttendFn: '&',
      willNotAttendFn: '&',
      attending: '=',
      firstName: '=',
      lastName: '=',
      disableSaveFn: '&',
      backFn: '&',
      saveAndContinueFn: '&',
    },
    template: require('./plus_one.html'),
  }
};
