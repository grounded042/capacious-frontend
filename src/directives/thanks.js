
export default function thanks() {
  return {
    restrict: 'E',
    scope: {
      getLocClass: '&',
      name: '=',
      time: '=',
      location: '=',
    },
    template: require('./thanks.html'),
  }
};
