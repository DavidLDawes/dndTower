'use strict';

/**
 * @ngdoc function
 * @name dndApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dndApp
 */
angular.module('dndApp')
  .controller('AboutCtrl', function ($scope, $location, Settings) {
    $scope.links = [
      {'view':'Fight', 'link':'/'},
      {'view':'Generate', 'link':'/generate'},
      {'view':'Equip', 'link':'/equip'},
      {'view':'About', 'link':'/about'} ];

    $scope.selectlink = $scope.links[3];
    $scope.go = function(link) {
      if (link.view !== 'About') {
        $location.path( link.link );
      }
    };

    $scope.selectequip = Settings.getEquipment();
    $scope.selectpriority = Settings.getGenerator();
  });
