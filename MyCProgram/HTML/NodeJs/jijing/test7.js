var crypto = require('crypto');

var jijingbase= require("./jijingbase.js")


function decode(cryptkey, iv, secretdata) {
    var
    decipher = crypto.createDecipheriv('aes-256-cbc', cryptkey, iv),
    decoded  = decipher.update(secretdata, 'base64', 'utf8');
 
    decoded += decipher.final( 'utf8' );
    return decoded;
}
 
function encode(cryptkey, iv, cleardata) {
    var
    encipher = crypto.createCipheriv('aes-256-cbc', cryptkey, iv),
    encoded  = encipher.update(cleardata, 'utf8', 'base64');
 
    encoded += encipher.final( 'base64' );
    return encoded;
}
 
var
cryptkey   = crypto.createHash('sha256').update('__tazai_wolf__key').digest(),
iv         = '1234567890000000',
buf        = "http://fundf10.eastmoney.com/ccmx_000149.html",
enc        = encode( cryptkey, iv, buf );
 
var dec        = decode(cryptkey, iv, enc);
 
function b64enc(data) {
    var b   = new Buffer(data, 'binary');
    return b.toString('base64');
}
 
console.warn("Encoded length: ", enc);
console.warn("Decoded all: " + dec);

var str = "wfgw";
 str.replace(/w/g,'l');
console.warn(str);


var content = "http://fund.eastmoney.com/000148.html?spm=search&t=0.9898113955910472";

var str1 = jijingbase.encode(content);
console.log(str1);

var str2 = jijingbase.decode(str1);
console.log(str2)

