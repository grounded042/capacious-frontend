export default class InviteeService {
  constructor(restangular) {
    this.api = restangular;
  }

  init(inviteeId) {
    this.api.one('invitees', inviteeId).get().then((data) => {
      this.inviteeInfo = data;
      console.log(data);
    }, (data) => {
      console.log("failed");
      console.log(data);
    });
  }
};

InviteeService.$inject = ['Restangular'];
