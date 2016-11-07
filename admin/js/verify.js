var Verify = new Object({
    URL:{
        BASE:"http://localhost:8080/"
    },
    /**
     * 验证码相关
     */
    verifyCode: {
        URL: {
            getVerifyCode: function(){
                return Verify.URL.BASE + "sso/sso/"+Math.random()+"/create";
            }
        },
        Operate: {
            getVerifyCode: function(object){
                object.src=Verify.verifyCode.URL.getVerifyCode();
                object.onclick = function(){
                    object.src=Verify.verifyCode.URL.getVerifyCode();
                }
            }
        }
    }
});