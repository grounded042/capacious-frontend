import angular from 'angular';

const MAX_NOTE_LENGTH = 255;

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

      // update menu_choices to fit directive needs
      data.self.menu_choices = buildDirectiveMenuChoicesObj(data.self.menu_choices);
      data.friends[0].self.menu_choices = buildDirectiveMenuChoicesObj(data.friends[0].self.menu_choices);

      this.inviteeInfo = data;
      console.log(data);
    }, (data) => {
      console.log("failed");
      console.log(data);
    });

    function buildDirectiveMenuChoicesObj(curChoices) {
      let toReturn = {};

      curChoices.forEach((item) => {
        toReturn[item.menu_item_id] = item.menu_item_option_id;
      });

      return toReturn;
    }
  }

  poAttending(yesNo) {
    console.log("attending: " + yesNo);
    this.inviteeInfo.friends[0].self.attending = yesNo;
  }

  removeSeatingRequest(id) {
    if (typeof(id) !== 'undefined') {
      this.inviteeInfo.seating_request = this.inviteeInfo.seating_request.filter((item) => {
        if (item.invitee_request_id == id) {
          return false;
        }

        return true;
      });
    }
  }

  addSeatingRequest(obj) {
    if (typeof(obj) !== 'undefined' && !this.isIdInSeatingRequests(obj.invitee_request_id) && this.inviteeInfo.seating_request.length + 1 <= 5) {
      this.inviteeInfo.seating_request.push(obj);
    }
  }

  isIdInSeatingRequests(id) {
    // if every() equals true, we did not find the id in the array
    // so we want to return false if we did not find it
    return this.inviteeInfo.seating_request.every((item) => {
      if (item.invitee_request_id == id) {
        return false;
      }

      return true;
    }) == false;
  }

  save() {
    // save the invitee

  }

  saveSeatingRequest() {
    console.log("SAVING", this.inviteeInfo.seating_request);
    this.inviteeInfo.customPOST(this.inviteeInfo.seating_request, this.inviteeInfo.invitee_id + '/relationships/seating_requests').then(d => {
      console.log("SAVED", d);
      this.inviteeInfo.seating_request = d;
    }, d => {
      console.log("setting the seating request for the invitee failed!");
      console.log(d);
    });
  }

  saveInviteeAndFriendMenuChoices() {
    // save the invitee menu choices
    this.inviteeInfo.customPOST(buildSelfMenuChoicesArray(this.inviteeInfo.self.menu_choices), this.inviteeInfo.invitee_id + '/relationships/menu_choices').then(d => {
      this.inviteeInfo.self.menu_choices = d;
    }, d => {
      console.log("updating the menu choices for the invitee failed!");
      console.log(d);
    });

    // save the invitee note
    if (this.inviteeInfo.self.menu_note.length > MAX_NOTE_LENGTH) {
      this.inviteeInfo.self.menu_note = this.inviteeInfo.self.menu_note.substring(0, MAX_NOTE_LENGTH);
    }

    this.inviteeInfo.customPOST({ note_body: this.inviteeInfo.self.menu_note }, this.inviteeInfo.invitee_id + '/relationships/menu_note').then(d => {
      this.inviteeInfo.self.menu_note = d.note_body;
    }, d => {
      console.log("saving the invitee menu note failed!");
      console.log(d);
    });

    // save the friend menu choices
    // does the friend exist?
    // is the friend attending?
    if (this.inviteeInfo.friends[0].invitee_friend_id != "" && this.inviteeInfo.friends[0].self.attending) {
      this.inviteeInfo.customPOST(buildSelfMenuChoicesArray(this.inviteeInfo.friends[0].self.menu_choices), this.inviteeInfo.invitee_id + '/relationships/friends/' + this.inviteeInfo.friends[0].invitee_friend_id + '/relationships/menu_choices').then(d => {
        this.inviteeInfo.friends[0].self.menu_choices = d;
      }, d => {
        console.log("updating the menu choices for the invitee friend failed!");
        console.log(d);
      });

      // save the invtee friend note
      if (this.inviteeInfo.friends[0].self.menu_note.length > MAX_NOTE_LENGTH) {
        this.inviteeInfo.friends[0].self.menu_note = this.inviteeInfo.friends[0].self.menu_note.substring(0, MAX_NOTE_LENGTH);
      }

      this.inviteeInfo.customPOST({ note_body: this.inviteeInfo.friends[0].self.menu_note }, this.inviteeInfo.invitee_id + '/relationships/friends/' + this.inviteeInfo.friends[0].invitee_friend_id + '/relationships/menu_note').then(d => {
        this.inviteeInfo.friends[0].self.menu_note = d.note_body;
      }, d => {
        console.log("saving the invitee friend menu note failed!");
        console.log(d);
      });
    }

    function buildSelfMenuChoicesArray(buildFrom) {
      let choices = [];

      for (let key in buildFrom) {
        choices.push({
          menu_item_id: key,
          menu_item_option_id: buildFrom[key]
        });
      }

      return choices;
    }
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
      let toSave = {};
      angular.copy(this.inviteeInfo.friends[0], toSave);
      toSave.self.menu_choices = [];
      this.inviteeInfo.customOperation('patch', this.inviteeInfo.invitee_id + '/relationships/friends/' + this.inviteeInfo.friends[0].invitee_friend_id, false, false, toSave);
    }
  }
};

InviteeService.$inject = ['Restangular'];
