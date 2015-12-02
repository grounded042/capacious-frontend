"use strict";
// import all css
import './css/gridism.css';
import './css/fonts.css';
import './css/icon-font.css';
import './css/base.css';
import './css/angular-material.min.css';
import './css/md-data-table.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';

// import moment.js
import 'moment';
import 'angular-moment';

// angucomplete
import 'angucomplete-alt'

// restangular
import _ from 'underscore';
window._ = _;
import 'restangular';

// ngstorage
import 'ngstorage';

// angular material
import './scripts/angular-aria.min.js';
import './scripts/angular-material.min.js';
import mdDataTable from 'angular-material-data-table';

import routing from './routing';
import run from './run';
import config from './config'

import EventService from './services/event';
import InviteeService from './services/invitee';
import MenuItemsService from './services/menu_items';
import AuthService from './services/auth';
import EventAdminService from './services/event_admin';

import HomeController from './features/home/controller';
import ReplyController from './features/reply/controller';
import AuthController from './features/auth/controller';
import AdminController from './features/admin/controller';
import EventAdminController from './features/admin-events/controller';
import EventDetailsAdminController from './features/admin-event-details/controller';

import EventInfoDirective from './directives/event_info';
import PlusOneDirective from './directives/plus_one';
import FoodInfoDirective from './directives/food_info';
import MenuInfoDirective from './directives/menu_info';
import SeatingDirective from './directives/seating';
import VerifyDirective from './directives/verify';
import ThanksDirective from './directives/thanks';
import AttendanceDirective from './directives/attendance';

angular.module('app', [
  uirouter,
  'angularMoment',
  'restangular',
  'angucomplete-alt',
  'ngStorage',
  ngAnimate,
  'ngAria',
  'ngMaterial',
  mdDataTable
])

// load the services
.service('EventService', EventService)
.service('InviteeService', InviteeService)
.service('MenuItemsService', MenuItemsService)
.service('AuthService', AuthService)
.service('EventAdminService', EventAdminService)
// load the controllers
.controller('HomeController', HomeController)
.controller('ReplyController', ReplyController)
.controller('AuthController', AuthController)
.controller('AdminController', AdminController)
.controller('EventAdminController', EventAdminController)
.controller('EventDetailsAdminController', EventDetailsAdminController)
// load the directives
.directive('eventInfo', EventInfoDirective)
.directive('plusOne', PlusOneDirective)
.directive('foodInfo', FoodInfoDirective)
.directive('menuInfo', MenuInfoDirective)
.directive('seating', SeatingDirective)
.directive('verify', VerifyDirective)
.directive('thanks', ThanksDirective)
.directive('attendance', AttendanceDirective)
.config(routing)
.config(config)
.run(run);
