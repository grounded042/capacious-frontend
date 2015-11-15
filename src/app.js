"use strict";
// import all css
import './css/gridism.css';
import './css/fonts.css';
import './css/icon-font.css';
import './css/base.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

// import moment.js
import 'moment';
import 'angular-moment';

// restangular
import _ from 'underscore';
window._ = _;
import 'restangular';

import routing from './routing';
import run from './run';

import EventService from './services/event';
import InviteeService from './services/invitee';
import MenuItemsService from './services/menu_items';

import HomeController from './features/home/controller';
import ReplyController from './features/reply/controller';

import EventInfoDirective from './directives/event_info';
import PlusOneDirective from './directives/plus_one';
import FoodInfoDirective from './directives/food_info';

angular.module('app', [
  uirouter,
  'angularMoment',
  'restangular'
])

// load the services
.service('EventService', EventService)
.service('InviteeService', InviteeService)
.service('MenuItemsService', MenuItemsService)
// load the controllers
.controller('HomeController', HomeController)
.controller('ReplyController', ReplyController)
// load the directives
.directive('eventInfo', EventInfoDirective)
.directive('plusOne', PlusOneDirective)
.directive('foodInfo', FoodInfoDirective)
.config(routing)
.run(run);
