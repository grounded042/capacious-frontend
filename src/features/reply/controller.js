const EVENT_INFO = {
  name: "eventInfo",
  display: "Event Info",
  order: 1
};

const ATTENDANCE = {
  name: "attendance",
  display: "Attendance",
  order: 2
};

const PLUS_ONE = {
  name: "plusOne",
  display: "Plus One",
  order: 3
};

const FOOD = {
  name: "food",
  display: "Food",
  order: 4
};

const SEATING = {
  name: "seating",
  display: "Seating",
  order: 5
};

const VERIFY = {
  name: "verify",
  display: "Verify",
  order: 6
};

const THANKS = {
  name: "thanks",
  display: false,
  order: 7
};

export default class ReplyController {
  constructor(eventService, inviteeService, menuItemsService, $stateParams) {
    console.log("welcome to reply");

    this.eventId = $stateParams.eventId;
    this.inviteeId = $stateParams.inviteeId;

    this.eSvc = eventService;
    this.eSvc.init(this.eventId);

    this.iSvc = inviteeService;
    this.iSvc.init(this.inviteeId);

    this.mISvc = menuItemsService;
    this.mISvc.init(this.eventId);

    this.statesObj = new states();
  }

  getLocClass(stateName) {
    let state = this.statesObj.getStateByName(stateName);
    let curState = this.statesObj.getCurrentState();

    if (state.order > curState.order) {
      return 'next';
    } else if (state.order < curState.order) {
      return 'prev-all';
    } else if (state.order === curState.order) {
      return 'active';
    }
  }

  nextState() {
    let blockNext = false;

    // take care of any saving
    switch (this.statesObj.getCurrentState()) {
      case EVENT_INFO:
        console.log("don't need to save any event info");
        break;
      case ATTENDANCE:
        console.log("saving attendance info");
        this.iSvc.save();

        // if not attending, work some magic and skip to thanks
        if (!this.iSvc.inviteeInfo.self.attending) {
          this.statesObj.gotoState(VERIFY);
          blockNext = true;
        }

        break;
      case PLUS_ONE:
        console.log("saving plus one info");
        this.iSvc.saveFriend();
        break;
      case FOOD:
        console.log("saving food choices");
        this.iSvc.saveInviteeAndFriendMenuChoices();

        // load the seating requests for the next state
        this.eSvc.loadSeatingRequestChoices();

        break;
      case SEATING:
        console.log("saving seating info");
        this.iSvc.saveSeatingRequest();
        break;
      case VERIFY:
        console.log("verify");
        break;
      default:
        console.log("nothing needed saving");
    }

    if (!blockNext) {
      this.statesObj.gotoNextState();
    } else {
      blockNext = true;
    }
  }

  disableSaveAndContinue(stateName) {
    switch (this.statesObj.getStateByName(stateName)) {
      case PLUS_ONE:
        return this.iSvc.inviteeInfo.friends.length > 0 &&
          this.iSvc.inviteeInfo.friends[0].self.attending &&
          (this.iSvc.inviteeInfo.friends[0].self.first_name.length == 0 ||
          this.iSvc.inviteeInfo.friends[0].self.last_name.length == 0);
        break;
      case FOOD:
        return this.verifyFoodChoices(this.mISvc.menuItems, this.iSvc.inviteeInfo);
        break;
      default:
        console.log("nothing needed verifying!");
        return false;
    }
  }

  verifyFoodChoices(menuItems, inviteeInfo) {
    // get the number of items they need to choose
    let numItems = menuItems.filter(i => {
      if (i.options.length > 1) {
        return true;
      }

      return false;
    }).length;

    return (inviteeInfo.self.attending &&
      _.size(inviteeInfo.self.menu_choices) != numItems) ||
      (inviteeInfo.friends[0].self.attending &&
        _.size(inviteeInfo.friends[0].self.menu_choices) != numItems);
  }

  navClick(state) {
    if (!this.disableSaveAndContinue(this.statesObj.getCurrentState().name)) {
      this.statesObj.gotoState(state);
    }
  }

  iAttending(yesNo) {
    this.iSvc.attending(yesNo);
    this.nextState();
  }

  sOAttending(yesNo) {
    this.iSvc.poAttending(yesNo);

    if (!yesNo) {
      this.nextState();
    }
  }

  prevState() {
    this.statesObj.gotoPrevState();
  }

  displayNavItem(item) {
    return item.display;
  }
};

ReplyController.$inject = [
  'EventService',
  'InviteeService',
  'MenuItemsService',
  '$stateParams',
];

class states {
  constructor() {
    this.list = [
      EVENT_INFO,
      ATTENDANCE,
      PLUS_ONE,
      FOOD,
      SEATING,
      VERIFY,
      THANKS
    ];

    this.currentState = EVENT_INFO;
  }

  getCurrentState() {
    return this.currentState;
  }

  getStateByName(name) {
    let toReturn = {};

    this.list.every(item => {
      if (item.name.toLowerCase() === name.toLowerCase()) {
        toReturn = item;
        return false;
      }

      return true;
    });

    return toReturn;
  }

  gotoNextState() {
    let curNum = this.currentState.order;

    this.list.every(cs => {
      if (cs.order == curNum + 1) {
        this.currentState = cs;
        return false;
      }

      return true;
    });
  }

  gotoPrevState() {
    let curNum = this.currentState.order;

    this.list.every(cs => {
      if (cs.order == curNum - 1) {
        this.currentState = cs;
        return false;
      }

      return true;
    });
  }

  gotoState(goToMe) {
    this.list.every(s => {
      if (s == goToMe) {
        this.currentState = s;
        return false;
      }

      return true;
    })
  }
}
