;(function() {
'use strict'

angular.module('tabApp', ['ngRoute'])
	.controller('MainCtrl', MainCtrl)	
	.controller('FirstCtrl', FirstCtrl)
	.controller('SecondCtrl', SecondCtrl)
	.config(config)
	;

function config($routeProvider) {
	$routeProvider
	.when('/firstTab', {
		templateUrl: 'tabOne.html',
		controller: 'FirstCtrl',
		controllerAs: 'vm'
	})

	.when('/secondTab', {
		templateUrl: 'tabTwo.html',
		controller: 'SecondCtrl',
		controllerAs: 'vm'
	})

	.otherwise({
		redirectTo: '/firstTab'
	})
}

MainCtrl.$inject = ['$scope', '$location']
function MainCtrl($scope, $location) {
	var vm = this
	vm.tab = { }
	vm.name = 'Main Page'	

	vm.getLocation = function() {
		return $location.path()
	}
}

function FirstCtrl() {
	var vm = this
	vm.name = 'First Tab'	
}

function SecondCtrl() {
	var vm = this

	vm.name = 'Second Tab'
	vm.box = { 'third' : true  }
}


})()
