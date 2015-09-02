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
        vm.rubric = null;
        vm.url = null;
        vm.showRubric = false;

        vm.computeTotalPoints = function(items) {
            return items.map(function(item) { return item.pts })
                        .reduce(function(l,r) { return l + r })
        }

        vm.getTotalPoints = function() {
            if (vm.rubric)
                return vm.computeTotalPoints(
                    vm.rubric.map(function(sec) { return sec.items })
                        .reduce(function(l,r) { return l.concat(r) })
                    )
            else
                return 0;
        }

        console.log('loaded up with ', vm.params)
        
        function setAssignment(id) {
            if (!id) {
                vm.assignmentName = 'General Info';
                vm.assignmentDue = undefined;
                vm.assignmentId = undefined;
                vm.url = undefined;
                vm.rubric = undefined;
                return;
            }
            var a = vm.srv.getAssignment(id);
            if (a == undefined) {
                id = 'simple';
                a = vm.srv.getAssignment(id);
            }
            if (a != null) {
                vm.assignmentName = a.name;
                vm.assignmentDue = a.due;
                vm.assignmentId = id;
                vm.url = 'views/assignments/' + id + '.html';
                vm.rubric = a.rubric;
                vm.showRubric = false;
            }
        }
        $timeout(function() {
            setAssignment($routeParams.assignmentId);
        }, 200);

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

        var getRubric = function(assignment) {
        }

        $http.get('planning.json').success(function(data) {
            srv.sessions.length = 0;
            angular.forEach(data.sessions, function(row) {
                srv.sessions.push(row);                
                for (var i = 0; i < data.assignments.length; ++i) {
                    var assignment = data.assignments[i];
                    if (assignment.due == row.day) {
                        row.assignment = assignment;
                        row.assignment.hwid = i + 1;
                        srv.assignments[assignment.id] = assignment;
                        $http.get('data/rubric-'+assignment.id+'.json')
                             .success(function(data) {
                                row.assignment.rubric = data;
                            });
                    }
                }
            });
        });

    }
})(window.angular);
