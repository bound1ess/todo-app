(function() {
    var todo = angular.module("todo", []);

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
})();
