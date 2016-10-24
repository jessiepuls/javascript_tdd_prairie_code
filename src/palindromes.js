String.prototype.reverse = function() {
    return this.split('').reverse().join('');
};

String.prototype.removeWhitespace = function() {
    return this.replace(/\s/g, '')
};

String.prototype.equalsIgnoreCase = function(str) {
    return this.toLocaleLowerCase() == str.toLowerCase();
};

String.prototype.isPalindrome = function() {
    return this.removeWhitespace()
                .reverse()
                .equalsIgnoreCase(this.removeWhitespace());
};

var isPalindrome = function(inputString) {
    if(typeof inputString != 'string') {
        throw new Error('Invalid Argument');
    }

    return inputString.isPalindrome()
};