(function() {
'use strict'
angular.module('riceBookApp')
	.controller('PostCtrl', PostCtrl);

function PostCtrl() {
	var vm = this;

	vm.posts = [ 
		{'id':1, 'title':'the first', 'body':'message' },
		{'id':2, 'title':'the second', 'body':'lorem ipsum'},
		{'id':3, 'title':'the third', 'body':'e plurbus unum'},
	]

	vm.removePost = function(postId) {		
		var len = vm.posts.length;
		var index = vm.posts.findIndex(function(post) {
			return post.id === postId
		})
		if (index >= 0) {
			vm.posts.splice(index, 1)	
		}
	}

	vm.addPost = function() {
		var post = {
			'id': vm.posts.length,
			'title': vm.post_title,
			'body': vm.post_body
		}
		vm.posts.push(post)
		vm.post_title=''
		vm.post_body=''
	}

}

})();