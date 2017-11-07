var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');


var felixemail = {

    config: [{
            service: '163', //OK
            user: 'xhu218@163.com',
            pass: 'Pass2word163'
        },
        {
            service: 'Hotmail',//NG
            user: 'xhu218@hotmail.com',
            pass: 'Pass2word321'
        },
        {
            service: 'Gmail', //NG
            user: 'xhu218@gmail.com',
            pass: 'Pass2wordgmail'
        },
        {
            service: 'QQ',//NG
            user: '67438964@qq.com',
            pass: 'Pass2word321'
        },
        {
            service: '139',//NG
            user: '13548180218@139.com',
            pass: 'Pass2word139'
        }

    ],


    init: function() {

        console.log("init...");

        var index = Math.floor(Math.random() * (0, this.config.length - 1) + 0);
        index = 0;
        sender = this.config[index];

        smtpTransport = nodemailer.createTransport(smtpTransport({
            service: this.config[index].service,
            auth: {
                user: this.config[index].user,
                pass: this.config[index].pass
            }
        }));

    },

    sender: {},



    sendMail: function(recipient, subject, html) {

        smtpTransport.sendMail({

            from: sender.user,
            to: recipient,
            subject: subject,
            html: html

        }, function(error, response) {
            if (error) {
                console.log(sender.user + " --> " + recipient + " " + subject + " " + '发送失败');
                console.log(error);
            }
            console.log(sender.user + "--> " + recipient + " " + subject + " " + '发送成功')
        });

    }
}


module.exports = felixemail;