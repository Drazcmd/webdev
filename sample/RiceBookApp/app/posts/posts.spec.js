/***************************
 * Test suite for posts.js *
 ***************************/
describe('Validate PostCtrl functionality', function () {
  var ctrl;

  beforeEach(module('riceBookApp'))
  
  beforeEach(inject(function($controller) {  
    ctrl = $controller('PostCtrl')   
    jasmine.foobar()
  }))

  it('there are initially 3 posts', function() {
    expect(ctrl.posts.length).toBe(3)
  })    

  it('user input is undefined', function() {
    expect(ctrl.userInput).not.toBeDefined();
  }) 

  it('delete a post', function() {
    ctrl.removePost(1)
    expect(ctrl.posts.length).toBe(2)
  })

  it('add a post', function() {
    ctrl.post_title='New title'
    ctrl.post_body='New Body'
    ctrl.addPost()
    expect(ctrl.posts.length).toBe(4)
  })


});
