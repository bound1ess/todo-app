describe("Task", function() {
    var Task;

    beforeEach(module("todo"));

    // Leading and trailing underscores will be stripped away.
    beforeEach(inject(function(_Task_, _$httpBackend_) {
        Task = _Task_;
        $httpBackend = _$httpBackend_;

        $httpBackend
            .expectGET("/public/data/tasks.json")
            .respond(200, JSON.stringify({tasks: []}));

        $httpBackend.flush();
    }));

    describe("#addTask()", function() {
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

});
