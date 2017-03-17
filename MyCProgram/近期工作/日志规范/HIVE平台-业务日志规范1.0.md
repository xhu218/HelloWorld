# HIVE【业务日志自动提取】的日志内容要求


[TOC]

---


## 1.hive日志提取目的

hive的日志自动处理脚本由两部分组成：

1. **业务日志**
自动脚本提取的日志，目标是**根据**接入的各**业务系统**产生的**日志**，来**自动的形成“用户操作日志”和“素材操作日志”**

2. **运维日志**
对于运维方面的日志提取、归档等，应当采用的是“日志归档规范”。此部分
  - 对于查询，由hive自动脚本提取即时查询的部分，并提供接口。在Nebula中也会有显示页面。
  - hive会提供归档脚本和程序，来对日志进行按日的归档。并且可以提供下载。


> *运维日志，不需要业务系统关心，由hive自行规范处理*
> ***本文讲义的是业务日志的内容要求***
> ***<font style="background:yellow" size="2">本页内容的基准参考内容为《HIVE平台日志框架说明(JAVA).md》的内容</font>***

## 2.业务日志处理白皮书

Hive通过Logstash自动提取脚本，将各业务系统--这里指的业务系统是接入hive的业务系统--的日志，按照Tag标签中的内容进行提取。

- 提取的主要tag是“operateLog”和“素材contentId_”；
- 提取的主要内容是user、detail、system、site、clientIp
- 提取后的目标库为：UserOpLog和ResourceOpLog

业务日志提取之后，UserOpLog和ResourceOpLog会提供专门的查询接口，来进行：
- 基于用户为线索的操作日志查询
- 基于素材为线索的变更日志查询

## 3. 日志规范
1. **日志统一使用日期加JSON的方式记录.**

 &nbsp; &nbsp;格式为:`[LogID] Level  yyyy-MM-dd HH:mm:ss.sss SYSTEM [Thread] Class- {JSON数据}`
 
2. **统一使用UTF-8编码来传输.**

3. **JSON数据中至少要包含以下信息:**

	| 字段        | 类型   |  说明  | 
| :------: | :-----:  | :----  |
| tags| String[] | 日志事件的类型,比如表示运行日志,还是操作日志等等  |
| user| String | 日志事件触发的人,如果是系统内部的就是_system,这里也可以是sessionId等能描述用户的标识  |
| system| String | 日志发生的系统,比如是DCMP,还是检索,这个可以有层级结构  |
| time | date |  日志发生的时间 |
| level| String |  日志的级别 |
| ip| String |  当前服务器的IP |
| clientIp| String |  调用端的IP |
| detail| String |  日志的本身的内容 |
| extends| JSON |  扩展字段,可以根据具体业务的不同而增加字段 |
| throwable| String |  如果是抛出异常的日志，记录抛出的异常信息 |
| source| String |  记录触发本次日志的来源。如那个系统调用触发的本次日志 |
| tool| String |  调用的工具 |
| site| String |  调用的站点信息 |
| event | String | 接口调用的唯一标识,如果没有就不填|

4. **Level 日志级别规范**

	| 级别 | 说明 |
| :------: | :-----  |
|TRACE| 系统中的调试日志,便于开发人员进行错误分析和修正,通常该级别日志只用于保存不进行挖掘,与DEBUG日志的区别在于,可能Trace更不重要,比如一个函数的入口打印一句Trace日志啊 等等.|
|DEBUG| 系统中的调试日志,便于开发人员进行错误分析和修正,通常该级别日志只用于保存不进行挖掘,与Trace日志的区别在于,Debug的日志更具有业务性.比如某个业务的入参是什么,中间过程是什么,结果是什么等等.|
|INFO| 最主要的日志级别,有系统运行的主要关键时点的操作信息,用于记录业务日志.|
|WARN |警告日志,不影响系统正常运行.比如存储系统磁盘使用超过伐值,等等.|
|ERROR |错误日志,需要被马上关注的异常,比如数据错误,网络连接失败等等,而对于用户自己操作不当，如请求参数错误等等，是绝对不应该记为ERROR日志的!|
|FATAL| 最高级别错误日志,表示服务已经出现不可恢复的严重错误,比如一个系统的必要子系统当掉,那么整个系统相当于无法正常提供服务了,这时可以记录为FATAL.|

5. **日志样例**

