;(function() {

angular.module('tabApp')
	.constant('apiURL', 'https://webdev-dummy.herokuapp.com')
	.factory('api', apiService)
	.factory('LocationService', LocationService)
	.controller('ResourceCtrl', ResourceCtrl)
	;

function apiService($resource, apiURL) {
	return $resource(apiURL + '/:endpoint/:user', { user: '@user' }, 
		{
			getStatus: { method:'GET', params: {endpoint: 'statuses'} },
			setStatus: { method:'PUT', params: {endpoint: 'statuses'} },
			getPosts : { method:'GET', params: {endpoint: 'posts' } }
		})
}

function LocationService($resource, apiURL) {
	return $resource(apiURL + '/locations/:user', { user: '@user' }, {
		update: { method: 'PUT'}
	})
}

ResourceCtrl.$inject = ['$http', '$interval', 'api', 'LocationService']
function ResourceCtrl($http, $interval, api, LocationService) {

	var vm = this
	vm.user = 'Scott'
	vm.posts = []
	vm.loadPosts = loadPosts
	vm.removePosts = removePost
	vm.toggleLoading = toggleLoading
	vm.stop = null

	vm.userStatus = ''
	vm.saveStatus = saveStatus
	vm.updateLocation = updateLocation

	// treat LocationService as classic REST API
	vm.location = LocationService.get({ user: vm.user })

	updateStatus()

	//*********** functions ******************//

	function loadPosts() {
		vm.posts.length = 0
		api.getPosts().$promise.then(function(result) {
			result.posts.forEach(function(post) {
				vm.posts.push(post)
			})
		})
	}

	function removePost(postId) {
		var index = -1;
		var len = vm.posts.length;
		for (var ii = 0; ii < len; ++ii) {
			if (vm.posts[ii].id === postId) {
				index = ii;
				break;
			}
		}
		vm.posts.splice(index, 1)
	}

	function toggleLoading() {
		if (vm.stop) {
			console.log('stopping interval')
			$interval.cancel(vm.stop)
			vm.stop = null
		} else {
			console.log('starting interval')
			vm.loadPosts()
			vm.stop = $interval(vm.loadPosts, 5000)
		}
	}

	function updateStatus() {
		api.getStatus({user:vm.user}).$promise.
		then(function(result) {
			vm.userStatus = result.status
			vm.newUserStatus = result.status
		})
	}

	function saveStatus() {
		api.setStatus({user:vm.user, status:vm.newUserStatus}).$promise.
		then(function(result) {
			vm.userStatus = result.status
			vm.newUserStatus = result.status
		})
	}

	function updateLocation(which) {
		switch(which) {
			case 'lat':
				vm.location.lat = vm.location.lat + (Math.random() - 0.5)*5
				break;
			case 'lng':
				vm.location.lng = vm.location.lng + (Math.random() - 0.5)*5
		}
		vm.location.$update({user:vm.user})
	}

} ////////////////// end FifthCtrl ///////////////

})()