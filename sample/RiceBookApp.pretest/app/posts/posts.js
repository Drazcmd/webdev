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
}

})();