```
[1462328358058_984] INFO  2016-05-04 10:19:18.079 SobeyHive [http-bio-0.0.0.0-8999-exec-7] c.s.j.s.l.s.RestServicePerformanceInterceptor- {"site":"S1","tags":["PerformanceIndex","REST"],"throwable":"","detail":"RestAPI:/sobeyhive-fp/v1/kernel/configs/user/authentication接收到请求,完成用时:19","time":"2016-05-04 10:19:18.078","system":"SobeyHive","level":"INFO","source":"Nebula","extends":{"ResponseFlag":1,"Method":"GET","ResponseTime":1462328358078,"UsedTime":19,"URL":"/sobeyhive-fp/v1/kernel/configs/user/authentication","RequestTime":1462328358059},"event":"I003004001","tool":"Upload","user":"admin","client_ip":"127.0.0.1","ip":"172.16.129.33"}

[1462328986691_573] WARN  2016-05-04 10:30:27.875 SobeyHive [myScheduler-10] c.s.j.s.c.c.AbstractTaskDispatcher- {"site":"unknown_site","tags":["unknown_tag"],"throwable":"","detail":"远程服务:fileanalysis不可用,无法分发任务,本次调度延后执行.","time":"2016-05-04 10:30:27.875","system":"SobeyHive","level":"WARN","source":"unknown_source","extends":{},"event":"","tool":"unknown_tool","user":"unknown_user","client_ip":"unknown_ip","ip":"172.16.129.33"}

[1462328358058_984] INFO  2016-05-04 10:19:18.073 SobeyHive [http-bio-0.0.0.0-8999-exec-7] c.s.j.s.l.s.PerformanceServiceAdvice- {"site":"S1","tags":["PerformanceIndex","Service"],"throwable":"","detail":"com.sobey.jcg.sobeyhive.userservice.service.IUserService#authentication接收到请求,完成用时:9,入参:[\"admin\",\"21232f297a57a5a743894a0e4a801fc3\"],返回:{\"avatarUrl\":\"admin/admin.png\",\"createTime\":\"2015-11-09 11:35:11\",\"disabled\":0,\"email\":null,\"extendAttributes\":{\"NxtMAM_Yunpan\":[{\"attributeGroup\":\"NxtMAM_Yunpan\",\"attributeKey\":\"Id\",\"attributeValue\":\"86babd81b92d41aaae8188c7652c0b12\",\"copyFrom\":0,\"createTime\":\"2016-04-19 10:07:03\",\"creatorCode\":\"admin\",\"description\":null,\"id\":291,\"sourceId\":1},{\"attributeGroup\":\"NxtMAM_Yunpan\",\"attributeKey\":\"Code\",\"attributeValue\":\"Daabaabaac\",\"copyFrom\":0,\"createTime\":\"2016-04-19 10:07:04\",\"creatorCode\":\"admin\",\"description\":null,\"id\":292,\"sourceId\":1}],\"_global_userparam\":[{\"attributeGroup\":\"_global_userparam\",\"attributeKey\":\"HiveMaterialList_ET_CLIPHIGH_VIDEOPATH\",\"attributeValue\":\"z:\\\\High_Clip\\\\clip\",\"copyFrom\":null,\"createTime\":\"2016-04-25 08:38:46\",\"creatorCode\":\"admin\",\"description\":null,\"id\":528,\"sourceId\":1}]},\"groups\":[],\"id\":1,\"link\":null,\"loginName\":\"admin\",\"nickName\":\"admin\",\"oldPassword\":null,\"operate\":0,\"organizations\":[],\"parentId\":null,\"password\":\"\",\"permissions\":[],\"phone\":null,\"pwdChangeTime\":\"2016-04-23 04:15:51\",\"roles\":[{\"count\":0,\"description\":\"admin\",\"disabled\":0,\"extendAttributes\":null,\"id\":1,\"privilegeAdmin\":0,\"roleCode\":\"admin_S1\",\"roleName\":\"admin\",\"roleType\":1,\"siteCode\":\"S1\",\"siteName\":\"初始化站点\"}],\"s3accesskeyId\":\"\",\"s3secretkey\":\"\",\"siteCode\":\"S1\",\"siteName\":\"初始化站点\",\"siteType\":0,\"storageObjectCount\":null,\"storageSize\":null,\"storageUsage\":null,\"storageWarningPCT\":null,\"templates\":[],\"type\":1,\"userCode\":\"admin\",\"userToken\":\"i0l7/w8fa8MFfYxyO7GadPArh1s=\"}","time":"2016-05-04 10:19:18.073","system":"SobeyHive","level":"INFO","source":"Nebula","extends":{"ResponseFlag":1,"response":"{\"avatarUrl\":\"admin/admin.png\",\"createTime\":\"2015-11-09 11:35:11\",\"disabled\":0,\"email\":null,\"extendAttributes\":{\"NxtMAM_Yunpan\":[{\"attributeGroup\":\"NxtMAM_Yunpan\",\"attributeKey\":\"Id\",\"attributeValue\":\"86babd81b92d41aaae8188c7652c0b12\",\"copyFrom\":0,\"createTime\":\"2016-04-19 10:07:03\",\"creatorCode\":\"admin\",\"description\":null,\"id\":291,\"sourceId\":1},{\"attributeGroup\":\"NxtMAM_Yunpan\",\"attributeKey\":\"Code\",\"attributeValue\":\"Daabaabaac\",\"copyFrom\":0,\"createTime\":\"2016-04-19 10:07:04\",\"creatorCode\":\"admin\",\"description\":null,\"id\":292,\"sourceId\":1}],\"_global_userparam\":[{\"attributeGroup\":\"_global_userparam\",\"attributeKey\":\"HiveMaterialList_ET_CLIPHIGH_VIDEOPATH\",\"attributeValue\":\"z:\\\\High_Clip\\\\clip\",\"copyFrom\":null,\"createTime\":\"2016-04-25 08:38:46\",\"creatorCode\":\"admin\",\"description\":null,\"id\":528,\"sourceId\":1}]},\"groups\":[],\"id\":1,\"link\":null,\"loginName\":\"admin\",\"nickName\":\"admin\",\"oldPassword\":null,\"operate\":0,\"organizations\":[],\"parentId\":null,\"password\":\"\",\"permissions\":[],\"phone\":null,\"pwdChangeTime\":\"2016-04-23 04:15:51\",\"roles\":[{\"count\":0,\"description\":\"admin\",\"disabled\":0,\"extendAttributes\":null,\"id\":1,\"privilegeAdmin\":0,\"roleCode\":\"admin_S1\",\"roleName\":\"admin\",\"roleType\":1,\"siteCode\":\"S1\",\"siteName\":\"初始化站点\"}],\"s3accesskeyId\":\"\",\"s3secretkey\":\"\",\"siteCode\":\"S1\",\"siteName\":\"初始化站点\",\"siteType\":0,\"storageObjectCount\":null,\"storageSize\":null,\"storageUsage\":null,\"storageWarningPCT\":null,\"templates\":[],\"type\":1,\"userCode\":\"admin\",\"userToken\":\"i0l7/w8fa8MFfYxyO7GadPArh1s=\"}","ResponseTime":1462328358071,"Class":"com.sobey.jcg.sobeyhive.userservice.service.IUserService#authentication","request":"[\"admin\",\"21232f297a57a5a743894a0e4a801fc3\"]","UsedTime":9,"RequestTime":1462328358062},"event":"","tool":"Upload","user":"admin","client_ip":"127.0.0.1","ip":"172.16.129.33"}
```



