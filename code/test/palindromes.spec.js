describe('Test Palendromes', function () {
    it('tacocat is a palendrome', function () {
        expect(isPalindrome('tacocat')).toBe(true);
    });

    it('tacodog is not a palendrome', function () {
        expect(isPalindrome('tacodog')).toBe(false);
    });

    it('should throw an exception if not passed a parameter', function () {
        expect(function(){ isPalindrome(); })
            .toThrow(new Error('Invalid Argument'));
    });

    it('should throw an exception if not passed a string', function () {
        expect(function(){ isPalindrome(123); })
            .toThrow(new Error('Invalid Argument'));
    });

    it('should ignore whitespace', function() {
        expect(isPalindrome("taco \t\r\ncat")).toBe(true);
    });

    it('should ignore capitalization', function() {
        expect(isPalindrome("Taco cat")).toBe(true);
    });
});