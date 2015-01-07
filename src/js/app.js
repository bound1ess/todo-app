(function() {
    var todo = angular.module("todo", []);

    todo.config(function($sceProvider) {
        // Since this project is NOT meant to be used in production.
        $sceProvider.enabled(false);
    });

    todo.service("Task", ["$rootScope", "$http", function($rootScope, $http) {
        var service = {
            tasks: [],
            
            addTask: function(task) {
                service.tasks.push(task);
                $rootScope.$broadcast("tasks.update");
            }
        };

        $http.get("/data/tasks.json").success(function(data) {
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
    }]);

    todo.directive("task", function() {
        return {
            restrict: "E",
            templateUrl: "/task.html",
            replace: true
        };
    });

    todo.directive("taskCheckbox", function($compile) {
        return {
            restrict: "E",
            template: "<input type=checkbox>",
            replace: true
        };
    });
})();
