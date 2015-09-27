(function() {
'use strict'

angular.module('riceBookApp')
	.controller('UserCtrl', UserCtrl);

function UserCtrl() {
	var vm = this;
	vm.status = "This is RiceBook"
}

})();
