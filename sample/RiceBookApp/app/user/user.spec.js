describe('Validate UserCtrl functionality', function () {
  var ctrl;

  beforeEach(module('riceBookApp'))
  
  beforeEach(inject(function($controller) {  
    ctrl = $controller('UserCtrl')    
  }))

  it('should have a status', function() {
    expect(ctrl.status).toBeDefined()
  })

});