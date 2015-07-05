(function(angular) {
    'use strict';
    
    angular
    .module('CoursePageApp', ['ngRoute', 'ngAnimate'])
    .config(config)
    .service('JsonDataService', JsonDataService)
    
    .controller('MainCtrl', MainCtrl)
    .controller('AssignmentCtrl', AssignmentCtrl)
    .controller('ScheduleCtrl', ScheduleCtrl)
    
    ;
    
    function config($routeProvider, $locationProvider) {
        $routeProvider
        
        .when('/assignments', {
            templateUrl: 'views/assignments.html',
            controller: 'AssignmentCtrl',
            controllerAs: 'vm'
        })
        
        .when('/assignments/:assignmentId', {
            templateUrl: 'views/assignments.html',
            controller: 'AssignmentCtrl',
            controllerAs: 'vm'
        })
        
        .when('/schedule', {
            templateUrl: 'views/schedule.html',
            controller: 'ScheduleCtrl',
            controllerAs: 'vm'
        })
        
        .when('/resources', {
            templateUrl: 'views/resources.html',
        })
        
        .otherwise({
            templateUrl: 'views/main.html'
        })

    //$locationProvider.html5Mode(true);
    }
    
    AssignmentCtrl.$inject = ['$routeParams', '$timeout', 'JsonDataService']
    function AssignmentCtrl($routeParams, $timeout, JsonDataService) {
        var vm = this;
        vm.name = "AssignmentCtrl";
        vm.params = $routeParams;
        vm.srv = JsonDataService;
        vm.setAssignment = setAssignment;
        vm.assignmentName = null;
        vm.assignmentDue = null;
        vm.assignmentId = null;
        
        function setAssignment(id) {
            var a = vm.srv.getAssignment(id);
            if (a == undefined) {
                id = 'simple';
                a = vm.srv.getAssignment(id);
            }
            if (a != null) {
                vm.assignmentName = a.name;
                vm.assignmentDue = a.due;
                vm.assignmentId = id;
            }
        }
        $timeout(function() {
            setAssignment($routeParams.assignmentId);
        }, 100);
    }
    
    MainCtrl.$inject = ['$route', '$routeParams', '$location']
    function MainCtrl($route, $routeParams, $location) {
        var vm = this;
        vm.$route = $route;
        vm.$location = $location;
        vm.$routeParams = $routeParams;
        vm.lastUpdated = "7/3/2015"
        vm.term = "Fall 2015"
    }
    
    ScheduleCtrl.$inject = ['$route', '$routeParams', '$location', 'JsonDataService']
    function ScheduleCtrl($route, $routeParams, $location, JsonDataService) {
        var vm = this;
        vm.sessions = JsonDataService.sessions;
        vm.getDueDate = JsonDataService.getDueDate;
    }
    
    function JsonDataService($http) {
        
        var srv = this;
        srv.firstDayOfClass = moment("2015-08-25")
        srv.sessions = []
        srv.assignments = {}
        
        srv.getDueDate = function(sessionDay) {
            var week = Math.floor((sessionDay - 1) / 2);
            var dow = (sessionDay - 1) - 2 * week;
            return moment(srv.firstDayOfClass)
            .add(week, 'weeks').add(dow * 2, 'days')
            .format("ddd MM/DD")
        }
        
        srv.getAssignment = function(id) {
            return srv.assignments[id];
        }
        
        $http.get('planning.json').success(function(data) {
            srv.sessions.length = 0;
            angular.forEach(data.sessions, function(row) {
                srv.sessions.push(row);
                for (var i = 0; i < data.assignments.length; ++i) {
                    var assignment = data.assignments[i];
                    if (assignment.due == row.day) {
                        row.assignment = assignment;
                        srv.assignments[assignment.id] = assignment;
                    }
                }
            });
        });
    }

})(window.angular);
