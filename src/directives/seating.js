
export default function seating() {
  return {
    restrict: 'E',
    scope: {
      getLocClass: '&',
      choices: '=',
      backFn: '&',
      saveAndContinueFn: '&',
    },
    template: require('./seating.html'),
  }
};
