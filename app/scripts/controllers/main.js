'use strict';

/**
 * @ngdoc function
 * @name dndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dndApp
 */
angular.module('dndApp')
  .controller('MainCtrl', function ($scope, $interval, $location, Settings) {
     var save, soldier, mySoldiers;

    $scope.links = [
      {'view':'Fight', 'link':'/'},
      {'view':'Generate', 'link':'/generate'},
      {'view':'Equip', 'link':'/equip'},
      {'view':'About', 'link':'/about'} ];

    $scope.selectlink = $scope.links[0];
    $scope.go = function(link) {
      if (link.view !== 'Fight') {
        $location.path( link.link );
      }
    };

    $scope.selectequip = Settings.getEquipment();
    $scope.selectpriority = Settings.getGenerator();

    $scope.turn = function() {

      save = $scope.fight;

      Settings.updateBattlefield(
        Settings.generateSoldier($scope.selectpriority, $scope.selectequip),
        Settings.generateSoldier( 
          { 'score':'Balanced', 
            'str': {'dice': 2, 'type': 6, 'plus': 6}, 
            'dex': {'dice': 2, 'type': 6, 'plus': 6}, 
            'con': {'dice': 2, 'type': 6, 'plus': 6}
          },
          {'type':'Balanced',
            'weapontypeodds': [1, 2, 2, 2, 1],
            'armortypeodds': [1, 2, 2, 4, 4, 4, 2, 1]
          }
        )
      );

      $scope.fight = Settings.getFight();

      if (($scope.fight === null) || ($scope.fight.length === 0)) {
        $scope.fight = save;
      }

      $scope.showSoldiers();

      Settings.showGraphic(Settings.getBattlefield, Settings.getCtx());
    };

    $scope.getSoldiers = function(whichType) {
      for (soldier in Settings.getBattlefield) {
        soldier = Settings.getBattlefield[soldier];
        if (soldier !== null) {
          if (soldier.mine === whichType) {
            mySoldiers.push(soldier);
          }
        }
      }
      return mySoldiers;
    };

    $scope.getMine = function() {
      return Settings.getSoldiers('true');
    };

    $scope.getTheirs = function() {
      return Settings.getSoldiers('false');
    };

    $scope.showSoldiers = function() {
      $scope.mySoldiers = $scope.getMine();
      $scope.theirSoldiers = $scope.getTheirs();
    };

    $scope.updatePromise = $interval( 
      function() {
        console.log('Update');
        Settings.updateBattlefield( null, null );
        if (Settings.fight !== undefined) {
          if (Settings.fight.length > 0) {$scope.fight = Settings.fight;}
        }

        Settings.showGraphic(Settings.getBattlefield, Settings.getCtx());
      }, 1000);
    
    Settings.showGraphic(Settings.getBattlefield(), Settings.getCtx());

  });
