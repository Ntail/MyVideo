$('#password').bind('keyup', function(event) {
    alert(event);
    if (event.keyCode == "13") {
        //回车执行查询
        $('#bt-login').click();
    }
})

function logindo() {
    var username = $("#username").val();
    var password = $("#password").val();
    if(!username || !password){
        var msg = document.getElementById("msg");
        msg.innerText = "用户名或密码不能为空";
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
                window.location = "/";
            } else if (obj.state == -1) {
                $("#showResult").text(obj.message);
            }
        }
    })
}