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
        }); 
    });

});
