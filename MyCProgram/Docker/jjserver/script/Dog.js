module.exports = function (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = function () { 
        return this.firstName + ' ' + this.lastName;
    }
    this.speak = function(){
    	console.log("wang wang ,i am a dog");
    }
}

