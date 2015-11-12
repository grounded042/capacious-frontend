"use strict";
// import all css
import './css/gridism.css';
import './css/fonts.css';
import './css/icon-font.css';
import './css/base.css';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './routing';

import HomeController from './features/home/controller'
import ReplyController from './features/reply/controller'

angular.module('app', [
  uirouter
])

// load the controllers
.controller('HomeController', HomeController)
.controller('ReplyController', ReplyController)
.config(routing);
