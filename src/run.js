run.$inject = ['Restangular'];

export default function run(Restangular) {
  Restangular.setBaseUrl('http://127.0.0.1:8000/api/v1');
}
