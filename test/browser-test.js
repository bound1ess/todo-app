describe("ToDo application", function() {
    var Task, controller, scope;
    var $httpBackend, $compile;

    beforeEach(module("todo"));

    // Leading and trailing underscores will be stripped away.
    beforeEach(inject(function(_Task_, _$httpBackend_, _$compile_, $controller, $rootScope) {
        Task = _Task_;

        $httpBackend = _$httpBackend_;
        $compile = _$compile_;

        controller = $controller("TasksController", {
            $scope: (scope = $rootScope.$new())
        });

        $httpBackend
            .expectGET("/public/data/tasks.json")
            .respond(200, JSON.stringify({tasks: []}));

        $httpBackend.flush();
    }));

    describe("Task service", function() {
        it("adds a task", function() {
            expect(Task.tasks).to.be.empty();

            $httpBackend
                .expectPOST("/tasks/add", {
                    id: 1,
                    body: "Sample task",
                    isCompleted: false
                })
                .respond(200, "OK");

            Task.addTask("Sample task");

            $httpBackend.flush();

            expect(Task.tasks).to.not.be.empty();
            expect(Task.tasks).to.have.length(1);

            expect(Task.tasks[0]).to.be.an("object");

            expect(Task.tasks[0].id).to.equal(1);
            expect(Task.tasks[0].body).to.equal("Sample task");
            expect(Task.tasks[0].isCompleted).to.be.false();
        });
    });

    describe("Tasks controller", function() {
        it("sets proper scope values", function() {
            expect(scope.tasks).to.be.an("array");
            expect(scope.tasks).to.be.empty();

            expect(scope.newTask).to.be.a("string");
            expect(scope.newTask).to.be.empty();
        });

        it("adds a task (delegated to the Task service)", function() {
            scope.newTask = "Sample task";

            $httpBackend
                .expectPOST("/tasks/add", {
                    id: 1,
                    body: "Sample task",
                    isCompleted: false
                })
                .respond(200, "OK");

            scope.addTask();

            $httpBackend.flush();

            expect(scope.newTask).to.be.empty();
        });

        it("updates a task's state (delegated to the Task service)", function() {
            $httpBackend
                .expectPOST("/tasks/update", {
                    id: 1
                })
                .respond(200, "OK");

            scope.onTaskChange(1);

            $httpBackend.flush();
        });
    });

    describe("Task directive", function() {
        it("builds a proper view", function() {
            var element;

            scope.tasks.push({
                id: 1,
                body: "Sample task",
                isCompleted: false
            });

            $httpBackend
                .expectGET("/public/task.html")
                .respond(200, "<li>{{task.body}}</li>");

            element = $compile("<task ng-repeat=\"task in tasks\"></task>")(scope);
            scope.$digest();

            $httpBackend.flush();
        });
    });

    describe("NewTask directive", function() {
        it("builds a proper view", function() {
            var element;

            $httpBackend
                .expectGET("/public/new-task.html")
                .respond(200, "<li>{{newTask}}</li>");

            element = $compile("<new-task></new-task>")(scope);

            $httpBackend.flush();
        });
    });
});
