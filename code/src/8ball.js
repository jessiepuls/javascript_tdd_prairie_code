var ball = {};
ball.endpoint = 'https://8ball.delegator.com/magic/JSON/';
ball.RESPONSE_READY = 4;
ball.STATUS_OK = 200;

ball.getAnswer = function(question) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState == ball.RESPONSE_READY && request.status == ball.STATUS_OK) {
            var response = JSON.parse(request.responseText);
            ball.setAnswer(response.magic.answer);
            ball.setImage(ball.getImage(response.magic.type))
        }
    };

    request.open("GET", this.endpoint + encodeURIComponent(question), true);
    request.send();
};

ball.setAnswer = function(answer) {
    $('#answer').html(answer);
};

ball.setImage = function(image) {
    $('#image').html('<img src="' + image + '"/>')
};

ball.getImage = function(type) {
    if(type == 'Affirmative') return 'yes.gif';
    if(type == 'Contrary') return 'no.gif';
    if(type == 'Neutral') return 'maybe.gif';
    return '';
};