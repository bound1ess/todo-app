(function() {
    var todo = angular.module("todo", []);

    todo.service("Task", ["$rootScope", function($rootScope) {
        var service = {
            tasks: [],
            
            addTask: function(task) {
                service.tasks.push(task);
                $rootScope.$broadcast("tasks.update");
            }
        };

        return service;
    }]);
})();
