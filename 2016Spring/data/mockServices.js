//******************************//
// this file is mockServices.js //
//******************************//
//
// Below notice that I send in jasmine as an argument to my function
// and place my helper directly on the jasmine object so that I can
// put it out later.  Therefore to *use* this in a test, 
// I might do something like this:
//
//	beforeEach(inject(function($controller, $rootScope, $q) {		
//		var mockServices = jasmine.mockServices
//		mockServices.init($q)
// 		ctrl = $controller('ResourceCtrl', {
//			'api': mockServices.mockApiService,
//			'LocationService': mockServices.mockLocationService
//		})		
//		ctrl._resolveTestPromises = function() {
//			mockServices.resolveTestPromises($rootScope)
//		}
//		ctrl._resolveTestPromises()
//	}))

(function(jasmine) { 	
	var $q
	var promises = []

	function init(_$q_) {
		$q = _$q_
	}

	function makePromise(response) {
		var p = $q.defer()
		promises.push({ promise: p, response: response })
		return { $promise: p.promise }
	}

	var mockApiService =  {
		getPosts: function() {
			return makePromise({ posts: 
				[{
					'author':'Test',
					'title':'A Test Post',
					'date':'Today',
					'body':'... test post ...'
				}]
			})
		},
		getStatus: function() {
			return makePromise(
				{'status':'Test Status'}
			)
		},
		setStatus: function() {
			return makePromise(
				{'status':'Was set'}
			)
		}
	}

	var mockLocationService = {
		get: function() { 
			return makePromise('was called')
		} 
	}

	var resolveTestPromises = function(rootScope) {
		promises.forEach(function(p) {
			p.promise.resolve(p.response)
		})
		promises.length = 0
		rootScope.$apply()
	}

	jasmine.mockServices = {
		init: init,
		mockApiService: mockApiService,
		mockLocationService: mockLocationService,
		resolveTestPromises: resolveTestPromises
	}

})(window.jasmine)