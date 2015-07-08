var app = (function () {

    /**
     * Services
     */
    angular.module("xmpl.service", [])
        .factory('todoService', ['$resource', function ($resource) {
            return $resource('/todos/:id');
        }]);

    /**
     * Module xmpl
     */
    angular.module('xmpl'
        , [
            'ngRoute',
            'ngResource',
            'xmpl.service'
        ])
    /**
     * Controller Configurations
     */
        .controller('XmplTodoController', ['$scope', 'todoService', '$http',
            function ($scope, todoService, $http) {
                $scope.todos = todoService.query();

                $http({method: 'GET', url: '/todos'})
                    .success(function (data, status, headers, config) {
                        console.log('todos: ', data);
                    })
                    .error(function (data, status, headers, config) {
                        console.log('error: ', data);
                    });
            }])
        .controller('XmplTodoDetailController', ['$scope', '$routeParams', 'todoService',
            function ($scope, $routeParams, todoService) {
                $scope.todo = todoService.get({id: $routeParams.id});
            }])
    /**
     * Router configurations
     */
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .otherwise({
                    templateUrl: 'partials/todos.html',
                    controller: 'XmplTodoController'
                })
                .when('/:id', {
                    templateUrl: 'partials/todoDetail.html',
                    controller: 'XmplTodoDetailController'
                });
        }]);
}).call(this);
