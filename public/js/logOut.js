let btn = document.getElementById("logOut");

btn.onclick = () => {
    function setCookie(cname, cvalue, exMins) {
        var d = new Date();
        d.setTime(d.getTime() + (exMins*60*1000));
        var expires = "expires="+d.toUTCString();  
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    setCookie('user','',0);
    setCookie('save','',0);
    window.location.replace("/");
}