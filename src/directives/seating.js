import angular from 'angular';

export default function seating() {
  return {
    restrict: 'E',
    scope: {
      getLocClass: '&',
      choices: '=',
      seatingRequests: '=',
      removeSeatingRequestFn: '&',
      addSeatingRequestFn: '&',
      backFn: '&',
      saveAndContinueFn: '&',
    },
    template: require('./seating.html'),
    link: (scope) => {

      scope.add = (toAdd) => {
        scope.addSeatingRequestFn({obj: toAdd.originalObject});
      }

      scope.remove = (toRemove) => {
        scope.removeSeatingRequestFn({id: toRemove.invitee_request_id});
      }
    }
  }
};