## 4.业务日志内容要求

### 日志级别

- Hive自动提取脚本只提取`INFO`级别的日志

### 内容**必填**内容要求

- **tag** `type=String[]`
  - 对于内容业务的操作日志，必填内容为：["operateLog", "${contentID_}"]
  - 对于单纯操作日志，必填内容为：["operateLog"]

    > **operateLog**：固定
    > **${contentID_}**：当前操作的目标素材

<br/>

- **user** `type=String`
用户的code
<br/>

- **clientIp** `type=IPv4`
客户端的IP地址
<br/>

- **site** `type=String`
当前操作所在的站点
<br/>

- **system** `type=String`
当前操作所在的业务系统
  - 系统必须是hive中注册的系统
 
    > 工具tool部分，作为选填，参考霞绍超的邮件

<br/>




- **detail** `type=String`
当前日志记录发生的内容
<br/>


### 样例
1. 内容业务操作日志--查看详细
    ```json
    {
    	"site":"S1",
    	"tags":["operateLog","sagw2sdgaacdlinasdgscs"],
    	"detail":"查看详细信息",
        "system":"Test",
        "source":"Test", 
        "tool":"Catalogue",
        "client_ip":"172.1.131.17"
    }
    ```	
<br/><br/>  
    
2. 内容业务操作日志--修改编目元数据
  
    ```json
    {
    	"site":"S1",
    	"tags":["operateLog","sagw2sdgaacdlinasdgscs"],
    	"detail":"修改节目层元数据",
        "system":"Test",
        "source":"Test", 
        "tool":"Catalogue",
        "client_ip":"172.1.131.17",
        "extends":{
        	"catalogueLayer":"program",
        	"updatefields":[
        	  {"field":"test","name":"测试字段","newVal":"测试"},
        	  {"field":"test.first","name":"第一个字段","newVal":"hahaha"}
        	]
        }
    }
    ```
    该样例中，tag必填，extends中描述了修改的内容
<br/><br/>  	
    
3. 单纯操作日志--用户登陆
    ```json
    {
    	"site":"S1",
    	"tags":["operateLog"],
    	"detail":"登陆Info控制台",
    	"time":"2016-05-04 10:19:18.078",
    	"system":"Info",
    	"level":"INFO",
    	"tool":"WEB",
    	"user":"wx",
    	"client_ip":"172.1.131.17"
    }
    ```	
<br/><br/>  

4. 单纯操作日志--用户打开工具
    ```json
    {
    	"site":"S1",
    	"tags":["operateLog"],
    	"detail":"打开上传客户端",
    	"time":"2016-05-04 10:19:18.078",
    	"system":"MAM",
    	"level":"INFO",
    	"source":"Test",
    	"tool":"Catalogue",
    	"user":"wx",
    	"client_ip":"172.1.131.17"
    }
    ```	


