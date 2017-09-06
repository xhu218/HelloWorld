function a() {
    var x = (time = null ? 100 : 100)
    console.log(x)
}

setTimeout(a(),5000);
//a()
setInterval(a(),5000);

