'use strict';

/**
 * @ngdoc function
 * @name dndApp.controller:GenerateCtrl
 * @description
 * # GenerateCtrl
 * Controller of the dndApp
 */
angular.module('dndApp')
  .controller('GenerateCtrl', function ($scope, $location, Settings) {
    $scope.links = [
      {'view':'Fight', 'link':'/'},
      {'view':'Generate', 'link':'/generate'},
      {'view':'Equip', 'link':'/equip'},
      {'view':'About', 'link':'/about'} ];

    $scope.selectlink = $scope.links[1];

    $scope.go = function(link) {
      if (link.view !== 'Generate') {
        $location.path( link.link );
      }
    };

    $scope.priorities = [
      { 'score':'Balanced', 
        'str': {'dice': 2, 'type': 6, 'plus': 6}, 
        'dex': {'dice': 2, 'type': 6, 'plus': 6}, 
        'con': {'dice': 2, 'type': 6, 'plus': 6}
      },
      { 'score':'High Strength', 
        'str': {'dice': 0, 'type': 6, 'plus': 18}, 
        'dex': {'dice': 3, 'type': 6, 'plus': 0}, 
        'con': {'dice': 3, 'type': 6, 'plus': 0}
      },
      { 'score':'High Endurance',
        'str': {'dice': 3, 'type': 6, 'plus': 0}, 
        'dex': {'dice': 3, 'type': 6, 'plus': 0}, 
        'con': {'dice': 0, 'type': 6, 'plus': 18}
      },
      { 'score':'High Speed' ,
        'str': {'dice': 3, 'type': 6, 'plus': 3}, 
        'dex': {'dice': 0, 'type': 6, 'plus': 18}, 
        'con': {'dice': 3, 'type': 6, 'plus': 0}
      }
    ];

    $scope.selectequip = Settings.getEquipment();
    $scope.selectpriority = Settings.getGenerator();

    $scope.selection = function(prty) {
      Settings.setGenerator(prty);
      $scope.selectpriority = prty;
    }; 
  });
