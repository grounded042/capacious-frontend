export default class InviteeService {
  constructor(restangular) {
    this.api = restangular;
  }

  init(inviteeId) {
    this.api.one('invitees', inviteeId).get().then((data) => {
      if (data.friends.length < 1) {
        data.friends.push({
          invitee_friend_id: "",
          self: {
            attending: false,
            first_name: "",
            last_name: ""
          }
        })
      }

      this.inviteeInfo = data;
      console.log(data);
    }, (data) => {
      console.log("failed");
      console.log(data);
    });
  }

  poAttending(yesNo) {
    console.log("attending: " + yesNo);
    this.inviteeInfo.friends[0].self.attending = yesNo;
  }

  save() {
    // save the invitee

  }

  saveFriend() {
    // /invitees/:invitee_id/relationships/friends/:guest_id

    // does the friend exist yet?
    if (this.inviteeInfo.friends[0].invitee_friend_id == "") {
      // no? create them
      console.log("creating friend", this.inviteeInfo.friends[0]);
      this.inviteeInfo.customPOST(this.inviteeInfo.friends[0], this.inviteeInfo.invitee_id + '/relationships/friends').then(d => {
        this.inviteeInfo.friends[0] = d;
      }, d => {
        console.log("creating friend failed!");
        console.log(d);
      });


      // update with id now!
    } else {
      // yes? save them
      console.log("saving friend", this.inviteeInfo.friends[0]);
      this.inviteeInfo.customOperation('patch', this.inviteeInfo.invitee_id + '/relationships/friends/' + this.inviteeInfo.friends[0].invitee_friend_id, false, false, this.inviteeInfo.friends[0]);
    }
  }
};

InviteeService.$inject = ['Restangular'];
