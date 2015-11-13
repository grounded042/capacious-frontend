
export default function plusOne() {
  return {
    restrict: 'E',
    scope: {
      getLocClass: '&',
      willAttendFn: '&',
      willNotAttendFn: '&',
      firstName: '=',
      lastName: '=',
      backFn: '&',
      saveAndContinueFn: '&',
    },
    template: require('./plus_one.html'),
  }
};
