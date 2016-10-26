describe('magic 8 ball', function() {
    beforeEach(function () {
        jasmine.Ajax.install();
        spyOn(ball, 'setImage');
        spyOn(ball, 'setAnswer');
    });
    
    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    describe('.getAnswer', function() {
        it('send a GET request to the correct endpoint', function () {
            var question = 'blahblahblah';
            ball.getAnswer(question);
            expect(jasmine.Ajax.requests.mostRecent().method).toBe('GET');
            expect(jasmine.Ajax.requests.mostRecent().url).toBe(ball.endpoint + question);
        });

        it("should set the answer text on success", function() {
            ball.getAnswer('question');

            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 200,
                'contentType': 'application/json',
                'responseText': '{"magic": {"question": "your question", "answer": "your answer", "type":"Affirmative"}}'
            });

            expect(ball.setAnswer).toHaveBeenCalledWith("your answer");
        });

        it("should show the yes image for affirmative answers", function() {
            ball.getAnswer('question');

            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 200,
                'contentType': 'application/json',
                'responseText': '{"magic": {"question": "your question", "answer": "your answer", "type":"Affirmative"}}'
            });

            expect(ball.setImage).toHaveBeenCalledWith('yes.gif');
        });

        it("should show the no image for contrary answers", function() {
            ball.getAnswer('question');

            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 200,
                'contentType': 'application/json',
                'responseText': '{"magic": {"question": "your question", "answer": "your answer", "type":"Contrary"}}'
            });

            expect(ball.setImage).toHaveBeenCalledWith('no.gif');
        });

        it("should show the maybe image for neutral answers", function() {
            ball.getAnswer('question');

            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 200,
                'contentType': 'application/json',
                'responseText': '{"magic": {"question": "your question", "answer": "your answer", "type":"Neutral"}}'
            });

            expect(ball.setImage).toHaveBeenCalledWith('maybe.gif');
        });
    });
});