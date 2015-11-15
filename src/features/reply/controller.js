const EVENT_INFO = {
  name: "eventInfo",
  display: "Event Info",
  order: 1
};

const PLUS_ONE = {
  name: "plusOne",
  display: "Plus One",
  order: 2
};

const FOOD = {
  name: "food",
  display: "Food",
  order: 3
};

const SEATING = {
  name: "seating",
  display: "Seating",
  order: 3
};

const VERIFY = {
  name: "verify",
  display: "Verify",
  order: 3
};

export default class ReplyController {
  constructor(eventService, inviteeService, $stateParams) {
    console.log("welcome to reply");

    this.eventId = $stateParams.eventId;
    this.inviteeId = $stateParams.inviteeId;

    this.eSvc = eventService;
    this.eSvc.init(this.eventId);

    this.iSvc = inviteeService;
    this.iSvc.init(this.inviteeId);

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
    // take care of any saving
    switch (this.statesObj.getCurrentState()) {
      case EVENT_INFO:
        console.log("don't need to save any event info");
        break;
      case PLUS_ONE:
        console.log("saving plus one info");
        this.iSvc.saveFriend();
        break;
      case FOOD:
        console.log("saving food choices");
        break;
      case SEATING:
        console.log("saving seating info");
        break;
      case VERIFY:
        console.log("verify");
        break;
      default:
        console.log("nothing needed saving");
    }

    this.statesObj.gotoNextState();
  }

  prevState() {
    this.statesObj.gotoPrevState();
  }
};

ReplyController.$inject = [
  'EventService',
  'InviteeService',
  '$stateParams',
];

class states {
  constructor() {
    this.list = [
      EVENT_INFO,
      PLUS_ONE,
      FOOD,
      SEATING,
      VERIFY
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
}
