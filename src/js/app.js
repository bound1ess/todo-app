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

        $scope.newTask = "";

        $scope.addTask = function() {
            Task.addTask({body: $scope.newTask, is_completed: false});
            $scope.newTask = "";
        };
    }]);

    todo.directive("task", function() {
        return {
            restrict: "E",
            templateUrl: "/task.html",
            replace: true
        };
    });

    todo.directive("newTask", function() {
        return {
            restrict: "E",
            template: "<li ng-show=\"newTask.length\" class=\"task task-uncompleted\">"
                + "{{ newTask }}<input type=\"checkbox\"></li>",
            replace: true
        };
    });
})();
