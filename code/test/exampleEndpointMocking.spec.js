var ws = {};
ws.endpoint = "https://example.com/";
ws.RESPONSE_READY = 4;
ws.STATUS_OK = 200;

ws.exampleEndpointCall = function (someArgument) {
    var request = new XMLHttpRequest();
    request.open("GET", this.endpoint + encodeURIComponent(someArgument));

    request.onreadystatechange = function () {
        if (request.readyState == ws.RESPONSE_READY && request.status == ws.STATUS_OK) {
            var response = JSON.parse(request.responseText);
            ws.setValue(response.data.someProperty);
        }
    };

    request.send();
};

ws.setValue = function(value) {
    // do whatever you need to do here
};

describe('Example endpoint test', function () {
    beforeEach(function () {
        jasmine.Ajax.install();
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    it('send a GET request to the correct endpoint', function () {
        ws.exampleEndpointCall('something');
        expect(jasmine.Ajax.requests.mostRecent().method).toBe('GET');
        expect(jasmine.Ajax.requests.mostRecent().url).toBe(ws.endpoint + 'something');
    });

    describe('Successful requests', function () {
        it("should set the value on success", function() {
            spyOn(ws, 'setValue');
            ws.exampleEndpointCall('something');

            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 200,
                'contentType': 'application/json',
                'responseText': '{"data": {"someProperty": "someValue"}}'
            });

            expect(ws.setValue).toHaveBeenCalledWith('someValue');
        });
    });

    describe('Bad ready state', function() {
        it("should set the value on success", function() {
            spyOn(ws, 'setValue');
            ws.exampleEndpointCall('something');

            // The ready state changes once we make the endpoint call, but it won't be finished until we
            // send a response, so we want to make sure we're not setting our value until it's done
            expect(ws.setValue).not.toHaveBeenCalled();
        });
    });

    describe('Errors', function() {
        it('should not set the value if the response is not ready', function() {
            spyOn(ws, 'setValue');
            ws.exampleEndpointCall('something');

            jasmine.Ajax.requests.mostRecent().respondWith({
                'status': 500
            });

            expect(ws.setValue).not.toHaveBeenCalled();
        });
    });
});