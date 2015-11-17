
export default function plusOne() {
  return {
    restrict: 'E',
    scope: {
      getLocClass: '&',
      willAttendFn: '&',
      willNotAttendFn: '&',
      firstName: '=',
      lastName: '=',
      disableSaveFn: '&',
      backFn: '&',
      saveAndContinueFn: '&',
    },
    template: require('./plus_one.html'),
  }
};
