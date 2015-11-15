export default function foodInfo() {
  return {
    restrict: 'E',
    scope: {
      getLocClass: '&',
      inviteeName: '=',
      inviteeMenuChoices: '=',
      inviteeNote: '=',
      friendName: '=',
      friendMenuChoices: '=',
      friendAttending: '=',
      friendNote: '=',
      menuItems: '=',
      backFn: '&',
      saveAndContinueFn: '&'
    },
    template: require('./food_info.html'),
    link: (scope, element, attr) => {
      // create an object to use in mapping selection menu choices to the obj
      // the api expects
      scope.newInviteeMenuChoices = {};
      scope.newFriendMenuChoices = {};

      // handle updating the selection object with the choices object and
      // vice versa
      scope.$watch('inviteeMenuChoices', function(newValue, oldValue, theScope) {
        theScope.newInviteeMenuChoices = buildNewMenuChoicesObj(theScope.inviteeMenuChoices);
      }, true);

      scope.$watch('newInviteeMenuChoices', function(newValue, oldValue, theScope) {
        theScope.inviteeMenuChoices = updateMenuChoices(theScope.inviteeMenuChoices, theScope.newInviteeMenuChoices);
      }, true);

      scope.$watch('friendMenuChoices', function(newValue, oldValue, theScope) {
        theScope.newFriendMenuChoices = buildNewMenuChoicesObj(theScope.friendMenuChoices);
      }, true);

      scope.$watch('newFriendMenuChoices', function(newValue, oldValue, theScope) {
        theScope.friendMenuChoices = updateMenuChoices(theScope.friendMenuChoices, theScope.newFriendMenuChoices);
      }, true);
      // end updating selection and choices obj

      function buildNewMenuChoicesObj(curChoices) {
        let toReturn = {};

        if (typeof(curChoices) !== 'undefined') {
          curChoices.forEach((item) => {
            toReturn[item.menu_item_id] = item.menu_item_option_id;
          });
        }

        return toReturn;
      }

      // update guest choices
      function updateMenuChoices(choices, updateWith) {
        choices = [];

        for (let key in updateWith) {
          choices.push({
            menu_item_id: key,
            menu_item_option_id: updateWith[key]
          });
        }

        return choices;
      }
    }
  }
};
