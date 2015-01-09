(function() {
    var todo = angular.module("todo", []);

    todo.service("Task", ["$rootScope", "$http", function($rootScope, $http) {
        var service = {
            tasks: [],
            
            addTask: function(task) {
                service.tasks.push(task);
                $rootScope.$broadcast("tasks.update");

                $http({
                    url: "/tasks/add",
                    method: "POST",
                    data: task
                }).error(function() {
                    console.log("Was unable to send the task to the server!");
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
            Task.addTask({body: $scope.newTask, isCompleted: false});
            $scope.newTask = "";
        };

        $scope.changeTaskState = function(index) {
            $scope.tasks[index].isCompleted = !$scope.tasks[index].isCompleted;
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
