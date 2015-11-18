
export default function plusOne() {
  return {
    restrict: 'E',
    scope: {
      getLocClass: '&',
      willAttendFn: '&',
      willNotAttendFn: '&',
      firstName: '=',
      lastName: '=',
      attending: '=',
      disableSaveFn: '&',
      backFn: '&',
      saveAndContinueFn: '&',
    },
    template: require('./plus_one.html'),
  }
};
