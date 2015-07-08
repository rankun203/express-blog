/**
 * App.js
 * @author rankun203 <rankun203@gmail.com>
 */

var app = (function () {

    /**
     * Services
     */
    angular.module("xmpl.service", [])
        .factory('todoService', ['$resource', function ($resource) {
            return $resource('/todos/:id', null,
                {
                    'update': {method: 'PUT'}
                }
            );
        }]);

    /**
     * Module xmpl
     */
    angular.module('xmpl',
        [
            'ngRoute',
            'ngResource',
            'xmpl.service'
        ]
    )
    /**
     * Controller Configurations
     */
        .controller('XmplTodoController', ['$scope', 'todoService',
            function ($scope, todoService) {
                $scope.editing = [];
                $scope.todos = todoService.query();

                /** Create todo */
                $scope.save = function () {
                    if (!$scope.newTodo || $scope.newTodo.length < 1) return;

                    var todo = new todoService({name: $scope.newTodo, completed: false});
                    todo.$save(function () {
                        $scope.todos.push(todo);
                        $scope.newTodo = '';
                    });
                };

                /** Delete todo */
                $scope.delete = function (index) {
                    var todo = $scope.todos[index];
                    todoService.delete({id: todo._id});

                    if (index <= $scope.todos.length)
                        $scope.todos.splice(index, 1);
                };

                /** Update todo */
                $scope.update = function (index) {
                    var todo = $scope.todos[index];
                    todoService.update({id: todo._id}, todo);
                    $scope.editing[index] = false;
                };

                /** Edit todo */
                $scope.edit = function (index) {
                    $scope.editing[index] = angular.copy($scope.todos[index]);
                };

                /** Cancel Editing todo */
                $scope.cancel = function (index) {
                    $scope.todos[index] = angular.copy($scope.editing[index]);
                    $scope.editing[index] = false;
                };
            }])
        .controller('XmplTodoDetailController', ['$scope', '$routeParams', 'todoService',
            function ($scope, $routeParams, todoService) {
                $scope.todo = todoService.get({id: $routeParams.id});
                $scope.editing = [];

                /** Update todo */
                $scope.update = function (todo, id) {
                    todoService.update({id: id}, todo);

                    var editing = $scope.editing.indexOf(id);
                    if (editing >= 0) {
                        $scope.editing.splice(editing, 1);
                    }
                };

                $scope.edit = function (todoId) {
                    $scope.editing.push(todoId);
                };

                $scope.cancel = function (todoId) {
                    var editing = $scope.editing.indexOf(todoId);
                    if (editing >= 0) {
                        $scope.editing.splice(editing, 1);
                    }
                };
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
