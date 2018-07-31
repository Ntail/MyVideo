function checkInfo(){
    var username = document.getElementById("usn");
    var password = document.getElementById("pws");
    if(username || password){
        var msg = document.getElementById("msg");
        msg.innerText = "用户名或密码不能为空";
        return;
    }

}

function logindo() {
    var username = $("#usn").val();
    var password = $("#pws").val();
    if(!username || !password){
        // var msg = $("#msg").val();
        $("#msg").val() = "用户名或密码不能为空";
        return;
    }
    //读取用户的输入——表单序列化
    var data = $('#login-form').serialize();
    //异步提交请求，进行验证
    $.ajax({
        "url":"./login.do",
        "type":"POST",
        "data":data,
        "datatype":"json",
        "success":function(obj) {
            if (obj.state == 1) {
                saveCookie();
                window.location = "./index";
            } else if (obj.state == -1) {
                alert(obj.message);
                $("#showResult").text(obj.message);
            }
        }
    })
}