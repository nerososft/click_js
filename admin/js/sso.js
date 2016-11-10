var Sso = new Object({
    URL:{
        BASE:"http://localhost:8080/"
    },
    /**
     * 验证码相关
     */
    login: {
        URL: {
            login: function(email,password,code){
                return Sso.URL.BASE + "sso/sso/"+email+"/"+password+"/"+code+"/auth";
            }
        },
        Operate: {
            login: function(email,password,code){
                var url = Sso.login.URL.login(email,password,code);
                console.log(url);
                $.get(url,{},function(data,status){
                    if(status){
                        console.log(data);
                        if(!data.state){
                            $("#tip").html(data.msg);
                        }else{
                            console.log(data.data.id+"--"+data.data.token);
                            $.cookie('uid', data.data.id, { expires: 7 ,path:"/"}); // 存储一个带7天期限的 cookie
                            $.cookie('token', data.data.token, { expires: 7 ,path:"/"});
                            var a = $.cookie("uid");
                            //console.log(a+"--"+$.cookie("token"));
                            window.location.href="index.html";
                        }
                    }
                });
            }
        }
    }
});