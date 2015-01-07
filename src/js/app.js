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
        });

        return service;
    }]);

    todo.controller("TasksController", ["$scope", "Task", function($scope, task) {
        $scope.$on("tasks.update", function(event) {
            $scope.tasks = task.tasks; 
            console.log($scope.tasks.length);
        });

        $scope.tasks = task.tasks;
        console.log($scope.tasks.length);
    }]);
})();
