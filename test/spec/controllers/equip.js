'use strict';

describe('Controller: EquipCtrl', function () {

  // load the controller's module
  beforeEach(module('dndApp'));

  var EquipCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EquipCtrl = $controller('EquipCtrl', {
      $scope: scope
    });
  }));

  it('should set links up', function () {
    expect(scope.links.length).toEqual(4);
  });
});
