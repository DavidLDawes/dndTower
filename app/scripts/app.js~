'use strict';

/**
 * @ngdoc overview
 * @name dndApp
 * @description
 * # dndApp
 *
 * Main module of the application.
 */
angular
  .module('dndApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/equip', {
        templateUrl: 'views/equip.html',
        controller: 'EquipCtrl'
      })
      .when('/purchase', {
        templateUrl: 'views/purchase.html',
        controller: 'PurchaseCtrl'
      })
      .when('/generate', {
        templateUrl: 'views/generate.html',
        controller: 'GenerateCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    });

