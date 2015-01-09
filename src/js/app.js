(function() {
    var todo = angular.module("todo", []);

    todo.service("Task", ["$rootScope", "$http", function($rootScope, $http) {
        var service = {
            tasks: [],
            
            addTask: function(task) {
                service.tasks.push(task);
                $rootScope.$broadcast("tasks.update");

                $http({
                    url: window.location.href + "tasks/add",
                    method: "post",
                    data: {
                        body: task.body
                    }
                }).error(function() {
                    console.log("Was unable to send the task to the server!");
                });
            },

            changeState: function(index) {
                service.tasks[index].isCompleted = !service.tasks[index].isCompleted;
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
            Task.addTask({body: $scope.newTask, isCompleted: false});
            $scope.newTask = "";
        };

        $scope.changeTaskState = function(index) {
            Task.changeState(index);
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
