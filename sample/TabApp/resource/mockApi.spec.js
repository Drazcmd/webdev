describe('Shared Resource Controller Tests', function() {
	var helper = jasmine.helper
	var ctrl;	
	var promises = []

	beforeEach(module('tabApp'))	

	beforeEach(module(function($provide) {
		$provide.value('api', helper.mockApiService)
		$provide.value('LocationService', helper.mockLocationService)
	}))

	beforeEach(inject(function($controller, $rootScope, $q, api, LocationService) {		
		helper.init($q)
		console.log('here', api)
 		ctrl = $controller('ResourceCtrl', {
			'api': api,
			'LocationService': LocationService
		})	
		ctrl._resolveTestPromises = function() {
			helper.resolveTestPromises($rootScope)
		}
		ctrl._resolveTestPromises()
	}))


	it('should have a location', function() {
		expect(ctrl.location).toEqual(jasmine.any(Object))
	})

	it('should have a status', function() {
		expect(ctrl.userStatus).not.toBeNull()
		expect(ctrl.userStatus.length).not.toBe(0)
		expect(ctrl.userStatus).toEqual("Test Status")
	})

	it('should call the post api and get 1 Test post', function() {
		ctrl.loadPosts()
		ctrl._resolveTestPromises()
		expect(ctrl.posts.length).toBe(1)
		expect(ctrl.posts[0].author).toEqual('Test')
	})

	it('should remove a post', function() {
		ctrl.posts.push({ 'id': 1 })
		expect(ctrl.posts.length).toBe(1)
		ctrl.removePosts(1)
		expect(ctrl.posts.length).toBe(0)
	})

})