(function() {
    // Create a new Angular module called "todo".
    var todo = angular.module("todo", []);

    // Create a new service "Task" that will manage, well, tasks.
    todo.service("Task", ["$rootScope", "$http", function($rootScope, $http) {
        var service = {
            tasks: [],
            
            addTask: function(taskBody) {
                // Set all fields with proper values.
                var task = {
                    id: service.tasks.length + 1,
                    body: taskBody,
                    isCompleted: false,
                };

                service.tasks.push(task);
                // Tell Angular that something has changed.
                $rootScope.$broadcast("tasks.update");

                // Perform an AJAX POST request.
                $http({
                    url: "/tasks/add",
                    method: "post",
                    data: task
                }).error(function() {
                    console.log("Was unable to send the task to the server!");
                });
            },

            onChange: function(id) {
                // Perform an AJAX POST request.
                $http({
                    url: "/tasks/update",
                    method: "post",
                    data: {
                        id: id
                    }
                }).error(function() {
                    console.log("Could not update the task's state!");
                });
            }
        };
    
        // Perform an AJAX GET request.
        $http.get("/public/data/tasks.json").success(function(data) {
            service.tasks = data.tasks;
            // Tell Angular that something has changed.
            $rootScope.$broadcast("tasks.update");
        }).error(function() {
            alert("Something went terribly wrong!");
        });

        return service;
    }]);

    // Create a new controller for tasks.
    todo.controller("TasksController", ["$scope", "Task", function($scope, Task) {
        // Every time the Task service gets updated, update the $scope.
        $scope.$on("tasks.update", function() {
            $scope.tasks = Task.tasks;
        });

        $scope.tasks = Task.tasks;
        $scope.newTask = "";

        // Delegate to the service, clear the textarea field (newTask is bound via ng-model).
        $scope.addTask = function() {
            Task.addTask($scope.newTask);
            $scope.newTask = "";
        };

        // Delegate to the service.
        $scope.onTaskChange = function(id) {
            Task.onChange(id);
        };
    }]);

    // Create a new directive called "task".
    todo.directive("task", function() {
        // Restrict its usage to element (HTML tag) and replace the tag with the template.
        return {
            restrict: "E",
            templateUrl: "/public/task.html",
            replace: true
        };
    });

    // Create a new directive called "newTask".
    todo.directive("newTask", function() {
        // Same as above.
        return {
            restrict: "E",
            templateUrl: "/public/new-task.html",
            replace: true
        };
    });
})();
