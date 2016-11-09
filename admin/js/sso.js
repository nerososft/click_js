var Sso = new Object({
    URL:{
        BASE:"http://localhost:8084/"
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
                    $("#tip").html(data.msg);
                    console.log(data);
                });
            }
        }
    }
});