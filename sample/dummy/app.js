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
			
			getPosts : { method: 'GET' , params: {endpoint: 'posts'   } },
			addPostFull  : { method: 'POST', 
				headers:{'Content-Type': undefined},
				transformRequest: resourceUploadFile, 
				params: {endpoint: 'post'    } 
			},
			addPost  : { method: 'POST', params: {endpoint: 'post'    } },
			updatePost: { method: 'PUT', params: {endpoint: 'posts' } },

			getPicture : { method: 'GET' , params: {endpoint: 'picture' } },
			uploadPicture : { method: 'PUT', 
				headers:{'Content-Type': undefined},
				transformRequest: resourceUploadFile, 
				params: {endpoint: 'picture' } 
			},

            getOnePost: { method: 'GET', params: { endpoint: 'posts' } }
		})
}

function resourceUploadFile(data) {
	if (!data) {
		return data
	}	
	var fd = new FormData()	
	fd.append('image', data.img)
	fd.append('body', data.body)
	return fd;
}

DummyCtrl.$inject = ['api', '$scope', 'apiURL']
function DummyCtrl(api, $scope, apiURL) {
	var vm = this;
	vm.iam = null;
	vm.posts = []
	vm.login = login
	vm.logout = logout
	vm.loadPosts = loadPosts
	vm.removePost = removePost
	vm.setFile = setFile
	vm.uploadFile = uploadFile
	vm.profilePicture = null
	vm.makePost = makePost
    vm.getOnePost = getOnePost
    vm.getStatus = getStatus
    vm.updateStatus = updateStatus
    vm.status = "?"
    vm.facebookLogin = facebookLogin
    vm.googleLogin = googleLogin
    vm.message = null

   getStatus()    

	function logout() {
		api.logout()
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

	function removePost(id) {		
		var idx = -1
		for (var ii = 0; ii < vm.posts.length; ++ii) {
			if (vm.posts[ii].id == id) {
				idx = ii
				break;
			}
		}
		if (idx >= 0)
			vm.posts.splice(idx, idx+1)
	}

	function setFile(member, element) {		
		vm[member] = element.files[0]		
		$scope.$apply()
	}

	function uploadFile() {
		api.uploadPicture({ img: vm.file }, function(result) {
			if (result.status == "OK") {
				vm.profilePicture = api.getPicture({user:vm.iam})
			} else {
				console.log('ERROR in upload')
			}
		})
	}

	function makePost() {		
		api.addPost({ body: vm.postBody, img: vm.postImage }).$promise.then(function(result) {
			console.log('got it', result)
			vm.posts.unshift(result.posts[0])
			vm.postBody = ''
			vm.postImage = undefined
		})
	}

    function getOnePost(postId) {
         api.getOnePost({ id: postId }).$promise.then(function(result) {
              console.log('got', result)
         })

         // now update it
         api.updatePost({ id: postId }, { body: 'this is a new body' }).$promise.then(function(result) {
         	console.log('got', result)
         })

         // now update it
         api.updatePost({ id: postId }, { commentId: 9991838, body: 'this is an edited comment' }).$promise.then(function(result) {
         	console.log('got', result)
         })

    }

    function getStatus() {
    	api.getStatus().$promise.then(function(result) {
    		vm.status = result.statuses[0].status
			vm.iam = result.statuses[0].username
			vm.profilePicture = api.getPicture({user:vm.iam})
    	})
    }

    function updateStatus() {
    	api.setStatus({status: vm.status }).$promise.then(function(result) {
    		vm.status = result.status
    	})
    }

}


})()
