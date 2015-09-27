;(function() {
'use strict'

angular.module('tabApp')
	.controller('PageCtrl', PageCtrl)
	.controller('DirectiveCtrl', DirectiveCtrl)
	.directive('myCustom', myCustom)
	;

function myCustom() {
	return {
		restrict: 'EA',
		controller: 'DirectiveCtrl',
		controllerAs: 'dvm',
		templateUrl: 'directive/directive.html',
		link: function(scope, elem, attrs) {
			console.log('directive loaded')
		},
		replace: true
	}
}

function PageCtrl() {
	var vm = this;
	vm.name = 'Page Controller'
}

DirectiveCtrl.$inject = ['$scope']
function DirectiveCtrl($scope) {
	var vm = this;
	vm.name = 'Directive Controller'
}

})()