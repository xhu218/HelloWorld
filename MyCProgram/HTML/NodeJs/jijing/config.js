module.exports = {
    //邮件配置
    email: {

        service: 'Hotmail',
        user: 'xhu218@hotmail.com',
        pass: 'Pass2word321'

        /*
         service: '163', //OK
            user: 'xhu218@163.com',
            pass: 'Pass2word163'
            */
    },
    config: {
        //basepath: __dirname
        //basepath: '/private/var/root/Documents/GitHub/HelloWorld/MyCProgram/HTML/JQuery/jijing'
        basepath :'E:\\Work\\HelloWorld.git\\trunk\\MyCProgram\\HTML\\JQuery\\jijing'
    },
    Qiniu: {
        bucket: "xhu219", //proc.env.QINIU_TEST_BUCKET;
        accessKey: "5zICAtLUtlGbbMfDB2ucQ9OxyO3zwQTG6I5do11P", //proc.env.QINIU_ACCESS_KEY;
        secretKey: "c2mM0jRfxm9hYDdsbeFqBR4akbMqG8n6TpIl4mE7" //proc.env.QINIU_SECRET_KEY;
    }

}