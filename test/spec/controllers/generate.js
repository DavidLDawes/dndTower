'use strict';

describe('Controller: GenerateCtrl', function () {

  // load the controller's module
  beforeEach(module('dndApp'));

  var GenerateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GenerateCtrl = $controller('GenerateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of 4 priority choices', function () {
    expect(scope.priorities.length).toBe(4);
  });

  it('should attach a list of 4 links', function () {
    expect(scope.links.length).toBe(4);
    expect(scope.links[0]).toEqual({'view':'Fight', 'link':'/'});
  });


});
