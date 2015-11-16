
export default function thanks() {
  return {
    restrict: 'E',
    scope: {
      getLocClass: '&',
      attending: '=',
      name: '=',
      time: '=',
      location: '=',
    },
    template: require('./thanks.html'),
  }
};
