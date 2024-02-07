basemethod = {
    sayhello: function() {
        return "hello";
    },
    trim: function(str) {　　 return str.replace(/(^\s*)|(\s*$)/g, "");　　 },
    ltrim: function(str) {　　
        return str.replace(/(^\s*)/g, "");　　
    },
    rtrim: function(str) {　　
        return str.replace(/(\s*$)/g, "");　
    },
    filter: function(str) {
        //\, /, :, *, ?, ", <, >, |
        return str.replace(/\\/g, "")
            .replace(/\//g, "")
            .replace(/\:/g, "")
            .replace(/\*/g, "")
            .replace(/\?/g, "")
            .replace(/\"/g, "")
            .replace(/\</g, "")
            .replace(/\>/g, "")
            .replace(/\r/g,"");
    }


}

module.exports = basemethod;