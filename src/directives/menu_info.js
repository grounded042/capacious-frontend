export default function menuInfo() {
  return {
    restrict: 'E',
    scope: {
      menuItems: '=',
      displayModal: '=',
    },
    template: require('./menu_info.html')
  }
};
