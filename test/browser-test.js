describe("Task", function() {
    var Task;

    beforeEach(module("todo"));

    // Leading and trailing underscores will be stripped away.
    beforeEach(inject(function(_Task_) {
        Task = _Task_;
    }));

    describe("#addTask()", function() {
        it("adds a task", function() {
            expect(Task.tasks).to.be.empty();

            Task.addTask("Sample task");
            
            expect(Task.tasks).to.not.be.empty();
            expect(Task.tasks).to.have.length(1);

            expect(Task.tasks[0]).to.be.an("object");
            
            expect(Task.tasks[0].id).to.equal(1);
            expect(Task.tasks[0].body).to.equal("Sample task");
            expect(Task.tasks[0].isCompleted).to.be.false();
        }); 
    });

});
