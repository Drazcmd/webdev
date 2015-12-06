;(function() {
	

angular.module('DummyApp', ['ngResource'])
	.constant('apiURL', 'https://ricebookserver.herokuapp.com')
	.factory('api', apiService)
	.controller('DummyCtrl', DummyCtrl)
	;

function apiService($resource, apiURL, $http) {
	$http.defaults.withCredentials = true;
	return $resource(apiURL + '/:endpoint/:user/:id', { user: '@user' }, 
		{
			login    : { method: 'POST', params: {endpoint: 'login'   } },
			logout   : { method: 'PUT' , params: {endpoint: 'logout'  } },
			getStatus: { method: 'GET' , params: {endpoint: 'statuses'} },
			setStatus: { method: 'PUT' , params: {endpoint: 'status'} },			
			
			getPosts : { method: 'GET' , params: {endpoint: 'posts'   } }
		})
}

DummyCtrl.$inject = ['api', '$scope', 'apiURL', '$window']
function DummyCtrl(api, $scope, apiURL, $window) {
	var vm = this;
	vm.iam = null;
	vm.posts = []
	vm.login = login
	vm.logout = logout
	vm.loadPosts = loadPosts
    vm.getStatus = getStatus
    vm.status = ""
    vm.facebookLogin = facebookLogin
    vm.googleLogin = googleLogin
    vm.message = null    

   getStatus()    

	function logout() {
		api.logout().$promise.then(function(result) {
			$window.location.reload();
		})
	}

	function login() {
		api.login({'username':vm.username, 'password':vm.password}).$promise.
			then(function(result) {
				console.log('logged in')
				console.log(result)				
				getStatus()
			})
	}

	function facebookLogin() {
		window.location = apiURL + '/auth/facebook/'
	}

	function googleLogin() {
		window.location = apiURL + '/auth/google/'
	}

	function loadPosts() {		
		vm.posts.length = 0
		api.getPosts().$promise.then(function(result) {
			console.log('done got ' + result.posts.length )
			result.posts.forEach(function(post) {
				vm.posts.push(post)
			})
		}, function(err) {
			vm.message = err.data		
		})
	}

    function getStatus() {
    	api.getStatus().$promise.then(function(result) {
    		vm.status = result.statuses[0].status
			vm.iam = result.statuses[0].username			
    	})
    }

}


})()
