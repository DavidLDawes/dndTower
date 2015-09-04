'use strict';

/**
 * @ngdoc function
 * @name dndApp.controller:EquipCtrl
 * @description
 * # EquipCtrl
 * Controller of the dndApp
 */
angular.module('dndApp')
  .controller('EquipCtrl', function ($scope, $location, Settings) {
   $scope.links = [
      {'view':'Fight', 'link':'/'},
      {'view':'Generate', 'link':'/generate'},
      {'view':'Equip', 'link':'/equip'},
      {'view':'About', 'link':'/about'} ];

    $scope.selectlink = $scope.links[2];
    $scope.go = function(lnk) {
      if (lnk.view !== 'Equip') {
        $location.path( lnk.link );
      }
    };

    $scope.equipment = [
      {'type':'Balanced',
        'weapontypeodds': [1, 2, 2, 2, 1],
        'armortypeodds': [1, 2, 2, 4, 4, 4, 2, 1]
      }, {'type':'Cheap Weapon',
        'weapontypeodds': [7, 2, 1, 0, 0],
        'armortypeodds': [0, 0, 1, 2, 4, 4, 4, 4]
      }, {'type':'Good Weapon',
        'weapontypeodds': [0, 0, 0, 2, 8],
        'armortypeodds': [4, 4, 4, 4, 2, 1, 0, 0]
      }, {'type':'Cheap Armor',
        'weapontypeodds': [0, 1, 2, 4, 4],
        'armortypeodds': [7, 2, 1, 0, 0, 0, 0, 0]
      }, {'type':'Good Armor',
        'weapontypeodds': [4, 4, 2, 1, 0],
        'armortypeodds': [0, 0, 0, 0, 0, 1, 3, 6]
      } 
    ];

    $scope.selectequip = Settings.getEquipment();

    $scope.selection = function(equ) {
      Settings.setEquipment(equ);
      $scope.selectequip = equ;
    }; 

    $scope.weapons = Settings.Equipment;

    $scope.armor = Settings.Armor;

    $scope.selectpriority = Settings.getGenerator();

  });
