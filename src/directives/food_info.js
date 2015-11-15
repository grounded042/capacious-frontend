
export default function foodInfo() {
  return {
    restrict: 'E',
    scope: {
      getLocClass: '&',
      inviteeName: '=',
      inviteeMenuChoices: '=',
      friendName: '=',
      friendMenuChoices: '=',
      friendAttending: '=',
      menuItems: '=',
      backFn: '&'
    },
    template: require('./food_info.html'),
    link: (scope, element, attr) => {
      // create an object to use in mapping selection menu choices to the obj
      // the api expects
      scope.newInviteeMenuChoices = {};
      scope.newFriendMenuChoices = {};

      scope.$watch('inviteeMenuChoices', function(newValue, oldValue, theScope) {
        scope.newInviteeMenuChoices = buildNewMenuChoicesObj(theScope.inviteeMenuChoices);
      }, true);

      scope.$watch('friendMenuChoices', function(newValue, oldValue, theScope) {
        scope.newFriendMenuChoices = buildNewMenuChoicesObj(theScope.friendMenuChoices);
      }, true);

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


      scope.save = () => {
        // update the passed in menu choices with the selected ones
        scope.inviteeMenuChoices = updateMenuChoices(scope.inviteeMenuChoices, scope.newInviteeMenuChoices);
        scope.friendMenuChoices = updateMenuChoices(scope.friendMenuChoices, scope.newFriendMenuChoices);
      }
    }
  }
};
