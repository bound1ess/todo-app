(function() {
    var todo = angular.module("todo", []);

    todo.service("Task", ["$rootScope", "$http", function($rootScope, $http) {
        var service = {
            tasks: [],
            
            addTask: function(taskBody) {
                var task = {
                    id: service.tasks.length + 1,
                    body: taskBody,
                    isCompleted: false,
                };

                service.tasks.push(task);
                $rootScope.$broadcast("tasks.update");

                $http({
                    url: window.location.href + "tasks/add",
                    method: "post",
                    data: task
                }).error(function() {
                    console.log("Was unable to send the task to the server!");
                });
            },

            onChange: function(id) {
                $http({
                    url: window.location.href + "tasks/update",
                    method: "post",
                    data: {
                        id: id
                    }
                }).error(function() {
                    console.log("Could not update the task's state!");
                });
            }
        };

        $http.get("/public/data/tasks.json").success(function(data) {
            service.tasks = data.tasks;
            $rootScope.$broadcast("tasks.update");
        }).error(function() {
            alert("Something went terribly wrong!");
        });

        return service;
    }]);

    todo.controller("TasksController", ["$scope", "Task", function($scope, Task) {
        $scope.$on("tasks.update", function() {
            $scope.tasks = Task.tasks;
        });

        $scope.tasks = Task.tasks;
        $scope.newTask = "";

        $scope.addTask = function() {
            Task.addTask($scope.newTask);
            $scope.newTask = "";
        };

        $scope.onTaskChange = function(id) {
            Task.onChange(id);
        };
    }]);

    todo.directive("task", function() {
        return {
            restrict: "E",
            templateUrl: "/public/task.html",
            replace: true
        };
    });

    todo.directive("newTask", function() {
        return {
            restrict: "E",
            templateUrl: "/public/new-task.html",
            replace: true
        };
    });
})();
