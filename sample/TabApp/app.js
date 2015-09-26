(function() {
'use strict'

angular.module('tabApp', ['ngRoute'])	
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

	//$locationProvider.html5Mode(true)
}

function FirstCtrl() {
	var vm = this
	vm.name = 'First Tab'
}

function SecondCtrl() {
	var vm = this
	vm.name = 'Second Tab'
}


})();
