function loadObj(){
    var cc=eval('('+aMess+')');
    document.getElementById('mess').textContent=cc.message;
}

if(window.location.hash.indexOf('message')==-1)
    var aMess="({\"message\":\"Hello User!\"})";
else
    var aMess=location.hash.substr(window.location.hash.indexOf('message=')+8);

(function redirect_expired() {
    $j.get('/app/ExpiredSession', function (resp) {
        if (resp && resp.redirectTo) {
            window.location.href = resp.redirectTo;
        }
    });
    setInterval(redirect_expired, 60 * 1000);
})();





