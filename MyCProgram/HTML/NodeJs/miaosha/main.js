 var jdProcess = require("./jdProcess.js")


            jdProcess.job();
            
            /*
            var schedule = require("node-schedule");

            var rule = new schedule.RecurrenceRule();　　
            rule.minute = 41;　　
            var j = schedule.scheduleJob(rule, function() {
                console.log("执行任务");　
                jdProcess.job();
            });
            */
            


            /*
            var rule = new schedule.RecurrenceRule();　　
            var times = [];　　
            //for (var i = 1; i < 60; i++) 
            {　　　　
                times.push(1);　　
            }

            rule.second = times;　　
            var c = 0;　　
            var j = schedule.scheduleJob(rule, function() {　　
                c++;　　
                console.log(c);　　
                job();
            });
            */

