#用户管理API

Tags：VERSION2.0

[TOC]
## **用户管理**
### **1. 添加用户**
`API-URL：`

>   **POST** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user
    
添加一个或一组用户到系统中.

具备Admin组[^admingroup]的用户才能操作，否则将收到401错误提示。**后台服务会取得用户信息进行验证**

**请求参数（单个用户）：**

| 字段        | 类型   |  说明  | |
| :------: | :-----:  | :----:  |:----: |
| disabled|int|是否禁用 1禁用 0启用|`必选`|
| loginname|string|用户名|`必选`|
| password|string|密码，sha256(md5)加密 |`必选`|
| nickname |   string   |   昵称   |`必选`|
| organizations |   OrganizationVO[]   |   用户所属组织机构，参见组织机构管理   |`可选`|
| storageSize|double|存储空间|`必选`|
| roles|RoleVO[]|用户所属角色。参见权限管理|`可选`|
| avatarUrl|string|头像URL地址|`可选`|
| email|string|电子邮箱地址|`可选`|
| phone|string|手机号码|`可选`|
| storageWarningPCT|double|存储空间使用预警阀值(百分比)|`可选`|

***请求样例：***

```json
POST /sobeyhive/kernel/configs/user HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: WsbdVsXBs2vol8LDWR3jz5IvnNE=
Cache-Control: no-cache
[
    {
        "loginName": "test_0216",
        "nickName": "test_0216",
        "organizations": [
            {
                "organizationCode": "root_S1"
            }
        ],
        "password": "zyli",
        "disabled": "0",
        "roles": [
            {
                "roleCode": "admin_S1"
            }
        ],
        "storageSize": 2000,
        "storageWarningPCT": 0.9
    }
]

```

**返回参数：**


| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| createTime|string|创建时间|
| disabled|int|是否禁用 1禁用 0启用|
| id|string|主键|
| link|string|存储连接串|
| loginname|string|用户名|
| password|string|密码，sha256(md5)加密 |
| nickname |   string   |   昵称   |
| parentId |   long   |   主用户时未0或空，子用户时未主用户ID   |
| organizations |   OrganizationVO[]   |   用户所属组织机构，参见组织机构管理   |
| s3accesskeyId|string|s3访问code|
| s3secretkey|string|s3密钥|
| storageSize|double|存储空间|
| storageUsage|double|存储使用情况|
| userCode|string   |用户编号|
| type|int   |用户类型 0：普通用户，1：管理员用户|
| siteCode|string   |站点编号|
| siteName|string   |站点名称|
| siteType|int   |站点类型 0：普通站点，1：默认站点|
| roles|RoleVO[]|用户所属角色。参见权限管理|
| avatarUrl|string|头像URL地址|
| email|string|电子邮箱地址|
| phone|string|手机号码|
| storageWarningPCT|double|存储空间使用预警阀值(百分比)|
| extendAttributes|ExtendAttribute[]|用户扩展属性|
| groups|GroupLevel[]|用户的权限用户组|
| pwdChangeTime|GroupLevel[]|密码修改时间，记录用户修改密码的时间(作为用户是否修改密码的依据)|

***返回样例：***

```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
[
  {
    "avatarUrl": null,
    "createTime": "2016-02-16 17:10:24",
    "disabled": 0,
    "email": null,
    "extendAttributes": null,
    "groups": [],
    "id": 197,
    "link": null,
    "loginName": "test_0216",
    "nickName": "test_0216",
    "oldPassword": null,
    "operate": 0,
    "organizations": [
      {
        "id": null,
        "operate": 0,
        "organizationCode": "root_S1",
        "organizationName": null,
        "parentId": null,
        "siteCode": null,
        "siteName": ""
      }
    ],
    "parentId": null,
    "password": "",
    "permissions": [],
    "phone": null,
    "pwdChangeTime": "2016-02-16 17:10:24",
    "roles": [
      {
        "count": 0,
        "description": null,
        "disabled": 0,
        "extendAttributes": null,
        "id": null,
        "privilegeAdmin": 0,
        "roleCode": "admin_S1",
        "roleName": null,
        "roleType": 1,
        "siteCode": null,
        "siteName": ""
      }
    ],
    "s3accesskeyId": "",
    "s3secretkey": "",
    "siteCode": "S1",
    "siteName": "S1",
    "siteType": 0,
    "storageSize": 2000,
    "storageUsage": null,
    "storageWarningPCT": 0.9,
    "templates": [],
    "type": 0,
    "userCode": "1920e347aecf4ce187eb68d3e93bdc62",
    "userToken": null
  }
]
```

-----------------------------------

### **2. 修改用户**
`API-URL：`

>   **PUT** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user
    
修改用户信息。如果修改用户登录密码，需要提供原密码。

具备Admin组的用户才能操作，否则将收到401错误提示。**后台服务会取得用户信息进行验证**

**请求参数：**

| 字段        | 类型   |  说明  ||
| :------: | :-----:  | :----:  |:----:|
| userCode|string   |用户编号|`必选`|
| nickname |   string   |   昵称   |`可选`|
| password_old|string|历史密码，sha256(md5)加密 |`可选`|
| password |   string   |   新密码，sha256(md5)加密   |`可选`|
| organizations |   OrganizationVO[]   |   用户所属组织机构，参见组织机构管理   |`必选`|
| storageSize|double|存储空间|`必选`|
| roles|RoleVO[]|用户所属角色。参见权限管理|`必选`|
| disabled|int|是否禁用 1禁用 0启用|`必选`|

***请求样例：***

```json
PUT /sobeyhive/kernel/configs/user HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: WsbdVsXBs2vol8LDWR3jz5IvnNE=
Cache-Control: no-cache

{
  "nickName": "zyli",
  "organizations": [
    {
      "organizationCode": "root_S1"
    }
  ],
  "parentId": 0,
  "password": "",
  "permissions": [],
  "roles": [
    {
      "roleCode": "admin_S1"
    }
  ],
  "storageSize": 10000,
  "storageWarningPCT": 0.95,
  "userCode": "1920e347aecf4ce187eb68d3e93bdc62"
}
```

**返回参数：**
无

***返回样例：***

```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Type: application/json
Content-Length: 0
Connection: close
```
-----------------------------------

### **3. 删除用户**
`API-URL：`

>   **DELETE** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/{userCode}
    
删除一个用户。

**具备Admin组的用户**才能操作，否则将收到401错误提示。**后台服务会取得用户信息进行验证**

**请求参数：**
无

***请求样例：***
```json
DELETE /sobeyhive/kernel/configs/user/3db1f44034e3415a98e865c58bb025a0 HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: WsbdVsXBs2vol8LDWR3jz5IvnNE=
Cache-Control: no-cache
```
**返回参数：**
无
***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Type: application/json
Content-Length: 0
Connection: close
```

------------------

### **4. 根据登录名获取用户**
`API-URL：`

>   **GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/{loginname}
    
获取用户。如果无此用户，返回404。

**具备Admin组的用户**才能操作，否则将收到401错误提示

**请求参数：**

loginName:用户登录名

***请求样例：***
```json
GET /sobeyhive/kernel/configs/user/lisj_test_005 HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: WsbdVsXBs2vol8LDWR3jz5IvnNE=
Cache-Control: no-cache
```
***返回参数-UerInfo：***

| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| createTime|string|创建时间|
| disabled|int|是否禁用 1禁用 0启用|
| id|string|主键|
| link|string|存储连接串|
| loginname|string|用户名|
| password|string|密码，sha256(md5)加密 |
| nickname |   string   |   昵称   |
| parentId |   long   |   主用户时未0或空，子用户时未主用户ID   |
| organizations |   OrganizationVO[]   |   用户所属组织机构，参见组织机构管理   |
| s3accesskeyId|string|s3访问code|
| s3secretkey|string|s3密钥|
| storageSize|double|存储空间|
| storageUsage|double|存储使用情况|
| userCode|string   |用户编号|
| type|int   |用户类型 0：普通用户，1：管理员用户|
| siteCode|string   |站点编号|
| siteName|string   |站点名称|
| siteType|int   |站点类型 0：普通站点，1：默认站点|
| roles|RoleVO[]|用户所属角色。参见权限管理|
| avatarUrl|string|头像URL地址|
| email|string|电子邮箱地址|
| phone|string|手机号码|
| storageWarningPCT|double|存储空间使用预警阀值(百分比)|
| extendAttributes|ExtendAttribute[]|用户扩展属性|
| groups|GroupLevel[]|用户的权限用户组|
| pwdChangeTime|GroupLevel[]|密码修改时间，记录用户修改密码的时间(作为用户是否修改密码的依据)|

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
{
  "avatarUrl": null,
  "createTime": "2016-02-16 17:10:24",
  "disabled": 0,
  "email": null,
  "extendAttributes": null,
  "groups": [],
  "id": 197,
  "link": null,
  "loginName": "test_0216",
  "nickName": "zyli",
  "oldPassword": null,
  "operate": 0,
  "organizations": [
    {
      "id": 1,
      "operate": 0,
      "organizationCode": "root_S1",
      "organizationName": "全部",
      "parentId": -1,
      "siteCode": "S1",
      "siteName": "S1"
    }
  ],
  "parentId": null,
  "password": "",
  "permissions": [],
  "phone": null,
  "pwdChangeTime": "2016-02-16 17:10:24",
  "roles": [
    {
      "count": 0,
      "description": "admin",
      "disabled": 0,
      "extendAttributes": null,
      "id": 1,
      "privilegeAdmin": 0,
      "roleCode": "admin_S1",
      "roleName": "admin",
      "roleType": 1,
      "siteCode": "S1",
      "siteName": "S1"
    }
  ],
  "s3accesskeyId": "",
  "s3secretkey": "",
  "siteCode": "S1",
  "siteName": "S1",
  "siteType": 0,
  "storageSize": 10000,
  "storageUsage": null,
  "storageWarningPCT": 0.95,
  "templates": [],
  "type": 1,
  "userCode": "1920e347aecf4ce187eb68d3e93bdc62",
  "userToken": null
}

```

-----------------------------------

### **5. 按条件获取用户**
`API-URL：`

>   **GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/?`filters`
    
按条件获取用户信息。

**具备Admin组的用户**才能操作，否则将收到401错误提示

**filter参数：**

| 字段        | 类型   |  说明  ||
| :------: | :-----:  | :----:  | :----:  |
| keyword|string|查询关键字|`可选`|
| keywordField|string|关键字匹配字段(不填默认匹配)loginname、nickname|`可选`|
| roleCode|string|所属角色编号|`可选`|
| organizationCode|string|所属部门编号|`可选`|
| userType|int|用户类型 -1 全部 0 主用户 1 子用户|`可选`|
| orderBy|string|排序字段|`可选`|
| sort | enum(string)| asc\desc。默认asc，升序。   |   `可选`  |
| size|int|一页的数量|`可选`|
|page|long|页码 |`可选`|

***请求样例：***
```json
GET /sobeyhive-fp/kernel/configs/user?keyword=test_0 HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
Content-Type: application/json
sobeyhive-http-token: i0l7/w8fa8MFfYxyO7GadPArh1s=
sobeyhive-http-tool: Upload
Cache-Control: no-cache
Postman-Token: ac191542-6c19-2032-f9a2-9baecbd6aa5f

```
***返回参数：***

| 字段 | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| page|Long |当前页码|
| pageSize|Long |每页显示记录数|
| resultList|UerInfo[] |见   "**User-API\用户管理\获取用户\返回参数**"|
| size|Long |符合条件总记录数|

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
{
    "page": 1,
    "pageSize": 10,
    "resultList": [
        {
            "avatarUrl": null,
            "createTime": "2016-02-16 17:10:24",
            "disabled": 0,
            "email": null,
            "extendAttributes": null,
            "groups": [],
            "id": 197,
            "link": null,
            "loginName": "test_0216",
            "nickName": "zyli",
            "oldPassword": null,
            "operate": 0,
            "organizations": [
                {
                    "id": null,
                    "operate": 0,
                    "organizationCode": null,
                    "organizationName": "全部",
                    "parentId": null,
                    "siteCode": null,
                    "siteName": ""
                }
            ],
            "parentId": null,
            "password": "",
            "permissions": [],
            "phone": null,
            "pwdChangeTime": "2016-02-16 17:10:24",
            "roles": [
                {
                    "count": 0,
                    "description": null,
                    "disabled": 0,
                    "extendAttributes": null,
                    "id": null,
                    "privilegeAdmin": 0,
                    "roleCode": null,
                    "roleName": "admin",
                    "roleType": 1,
                    "siteCode": null,
                    "siteName": ""
                }
            ],
            "s3accesskeyId": "",
            "s3secretkey": "",
            "siteCode": "S1",
            "siteName": "S1",
            "siteType": 0,
            "storageSize": 10000,
            "storageUsage": null,
            "storageWarningPCT": 0.95,
            "templates": [],
            "type": 0,
            "userCode": "1920e347aecf4ce187eb68d3e93bdc62",
            "userToken": null
        },
        {
            "avatarUrl": "http://172.16.131.61:9090/nebula/service/role111",
            "createTime": "2016-01-27 15:58:30",
            "disabled": 0,
            "email": null,
            "extendAttributes": null,
            "groups": [],
            "id": 196,
            "link": null,
            "loginName": "test_0127-avatar-2",
            "nickName": "test_0127-avatar-2",
            "oldPassword": null,
            "operate": 0,
            "organizations": [
                {
                    "id": null,
                    "operate": 0,
                    "organizationCode": null,
                    "organizationName": "全部",
                    "parentId": null,
                    "siteCode": null,
                    "siteName": ""
                }
            ],
            "parentId": null,
            "password": "",
            "permissions": [],
            "phone": null,
            "pwdChangeTime": "2016-01-27 15:58:29",
            "roles": [
                {
                    "count": 0,
                    "description": null,
                    "disabled": 0,
                    "extendAttributes": null,
                    "id": null,
                    "privilegeAdmin": 0,
                    "roleCode": null,
                    "roleName": "admin",
                    "roleType": 1,
                    "siteCode": null,
                    "siteName": ""
                }
            ],
            "s3accesskeyId": "",
            "s3secretkey": "",
            "siteCode": "S1",
            "siteName": "S1",
            "siteType": 0,
            "storageSize": 2000,
            "storageUsage": null,
            "storageWarningPCT": null,
            "templates": [],
            "type": 0,
            "userCode": "40280e950c6e481293e896a160354751",
            "userToken": null
        },
        {
            "avatarUrl": null,
            "createTime": "2016-01-27 15:57:48",
            "disabled": 0,
            "email": null,
            "extendAttributes": null,
            "groups": [],
            "id": 195,
            "link": null,
            "loginName": "test_0127-avatar",
            "nickName": "test_0127-avatar",
            "oldPassword": null,
            "operate": 0,
            "organizations": [
                {
                    "id": null,
                    "operate": 0,
                    "organizationCode": null,
                    "organizationName": "全部",
                    "parentId": null,
                    "siteCode": null,
                    "siteName": ""
                }
            ],
            "parentId": null,
            "password": "",
            "permissions": [],
            "phone": null,
            "pwdChangeTime": "2016-01-27 15:57:48",
            "roles": [
                {
                    "count": 0,
                    "description": null,
                    "disabled": 0,
                    "extendAttributes": null,
                    "id": null,
                    "privilegeAdmin": 0,
                    "roleCode": null,
                    "roleName": "admin",
                    "roleType": 1,
                    "siteCode": null,
                    "siteName": ""
                }
            ],
            "s3accesskeyId": "",
            "s3secretkey": "",
            "siteCode": "S1",
            "siteName": "S1",
            "siteType": 0,
            "storageSize": 2000,
            "storageUsage": null,
            "storageWarningPCT": null,
            "templates": [],
            "type": 0,
            "userCode": "9c5e6fe58c2c496dab8f30dc9ab9740e",
            "userToken": null
        },
        {
            "avatarUrl": null,
            "createTime": "2016-01-27 10:29:52",
            "disabled": 0,
            "email": null,
            "extendAttributes": null,
            "groups": [],
            "id": 193,
            "link": null,
            "loginName": "test_0127",
            "nickName": "test_0127",
            "oldPassword": null,
            "operate": 0,
            "organizations": [
                {
                    "id": null,
                    "operate": 0,
                    "organizationCode": null,
                    "organizationName": "全部",
                    "parentId": null,
                    "siteCode": null,
                    "siteName": ""
                }
            ],
            "parentId": null,
            "password": "",
            "permissions": [],
            "phone": null,
            "pwdChangeTime": "2016-01-27 10:29:52",
            "roles": [
                {
                    "count": 0,
                    "description": null,
                    "disabled": 0,
                    "extendAttributes": null,
                    "id": null,
                    "privilegeAdmin": 0,
                    "roleCode": null,
                    "roleName": "admin",
                    "roleType": 1,
                    "siteCode": null,
                    "siteName": ""
                }
            ],
            "s3accesskeyId": "",
            "s3secretkey": "",
            "siteCode": "S1",
            "siteName": "S1",
            "siteType": 0,
            "storageSize": 2000,
            "storageUsage": null,
            "storageWarningPCT": null,
            "templates": [],
            "type": 0,
            "userCode": "0d2410aff7694252b1bf55509df058ec",
            "userToken": null
        },
        {
            "avatarUrl": null,
            "createTime": "2015-12-14 11:51:22",
            "disabled": 0,
            "email": null,
            "extendAttributes": null,
            "groups": [],
            "id": 82,
            "link": null,
            "loginName": "user_test_001",
            "nickName": "user_test_001",
            "oldPassword": null,
            "operate": 0,
            "organizations": [
                {
                    "id": null,
                    "operate": 0,
                    "organizationCode": null,
                    "organizationName": "xcx",
                    "parentId": null,
                    "siteCode": null,
                    "siteName": ""
                }
            ],
            "parentId": null,
            "password": "",
            "permissions": [],
            "phone": null,
            "pwdChangeTime": "2015-12-14 11:51:22",
            "roles": [
                {
                    "count": 0,
                    "description": null,
                    "disabled": 0,
                    "extendAttributes": null,
                    "id": null,
                    "privilegeAdmin": 0,
                    "roleCode": null,
                    "roleName": "ssssssssssssssss",
                    "roleType": 1,
                    "siteCode": null,
                    "siteName": ""
                }
            ],
            "s3accesskeyId": "",
            "s3secretkey": "",
            "siteCode": "S1",
            "siteName": "S1",
            "siteType": 0,
            "storageSize": null,
            "storageUsage": null,
            "storageWarningPCT": null,
            "templates": [],
            "type": 0,
            "userCode": "f0fd107d2c7042719d71c8fa19b8ed06",
            "userToken": null
        }
    ],
    "size": 5
}
```
-------------

### **6. 添加子用户**
`API-URL：`

>   **POST** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/subUser/{userCode}
    
为一个用户增加一个或多个子用户。

**具备Admin组的用户**才能操作，否则将收到401错误提示

**请求参数：**

| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| userCode|  string  |   要添加子用户的用户编号   |
| users |   UserVo[]   |   子用户对象列表，参见添加用户请求  |


***请求样例：***
```json
POST /sobeyhive-fp/kernel/configs/user HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
Content-Type: application/json
sobeyhive-http-token: i0l7/w8fa8MFfYxyO7GadPArh1s=
sobeyhive-http-tool: Upload
Cache-Control: no-cache
Postman-Token: 324e6a58-aa10-c754-29aa-c84703f8aa0e

[
    {
        "loginName": "test_sub_0216",
        "nickName": "test_sub_0216",
        "organizations": [
            {
                "organizationCode": "root_S1"
            }
        ],
        "password": "zyli",
        "disabled": "0",
        "roles": [
            {
                "roleCode": "admin_S1"
            }
        ],
        "storageSize": 20000,
        "storageWarningPCT": 0.92,
        "parentId":91
    }
]
```
***返回参数：***

参见添加用户返回


***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close

[
    {
        "avatarUrl": null,
        "createTime": "2016-02-16 18:39:11",
        "disabled": 0,
        "email": null,
        "extendAttributes": null,
        "groups": [],
        "id": 198,
        "link": null,
        "loginName": "test_sub_0216",
        "nickName": "test_sub_0216",
        "oldPassword": null,
        "operate": 0,
        "organizations": [
            {
                "id": null,
                "operate": 0,
                "organizationCode": "root_S1",
                "organizationName": null,
                "parentId": null,
                "siteCode": null,
                "siteName": ""
            }
        ],
        "parentId": 91,
        "password": "",
        "permissions": [],
        "phone": null,
        "pwdChangeTime": "2016-02-16 18:39:11",
        "roles": [
            {
                "count": 0,
                "description": null,
                "disabled": 0,
                "extendAttributes": null,
                "id": null,
                "privilegeAdmin": 0,
                "roleCode": "admin_S1",
                "roleName": null,
                "roleType": 1,
                "siteCode": null,
                "siteName": ""
            }
        ],
        "s3accesskeyId": "",
        "s3secretkey": "",
        "siteCode": "S1",
        "siteName": "S1",
        "siteType": 0,
        "storageSize": 20000,
        "storageUsage": null,
        "storageWarningPCT": 0.92,
        "templates": [],
        "type": 0,
        "userCode": "41c9df79f4ff447790d57a1ac96529d6",
        "userToken": null
    }
]
```
-------------

### **7. 查询一个用户的子用户列表**
`API-URL：`

>   **GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/subUser/{userCode}
    
查询一个用户的子用户列表。

**具备Admin组的用户**才能操作，否则将收到401错误提示

**请求参数：**

| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| userCode|  string  | 用户编号   |
| keyword|string|查询关键字|`可选`|
| type|int|类型，全部为-1 0为普通用户，1为admin用户|`可选`|
| orderBy|string|排序字段|`可选`|
| sort | enum(string)| asc\desc。默认asc，升序。   |   `可选`  |
| size|int|一页的数量|`可选`|
| page|long|页码 |`可选`|

***请求样例：***
```json
POST   /configs/user/subUser/a15d28ab1d554d5da6fe7d9f62b67cb5?keyword=&orderBy=loginname&sort=desc&page=1&size=20  HTTP/1.1
Host: localhost
Content-Type: application/json
Accept: application/json
Authorization: aEsdgsag=/asdg0 
```
***返回参数：***

| 字段 | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| page|Long |当前页码|
| pageSize|Long |每页显示记录数|
| resultList|UerInfo[] |见   "**User-API\用户管理\获取用户\返回参数**"|
| size|Long |符合条件总记录数|


***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
{
    "page": 1,
    "pageSize": 20,
    "resultList": [
        {
            "avatarUrl": null,
            "createTime": "2016-02-16 18:39:12",
            "disabled": 0,
            "email": null,
            "extendAttributes": null,
            "groups": [],
            "id": 198,
            "link": null,
            "loginName": "test_sub_0216",
            "nickName": "test_sub_0216",
            "oldPassword": null,
            "operate": 0,
            "organizations": [
                {
                    "id": null,
                    "operate": 0,
                    "organizationCode": null,
                    "organizationName": "全部",
                    "parentId": null,
                    "siteCode": null,
                    "siteName": ""
                }
            ],
            "parentId": 91,
            "password": "zyli",
            "permissions": [],
            "phone": null,
            "pwdChangeTime": "2016-02-16 18:39:12",
            "roles": [
                {
                    "count": 0,
                    "description": null,
                    "disabled": 0,
                    "extendAttributes": null,
                    "id": null,
                    "privilegeAdmin": 0,
                    "roleCode": null,
                    "roleName": "admin",
                    "roleType": 1,
                    "siteCode": null,
                    "siteName": ""
                }
            ],
            "s3accesskeyId": "DATATOM4UAcOR3uLx3bx49kIDdAhaRCAr",
            "s3secretkey": "skGqMOrcnOcu35Z9APzjfCZuauWQ7BWfIsoEJ1FI",
            "siteCode": "S1",
            "siteName": "S1",
            "siteType": 0,
            "storageSize": 20000,
            "storageUsage": null,
            "storageWarningPCT": 0.92,
            "templates": [],
            "type": 0,
            "userCode": "41c9df79f4ff447790d57a1ac96529d6",
            "userToken": null
        },
        {
            "avatarUrl": null,
            "createTime": "2015-12-21 14:10:32",
            "disabled": 0,
            "email": null,
            "extendAttributes": null,
            "groups": [],
            "id": 169,
            "link": null,
            "loginName": "lisj_sub",
            "nickName": "lisj_sub",
            "oldPassword": null,
            "operate": 0,
            "organizations": [
                {
                    "id": null,
                    "operate": 0,
                    "organizationCode": null,
                    "organizationName": "全部",
                    "parentId": null,
                    "siteCode": null,
                    "siteName": ""
                }
            ],
            "parentId": 91,
            "password": "zyli",
            "permissions": [],
            "phone": null,
            "pwdChangeTime": "2015-12-21 14:10:32",
            "roles": [],
            "s3accesskeyId": "DATATOM4UAcOR3uLx3bx49kIDdAhaRCAr",
            "s3secretkey": "skGqMOrcnOcu35Z9APzjfCZuauWQ7BWfIsoEJ1FI",
            "siteCode": "S1",
            "siteName": "S1",
            "siteType": 0,
            "storageSize": 20000,
            "storageUsage": null,
            "storageWarningPCT": null,
            "templates": [],
            "type": 0,
            "userCode": "02540035634343b79f1be5332ca84acb",
            "userToken": null
        }
    ],
    "size": 2
}
```
-------------

### **8. 根据用户编号获取用户**
`API-URL：`

>   **GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/userCode/{userCode}
    
获取用户。如果无此用户，返回404。

**具备Admin组的用户**才能操作，否则将收到401错误提示

**请求参数：**
无

***请求样例：***
```json
GET /sobeyhive/kernel/configs/user/userCode/41c9df79f4ff447790d57a1ac96529d6 HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: WsbdVsXBs2vol8LDWR3jz5IvnNE=
Cache-Control: no-cache
```
***返回参数：***

| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| |UerInfo |见   "**User-API\用户管理\获取用户\返回参数**"|

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
{
    "avatarUrl": null,
    "createTime": "2016-02-16 18:39:12",
    "disabled": 0,
    "email": null,
    "extendAttributes": {
        "aaaa": [
            {
                "attributeGroup": "aaaa",
                "attributeKey": "a",
                "attributeValue": "b",
                "copyFrom": null,
                "createTime": "2016-02-16 10:45:56",
                "creatorCode": "admin",
                "description": "c",
                "id": 584,
                "sourceId": 198
            },
            {
                "attributeGroup": "aaaa",
                "attributeKey": "d",
                "attributeValue": "e",
                "copyFrom": null,
                "createTime": "2016-02-16 10:46:03",
                "creatorCode": "admin",
                "description": "f",
                "id": 585,
                "sourceId": 198
            }
        ],
        "bbbbbb": [
            {
                "attributeGroup": "bbbbbb",
                "attributeKey": "a",
                "attributeValue": "b",
                "copyFrom": null,
                "createTime": "2016-02-16 10:46:21",
                "creatorCode": "admin",
                "description": "c",
                "id": 586,
                "sourceId": 198
            },
            {
                "attributeGroup": "bbbbbb",
                "attributeKey": "d",
                "attributeValue": "e",
                "copyFrom": null,
                "createTime": "2016-02-16 10:46:25",
                "creatorCode": "admin",
                "description": "f",
                "id": 587,
                "sourceId": 198
            }
        ]
    },
    "groups": [],
    "id": 198,
    "link": null,
    "loginName": "test_sub_0216",
    "nickName": "test_sub_0216",
    "oldPassword": null,
    "operate": 0,
    "organizations": [
        {
            "id": 1,
            "operate": 0,
            "organizationCode": "root_S1",
            "organizationName": "全部",
            "parentId": -1,
            "siteCode": "S1",
            "siteName": "S1"
        }
    ],
    "parentId": 91,
    "password": "",
    "permissions": [],
    "phone": null,
    "pwdChangeTime": "2016-02-16 18:39:12",
    "roles": [
        {
            "count": 0,
            "description": "admin",
            "disabled": 0,
            "extendAttributes": null,
            "id": 1,
            "privilegeAdmin": 0,
            "roleCode": "admin_S1",
            "roleName": "admin",
            "roleType": 1,
            "siteCode": "S1",
            "siteName": "S1"
        }
    ],
    "s3accesskeyId": "",
    "s3secretkey": "",
    "siteCode": "S1",
    "siteName": "S1",
    "siteType": 0,
    "storageSize": 20000,
    "storageUsage": null,
    "storageWarningPCT": 0.92,
    "templates": [],
    "type": 1,
    "userCode": "41c9df79f4ff447790d57a1ac96529d6",
    "userToken": null
}

```
### **9. 批量设置用户存储配额**
`API-URL：`

>   **POST** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/batch/StorageSize
    
批量设置用户的存储配额

**具备Admin组的用户**才能操作，否则将收到401错误提示

**请求参数：**
| 字段        | 类型   |  说明  ||
| :------: | :-----:  | :----:  |:----: |
| userCode|string|用户编号|`必选`|
| storageSize|int|配额大小|`必选`|

***请求样例：***
```json
PUT /sobeyhive/kernel/configs/user/batch/StorageSize?userCode=830f7c0c965e4cdda3435e0a87c5c448&userCode=eea1ede6d16041968bd97a878256845f&storageSize=100 HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: WsbdVsXBs2vol8LDWR3jz5IvnNE=
Cache-Control: no-cache

```
***返回参数：***

无

***返回样例：***

无
### **10. 增加用户扩展属性**
`API-URL：`

>   **POST** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/{sourceId}/ea

批量增加用户的扩展属性


**请求参数：**
| 字段        | 类型   |  说明  ||
| :------: | :-----:  | :----:  |:----: |
| sourceId|string|用户ID|`必选`|
| extendAttributes|ExtendAttributeVO[]|用户扩展属性对象数组|`必选`|

**ExtendAttributeVO对象说明**
| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| id|long|扩展属性ID|
| sourceId|Long|用户ID|
| attributeKey|string|KEY|
| attributeValue|string|VALUE|
| attributeGroup|string|Group|
| description|string|描述|
| creatorCode|string|创建人编号|
| createTime|string|创建时间|
| copyFrom|Long|如果是复制或获得，则保存源的ID|

***请求样例：***
```json
POST /sobeyhive-fp/kernel/configs/user/132/ea HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: VwbZKZuIC+oOYzs72WD7q5KvNc8=
Cache-Control: no-cache
[
  {
    "attributeKey": "K1",
    "attributeValue": "第一个扩展属性",
    "attributeGroup": "GROUP1",
    "description": "NO.1"
  },
{
    "attributeKey": "K2",
    "attributeValue": "第二个扩展属性",
    "attributeGroup": "GROUP1",
    "description": "NO.2"
  },
{
    "attributeKey": "K3",
    "attributeValue": "第三个扩展属性",
    "attributeGroup": "GROUP2",
    "description": "NO.3"
  }
]

```
***返回参数：***
| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| extendAttributes|ExtendAttributeVO[]|用户扩展属性对象数组，详见：**ExtendAttributeVO对象说明**|

***返回样例：***

```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
[
    {
        "attributeGroup": "GROUP1",
        "attributeKey": "K1",
        "attributeValue": "第一个扩展属性",
        "copyFrom": 0,
        "createTime": "2015-11-26 16:39:41",
        "creatorCode": "admin",
        "description": "NO.1",
        "id": 20,
        "sourceId": 132
    },
    {
        "attributeGroup": "GROUP1",
        "attributeKey": "K2",
        "attributeValue": "第二个扩展属性",
        "copyFrom": 0,
        "createTime": "2015-11-26 16:39:41",
        "creatorCode": "admin",
        "description": "NO.2",
        "id": 21,
        "sourceId": 132
    },
    {
        "attributeGroup": "GROUP2",
        "attributeKey": "K3",
        "attributeValue": "第三个扩展属性",
        "copyFrom": 0,
        "createTime": "2015-11-26 16:39:41",
        "creatorCode": "admin",
        "description": "NO.3",
        "id": 22,
        "sourceId": 132
    }
]
```
### **11. 获取用户扩展属性详细**
`API-URL：`

>   **GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/{sourceId}/ea/{id}

根据ID，获取用户扩展属性详细

**请求参数：**
| 字段        | 类型   |  说明  ||
| :------: | :-----:  | :----:  |:----: |
| sourceId|Long|用户ID|`必选`|
| id|long|用户扩展属性ID|`必选`|

***请求样例：***
```json
GET /sobeyhive-fp/kernel/configs/user/132/ea/22 HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: VwbZKZuIC+oOYzs72WD7q5KvNc8=
Cache-Control: no-cache

```
***返回参数：***
| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| extendAttribute|ExtendAttributeVO|用户扩展属性对象，详见：**ExtendAttributeVO对象说明**|

***返回样例：***

```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
{
    "attributeGroup": "GROUP2",
    "attributeKey": "K3",
    "attributeValue": "第三个扩展属性",
    "copyFrom": 0,
    "createTime": "2015-11-26 16:39:41",
    "creatorCode": "admin",
    "description": "NO.3",
    "id": 22,
    "sourceId": 132
}
```

### **12. 获取用户一个分组扩展属性详细**
`API-URL：`

>   **GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/{sourceId}/ea/group/{attributeGroup}

根据attributeGroup，获取用户某个分组的扩展属性详细

**具备Admin组的用户**才能操作，否则将收到401错误提示

**请求参数：**
| 字段        | 类型   |  说明  ||
| :------: | :-----:  | :----:  |:----: |
| sourceId|Long|用户ID|`必选`|
| attributeGroup|string|分组|`必选`|

***请求样例：***
```json
GET /sobeyhive-fp/kernel/configs/user/132/ea/group/GROUP1 HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: SjUAxwMUwkpuY+CNt1daEMoVAVE=
Cache-Control: no-cache

```
***返回参数：***
| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| extendAttribute|ExtendAttributeVO[]|用户扩展属性对象数组，详见：**ExtendAttributeVO对象说明**|

***返回样例：***

```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
[
    {
        "attributeGroup": "GROUP1",
        "attributeKey": "K1",
        "attributeValue": "第一个扩展属性",
        "copyFrom": 0,
        "createTime": "2015-11-26 16:39:41",
        "creatorCode": "admin",
        "description": "NO.1",
        "id": 20,
        "sourceId": 132
    },
    {
        "attributeGroup": "GROUP1",
        "attributeKey": "K2",
        "attributeValue": "第二个扩展属性",
        "copyFrom": 0,
        "createTime": "2015-11-26 16:39:41",
        "creatorCode": "admin",
        "description": "NO.2",
        "id": 21,
        "sourceId": 132
    }
]
```
### **13. 获取用户的所有扩展属性**
`API-URL：`

>   **GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/{sourceId}/ea

根据用户ID，获取该用户的所有扩展属性列表


**请求参数：**
| 字段        | 类型   |  说明  ||
| :------: | :-----:  | :----:  |:----: |
| sourceId|Long|用户ID|`必选`|

***请求样例：***
```json
GET /sobeyhive-fp/kernel/configs/user/132/ea HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: VwbZKZuIC+oOYzs72WD7q5KvNc8=
Cache-Control: no-cache

```
***返回参数：***
| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| extendAttributes|ExtendAttributeVO[]|用户扩展属性对象数组，详见：**ExtendAttributeVO对象说明**|

***返回样例：***

```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
{
    "GROUP2": [
        {
            "attributeGroup": "GROUP2",
            "attributeKey": "K3",
            "attributeValue": "第三个扩展属性",
            "copyFrom": 0,
            "createTime": "2015-11-26 16:39:41",
            "creatorCode": "admin",
            "description": "NO.3",
            "id": 22,
            "sourceId": 132
        }
    ],
    "GROUP1": [
        {
            "attributeGroup": "GROUP1",
            "attributeKey": "K1",
            "attributeValue": "第一个扩展属性",
            "copyFrom": 0,
            "createTime": "2015-11-26 16:39:41",
            "creatorCode": "admin",
            "description": "NO.1",
            "id": 20,
            "sourceId": 132
        },
        {
            "attributeGroup": "GROUP1",
            "attributeKey": "K2",
            "attributeValue": "第二个扩展属性",
            "copyFrom": 0,
            "createTime": "2015-11-26 16:39:41",
            "creatorCode": "admin",
            "description": "NO.2",
            "id": 21,
            "sourceId": 132
        }
    ]
}
```

### **14. 修改用户扩展属性**
`API-URL：`

>   **PUT** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/{sourceId}/ea

批量修改用户扩展属性

**请求参数：**
| 字段        | 类型   |  说明  ||
| :------: | :-----:  | :----:  |:----: |
| sourceId|Long|用户ID|`必选`|
| extendAttributes|ExtendAttributeVO[]|用户扩展属性对象，详见：**ExtendAttributeVO对象说明**|`必选`|

***请求样例：***
```json
PUT /sobeyhive-fp/kernel/configs/user/132/ea HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: VwbZKZuIC+oOYzs72WD7q5KvNc8=
Cache-Control: no-cache
[
    {
        "attributeKey": "K1-U",
        "attributeValue": "第一个扩展属性-U",
        "attributeGroup": "GROUP1",
        "description": "NO.1-U",
        "id": 2
    },
    {
        "attributeKey": "K2-U",
        "attributeValue": "第二个扩展属性-U",
        "attributeGroup": "GROUP1",
        "description": "NO.2-U",
        "id": 3
    }
]
```
***返回参数：***
| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| extendAttributes|ExtendAttributeVO[]|用户扩展属性对象数组，详见：**ExtendAttributeVO对象说明**|

***返回样例：***

```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
[
    {
        "attributeKey": "K1-U",
        "attributeValue": "第一个扩展属性-U",
        "attributeGroup": "GROUP1",
        "copyFrom": 0,
        "createTime": null,
        "creatorCode": "",
        "description": "NO.1-U",
        "id": 2,
        "sourceId": 132
    },
    {
        "attributeKey": "K2-U",
        "attributeValue": "第二个扩展属性-U",
        "attributeGroup": "GROUP1",
        "copyFrom": 0,
        "createTime": null,
        "creatorCode": "",
        "description": "NO.2-U",
        "id": 3,
        "sourceId": 132
    }
]
```
### **15. 修改扩展属性分组名称**
`API-URL：`

>   **PUT** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/{sourceId}/ea/group

修改用户扩展属性的分组名称

**请求参数：**
| 字段        | 类型   |  说明  ||
| :------: | :-----:  | :----:  |:----: |
| sourceId|Long|用户ID|`必选`|
| oldGroup|string|原分组名称|`必选`|
| newGroup|string|新分组名称|`必选`|

***请求样例：***
```json
PUT /sobeyhive-fp/kernel/configs/user/132/ea/group?oldGroup=GROUP1&newGroup=GROUP1_new HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: VwbZKZuIC+oOYzs72WD7q5KvNc8=
Cache-Control: no-cache
```
***返回参数：***

无

***返回样例：***

```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
```
### **16. 删除用户扩展属性**
`API-URL：`

>   **DELETE** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/{sourceId}/ea/{attributeIds}

根据扩展属性id，批量删除用户扩展属性

**请求参数：**
| 字段        | 类型   |  说明  ||
| :------: | :-----:  | :----:  |:----: |
| sourceId|Long|用户ID|`必选`|
| attributeIds|Long[]|用户扩展属性ID数组|`必选`|

***请求样例：***
```json
DELETE /sobeyhive-fp/kernel/configs/user/132/ea/2,3 HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: fM3LJGvkVw+NTgic7bDITBAmi10=
Cache-Control: no-cache

```
***返回参数：***

无

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
```
### **17. 删除用户一个分组扩展属性**
`API-URL：`

>   **DELETE** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/{sourceId}/ea/group/{attributeGroup}

根据attributeGroup，删除用户一个分组的扩展属性

**请求参数：**
| 字段        | 类型   |  说明  ||
| :------: | :-----:  | :----:  |:----: |
| sourceId|Long|用户ID|`必选`|
| attributeGroup|String|分组|`必选`|

***请求样例：***
```json
DELETE /sobeyhive-fp/kernel/configs/user/132/ea/group/GROUP3 HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: fM3LJGvkVw+NTgic7bDITBAmi10=
Cache-Control: no-cache

```
***返回参数：***

无

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close

```
### **18. 清空用户扩展属性**
`API-URL：`

>   **DELETE** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/{sourceId}/ea

根据用户ID，清空某个用户的扩展属性信息

**请求参数：**
| 字段        | 类型   |  说明  ||
| :------: | :-----:  | :----:  |:----: |
| sourceId|Long|用户ID|`必选`|

***请求样例：***
```json
DELETE /sobeyhive-fp/kernel/configs/user/132/ea HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: fM3LJGvkVw+NTgic7bDITBAmi10=
Cache-Control: no-cache

```
***返回参数：***

无

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
```
### **19. 复制、获得用户扩展属性**
`API-URL：`

>   **POST** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/{fromSourceId}/ea/copy/all

复制一个用户的扩展属性到其他多个用户，从一个用户处获得扩展属性到当前用户。两种操作都会覆盖用户原有的扩展属性.


**请求参数：**
| 字段        | 类型   |  说明  ||
| :------: | :-----:  | :----:  |:----: |
| fromSourceId|Long|源用户ID|`必选`|
| toSourceIds|string[]|目标用户编号数组|`必选`|
| isCoverd|boolean|是否覆盖原有数据，默认为true|`可选`|

***请求样例：***
```json
POST /sobeyhive-fp/kernel/configs/user/132/ea/copy/all?toSourceIds=135,137 HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: fM3LJGvkVw+NTgic7bDITBAmi10=
Cache-Control: no-cache

```
***返回参数：***

无

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
```
### **20. 按属性ID复制扩展属性**
`API-URL：`

>   **POST** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/{fromSourceId}/ea/copy/id

复制一个用户的扩展属性到其他多个用户，从一个用户处获得扩展属性到当前用户。两种操作都会覆盖用户原有的扩展属性.


**请求参数：**
| 字段        | 类型   |  说明  ||
| :------: | :-----:  | :----:  |:----: |
| fromSourceId|Long|源用户ID|`必选`|
| attributeIds|Long[]|源的属性ID数组|`必选`|
| toSourceIds|string[]|目标用户编号数组|`必选`|
| isCoverd|boolean|是否覆盖原有数据，默认为true|`可选`|

***请求样例：***
```json
POST /sobeyhive-fp/kernel/configs/user/132/ea/copy/id?toSourceIds=135,137&attributeIds=34,35,36 HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: fM3LJGvkVw+NTgic7bDITBAmi10=
Cache-Control: no-cache

```
***返回参数：***

无

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
```

### **21. 按GROUP复制扩展属性**
`API-URL：`

>   **POST** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/{fromSourceId}/ea/copy/group

复制一个用户的扩展属性到其他多个用户，从一个用户处获得扩展属性到当前用户。两种操作都会覆盖用户原有的扩展属性.


**请求参数：**
| 字段        | 类型   |  说明  ||
| :------: | :-----:  | :----:  |:----: |
| fromSourceId|Long|源用户ID|`必选`|
| attributeGroups|string[]|源的属性分组名称数组|`必选`|
| toSourceIds|string[]|目标用户编号数组|`必选`|
| isCoverd|boolean|是否覆盖原有数据，默认为true|`可选`|

***请求样例：***
```json
POST /sobeyhive-fp/kernel/configs/user/132/ea/copy/group?toSourceIds=135,137&attributeGroups=GROUP1，GROUP2 HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: fM3LJGvkVw+NTgic7bDITBAmi10=
Cache-Control: no-cache

```
***返回参数：***

无

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
```
-----------------------------------
### **22. 获取用户的私有模板**
`API-URL：`

>   **GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/{userCode}/permission_template/private

获取用户可用的私有模板信息.

+ 普通用户获取用户创建的私有模板。
+ admin用户获取所有的admin模板。


**请求参数：**
| 字段        | 类型   |  说明  ||
| :------: | :-----:  | :----:  |:----: |
| userCode|String|用户编号|`必选`|

***请求样例：***
```json
POST /sobeyhive-fp/kernel/configs/user/132/ea/copy/group?toSourceIds=135,137&attributeGroups=GROUP1，GROUP2 HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: fM3LJGvkVw+NTgic7bDITBAmi10=
Cache-Control: no-cache

```
***返回参数：***

无

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
```
-----------------------------------

### **23. 获取用户总数**
`API-URL：`

>   **GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/count

获取接入系统总数.


**请求参数：**
| 字段        | 类型   |  说明  ||
| :------: | :-----:  | :----:  |:----: |
| disabled|int|禁用状态 -1 全部，0 可用，1 禁用 默认：-1|`可选`|
| userType|int|用户类型 -1 全部，0 普通用户，1 admin用户 默认：-1|`可选`|

***请求样例：***
```json
GET /sobeyhive-fp/kernel/configs/user/count?disabled=-1&userType=-1 HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
Content-Type: application/json
sobeyhive-http-token: i0l7/w8fa8MFfYxyO7GadPArh1s=
sobeyhive-http-tool: Upload
Cache-Control: no-cache
Postman-Token: a78ae286-27ab-0bcc-e492-25faec4ee7f6

```
***返回参数：***

符合条件的系统数量

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close

18
```

### **24. 根据用户ID，获取用户详细**
`API-URL：`

>   **GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/userid/{id}
    
获取用户。如果无此用户，返回404。

**具备Admin组的用户**才能操作，否则将收到401错误提示

**请求参数：**
无

***请求样例：***
```json
GET /sobeyhive-fp/kernel/configs/user/userid/198 HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
Content-Type: application/json
sobeyhive-http-token: i0l7/w8fa8MFfYxyO7GadPArh1s=
sobeyhive-http-tool: Upload
Cache-Control: no-cache
Postman-Token: 04e88f44-2891-7bb8-6439-76ec8291e105

```
***返回参数：***

| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| |UerInfo |见   "**User-API\用户管理\获取用户\返回参数**"|

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
{
    "avatarUrl": null,
    "createTime": "2016-02-16 18:39:12",
    "disabled": 0,
    "email": null,
    "extendAttributes": null,
    "groups": [],
    "id": 198,
    "link": null,
    "loginName": "test_sub_0216",
    "nickName": "test_sub_0216",
    "oldPassword": null,
    "operate": 0,
    "organizations": [
        {
            "id": 1,
            "operate": 0,
            "organizationCode": "root_S1",
            "organizationName": "全部",
            "parentId": -1,
            "siteCode": "S1",
            "siteName": "S1"
        }
    ],
    "parentId": 91,
    "password": "zyli",
    "permissions": [
        {
            "canDelete": true,
            "canExecute": true,
            "canRead": true,
            "canWrite": true,
            "level": 15,
            "templateCode": "private_41c9df79f4ff447790d57a1ac96529d6",
            "templateName": "private_test_sub_0216"
        }
    ],
    "phone": null,
    "pwdChangeTime": "2016-02-16 18:39:12",
    "roles": [],
    "s3accesskeyId": "DATATOM4UAcOR3uLx3bx49kIDdAhaRCAr",
    "s3secretkey": "skGqMOrcnOcu35Z9APzjfCZuauWQ7BWfIsoEJ1FI",
    "siteCode": "S1",
    "siteName": "S1",
    "siteType": 0,
    "storageSize": 20000,
    "storageUsage": null,
    "storageWarningPCT": 0.93,
    "templates": [
        {
            "createTime": "2016-02-16 18:39:12",
            "deleted": 0,
            "id": 7,
            "ownerCode": "41c9df79f4ff447790d57a1ac96529d6",
            "siteCode": "S1",
            "siteName": "S1",
            "templateCode": "private_41c9df79f4ff447790d57a1ac96529d6",
            "templateName": "private_test_sub_0216",
            "templateType": 0
        }
    ],
    "type": 0,
    "userCode": "41c9df79f4ff447790d57a1ac96529d6",
    "userToken": null
}

```

### **25. 根据用户编号，批量获取用户信息**
`API-URL：`

>   **GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/userCodes/{userCodes}
    
根据用户编号，批量获取用户信息。

**具备Admin组的用户**才能操作，否则将收到401错误提示

**请求参数：**
无

***请求样例：***
```json
GET /sobeyhive-fp/kernel/configs/user/userCodes/0ee1ea04ff9c48788b6377817eaae756,admin HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
Content-Type: application/json
sobeyhive-http-token: i0l7/w8fa8MFfYxyO7GadPArh1s=
sobeyhive-http-tool: Upload
Cache-Control: no-cache
Postman-Token: e7be544f-a218-7be6-249e-51fa484c926c

```
***返回参数：***

| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| |UerInfo |见   "**User-API\用户管理\获取用户\返回参数**"|

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
[
    {
        "avatarUrl": null,
        "createTime": "2015-12-11 09:07:01",
        "disabled": 0,
        "email": null,
        "extendAttributes": null,
        "groups": [],
        "id": 67,
        "link": null,
        "loginName": "c",
        "nickName": "c",
        "oldPassword": null,
        "operate": 0,
        "organizations": [],
        "parentId": null,
        "password": "4a8a08f09d37b73795649038408b5f33",
        "permissions": [],
        "phone": null,
        "pwdChangeTime": "2015-12-11 09:07:01",
        "roles": [],
        "s3accesskeyId": "DATATOM4UAcOR3uLx3bx49kIDdAhaRCAr",
        "s3secretkey": "skGqMOrcnOcu35Z9APzjfCZuauWQ7BWfIsoEJ1FI",
        "siteCode": "S1",
        "siteName": "S1",
        "siteType": 0,
        "storageSize": 1,
        "storageUsage": null,
        "storageWarningPCT": null,
        "templates": [],
        "type": 0,
        "userCode": "0ee1ea04ff9c48788b6377817eaae756",
        "userToken": null
    },
    {
        "avatarUrl": null,
        "createTime": "2015-11-09 11:35:11",
        "disabled": 0,
        "email": null,
        "extendAttributes": null,
        "groups": [],
        "id": 1,
        "link": null,
        "loginName": "admin",
        "nickName": "admin",
        "oldPassword": null,
        "operate": 0,
        "organizations": [],
        "parentId": null,
        "password": "21232f297a57a5a743894a0e4a801fc3",
        "permissions": [],
        "phone": null,
        "pwdChangeTime": "2015-11-09 11:35:11",
        "roles": [],
        "s3accesskeyId": "DATATOM4UAcOR3uLx3bx49kIDdAhaRCAr",
        "s3secretkey": "skGqMOrcnOcu35Z9APzjfCZuauWQ7BWfIsoEJ1FI",
        "siteCode": "S1",
        "siteName": "S1",
        "siteType": 0,
        "storageSize": null,
        "storageUsage": null,
        "storageWarningPCT": null,
        "templates": [],
        "type": 0,
        "userCode": "admin",
        "userToken": null
    }
]

```

### **26. 根据用户名称，批量获取用户信息**
`API-URL：`

>   **GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/loginNames/{loginNames}
    
根据用户名称，批量获取用户信息。

**具备Admin组的用户**才能操作，否则将收到401错误提示

**请求参数：**
无

***请求样例：***
```json
GET /sobeyhive-fp/kernel/configs/user/loginNames/test_0216 HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
Content-Type: application/json
sobeyhive-http-token: i0l7/w8fa8MFfYxyO7GadPArh1s=
sobeyhive-http-tool: Upload
Cache-Control: no-cache
Postman-Token: a904249a-3310-cc8d-123d-e54a986c3978

```
***返回参数：***

| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| |UerInfo |见   "**User-API\用户管理\获取用户\返回参数**"|

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
[
    {
        "avatarUrl": null,
        "createTime": "2016-02-16 17:10:24",
        "disabled": 0,
        "email": null,
        "extendAttributs": null,
        "groups": [],
        "id": 197,
        "link": null,
        "loginName": "test_0216",
        "nickName": "zyli",
        "oldPassword": null,
        "operate": 0,
        "organizations": [
            {
                "id": 1,
                "operate": 0,
                "organizationCode": "root_S1",
                "organizationName": "全部",
                "parentId": -1,
                "siteCode": "S1",
                "siteName": "S1"
            }
        ],
        "parentId": null,
        "password": "zyli",
        "permissions": [],
        "phone": null,
        "pwdChangeTime": "2016-02-16 17:10:24",
        "roles": [
            {
                "count": 0,
                "description": "admin",
                "disabled": 0,
                "extendAttributs": null,
                "id": 1,
                "privilegeAdmin": 0,
                "roleCode": "admin_S1",
                "roleName": "admin",
                "roleType": 1,
                "siteCode": "S1",
                "siteName": "S1"
            }
        ],
        "s3accesskeyId": "DATATOM4UAcOR3uLx3bx49kIDdAhaRCAr",
        "s3secretkey": "skGqMOrcnOcu35Z9APzjfCZuauWQ7BWfIsoEJ1FI",
        "siteCode": "S1",
        "siteName": "S1",
        "siteType": 0,
        "storageSize": 10000,
        "storageUsage": null,
        "storageWarningPCT": 0.95,
        "templates": [],
        "type": 1,
        "userCode": "1920e347aecf4ce187eb68d3e93bdc62",
        "userToken": null
    }
]

```

### **27. 仅以登录名为关键字，查询用户列表**
`API-URL：`

>   **GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/userBase
    
仅以登录名为关键字，查询用户列表。

**具备Admin组的用户**才能操作，否则将收到401错误提示

**请求参数：**

| 字段        | 类型   |  说明  ||
| :------: | :-----:  | :----:  | :----:  |
| keyword|string|查询关键字|`可选`|
| disabled|int|是否禁用 -1 全部 0 未禁用 1 禁用|`可选`|
| orderBy|string|排序字段|`可选`|
| sort | enum(string)| asc\desc。默认asc，升序。   |   `可选`  |
|page|long|页码 |`可选`|
|size|int|一页的数量|`可选`|

***请求样例：***
```json
GET /sobeyhive-fp/kernel/configs/userBase?keyword=test_02&page=1&size=20 HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
Content-Type: application/json
sobeyhive-http-token: i0l7/w8fa8MFfYxyO7GadPArh1s=
sobeyhive-http-tool: Upload
Cache-Control: no-cache
Postman-Token: 32899a47-0e6d-45b1-e4d4-0ca89f246e8f

```
***返回参数：***

| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| page|Long |当前页码|
| pageSize|Long |每页显示记录数|
| resultList|UerInfo[] |见   "**User-API\用户管理\获取用户\返回参数**"|
| size|Long |符合条件总记录数|

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
{
  "page": 1,
  "pageSize": 20,
  "resultList": [
    {
      "avatarUrl": null,
      "createTime": "2016-02-16 17:10:24",
      "disabled": 0,
      "email": null,
      "extendAttributes": null,
      "groups": [],
      "id": 197,
      "link": null,
      "loginName": "test_0216",
      "nickName": "zyli",
      "oldPassword": null,
      "operate": 0,
      "organizations": [],
      "parentId": null,
      "password": "",
      "permissions": [],
      "phone": null,
      "pwdChangeTime": "2016-02-16 17:10:24",
      "roles": [],
      "s3accesskeyId": "",
      "s3secretkey": "",
      "siteCode": "S1",
      "siteName": "S1",
      "siteType": 0,
      "storageSize": 10000,
      "storageUsage": null,
      "storageWarningPCT": 0.95,
      "templates": [],
      "type": 0,
      "userCode": "1920e347aecf4ce187eb68d3e93bdc62",
      "userToken": null
    }
  ],
  "size": 1
}

```

### **28. 修改用户基本信息**
`API-URL：`

>   **PUT** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/baseInfo
    
提供给第三方系统，用于用户修改自己的基本信息(昵称、密码、头像URL、电话、Email)。

**请求参数：**

| 字段        | 类型   |  说明  | |
| :------: | :-----:  | :----:  |:----: |
| disabled|int|是否禁用 1禁用 0启用|`可选`|
| password|string|密码，sha256(md5)加密 |`可选`|
| nickname |   string   |   昵称   |`可选`|
| avatarUrl|string|头像URL地址|`可选`|
| email|string|电子邮箱地址|`可选`|
| phone|string|手机号码|`可选`|

***请求样例：***
```json
PUT /sobeyhive-fp/kernel/configs/user/baseInfo HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-token: pcdxR8txJjevZT8dG6MUspTeXzE=
sobeyhive-http-tool: Upload
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 1f2e56f2-4af9-edb7-0c10-9b73958e3e91

 {
    "nickName": "lisj--001",
    "oldPassword": "zyli",
    "password": "zyli1"
  }

```
***返回参数：***

无

***返回样例：***

无

### **29. 根据角色的扩展属性key，获取用户列表**
`API-URL：`

>   **GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/kernel/configs/user/user_role_ea/{attributeGroup}/{attributeKey}
    
根据角色的扩展属性key，得到包含该属性的角色列表，然后获取这些角色包含的所有用户列表。
eaKey-->role-->user

**请求参数：**

| 字段        | 类型   |  说明  ||
| :------: | :-----:  | :----:  | :----:  |
| attributeGroup|string|角色扩展属性分组|`必选`|
| attributeKey|string|角色扩展属性KEY|`必选`|
| keyword|string|查询关键字|`可选`|
| disabled|int|是否禁用 -1 全部 0 未禁用 1 禁用|`可选`|
| orderBy|string|排序字段|`可选`|
| sort | enum(string)| asc\desc。默认asc，升序。   |   `可选`  |
|page|long|页码 |`可选`|
|size|int|一页的数量|`可选`|

***请求样例：***
```json
GET /sobeyhive-fp/kernel/configs/user/user_role_ea/aaaa?keyword=test_02&page=1&size=20 HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
Content-Type: application/json
sobeyhive-http-token: i0l7/w8fa8MFfYxyO7GadPArh1s=
sobeyhive-http-tool: Upload
Cache-Control: no-cache
Postman-Token: 32899a47-0e6d-45b1-e4d4-0ca89f246e8f

```
***返回参数：***

| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| page|Long |当前页码|
| pageSize|Long |每页显示记录数|
| resultList|UerInfo[] |见   "**User-API\用户管理\获取用户\返回参数**"|
| size|Long |符合条件总记录数|

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
{
  "page": 1,
  "pageSize": 20,
  "resultList": [
    {
      "avatarUrl": null,
      "createTime": "2016-02-16 17:10:24",
      "disabled": 0,
      "email": null,
      "extendAttributes": null,
      "groups": [],
      "id": 197,
      "link": null,
      "loginName": "test_0216",
      "nickName": "zyli",
      "oldPassword": null,
      "operate": 0,
      "organizations": [],
      "parentId": null,
      "password": "",
      "permissions": [],
      "phone": null,
      "pwdChangeTime": "2016-02-16 17:10:24",
      "roles": [],
      "s3accesskeyId": "",
      "s3secretkey": "",
      "siteCode": "S1",
      "siteName": "S1",
      "siteType": 0,
      "storageSize": 10000,
      "storageUsage": null,
      "storageWarningPCT": 0.95,
      "templates": [],
      "type": 0,
      "userCode": "1920e347aecf4ce187eb68d3e93bdc62",
      "userToken": null
    }
  ],
  "size": 1
}

```
### **30.获取当前认证用户信息**
`API-URL：`

>   **GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/v1/kernel/configs/user/current
    
获取用户。如果无此用户，返回404。

**请求参数：**
无

***请求样例：***
```json
GET /sobeyhive/v1/kernel/configs/user/current HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
sobeyhive-http-token: WsbdVsXBs2vol8LDWR3jz5IvnNE=
Cache-Control: no-cache
```
***返回参数：***

| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| |UerInfo |见   "**User-API\用户管理\获取用户\返回参数**"|

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close
{
    "avatarUrl": null,
    "createTime": "2016-02-16 18:39:12",
    "disabled": 0,
    "email": null,
    "extendAttributes": {
        "aaaa": [
            {
                "attributeGroup": "aaaa",
                "attributeKey": "a",
                "attributeValue": "b",
                "copyFrom": null,
                "createTime": "2016-02-16 10:45:56",
                "creatorCode": "admin",
                "description": "c",
                "id": 584,
                "sourceId": 198
            },
            {
                "attributeGroup": "aaaa",
                "attributeKey": "d",
                "attributeValue": "e",
                "copyFrom": null,
                "createTime": "2016-02-16 10:46:03",
                "creatorCode": "admin",
                "description": "f",
                "id": 585,
                "sourceId": 198
            }
        ],
        "bbbbbb": [
            {
                "attributeGroup": "bbbbbb",
                "attributeKey": "a",
                "attributeValue": "b",
                "copyFrom": null,
                "createTime": "2016-02-16 10:46:21",
                "creatorCode": "admin",
                "description": "c",
                "id": 586,
                "sourceId": 198
            },
            {
                "attributeGroup": "bbbbbb",
                "attributeKey": "d",
                "attributeValue": "e",
                "copyFrom": null,
                "createTime": "2016-02-16 10:46:25",
                "creatorCode": "admin",
                "description": "f",
                "id": 587,
                "sourceId": 198
            }
        ]
    },
    "groups": [],
    "id": 198,
    "link": null,
    "loginName": "test_sub_0216",
    "nickName": "test_sub_0216",
    "oldPassword": null,
    "operate": 0,
    "organizations": [
        {
            "id": 1,
            "operate": 0,
            "organizationCode": "root_S1",
            "organizationName": "全部",
            "parentId": -1,
            "siteCode": "S1",
            "siteName": "S1"
        }
    ],
    "parentId": 91,
    "password": "",
    "permissions": [],
    "phone": null,
    "pwdChangeTime": "2016-02-16 18:39:12",
    "roles": [
        {
            "count": 0,
            "description": "admin",
            "disabled": 0,
            "extendAttributes": null,
            "id": 1,
            "privilegeAdmin": 0,
            "roleCode": "admin_S1",
            "roleName": "admin",
            "roleType": 1,
            "siteCode": "S1",
            "siteName": "S1"
        }
    ],
    "s3accesskeyId": "",
    "s3secretkey": "",
    "siteCode": "S1",
    "siteName": "S1",
    "siteType": 0,
    "storageSize": 20000,
    "storageUsage": null,
    "storageWarningPCT": 0.92,
    "templates": [],
    "type": 1,
    "userCode": "41c9df79f4ff447790d57a1ac96529d6",
    "userToken": null
}

```
-----------------------------------

## **用户认证**
### **1. 用户认证**
`API-URL：`

>   **GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/authentication?authinfo
    
认证一个用户。

**authinfo参数：**

| 字段        | 类型   |  说明  | |
| :------: | :-----:  | :----:  |:----:|
|loginname |string|用户loginname|`必选`|
|password |string|密码。sha256(md5)|`必选`|

***请求样例：***
```json
GET /sobeyhive/kernel/configs/user/authentication?loginName=lisj_test_005&password=pass2word HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
sobeyhive-http-tool: Upload
Content-Type: application/json
Cache-Control: no-cache
```

**返回参数--Authentication**：
| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| userToken|string|用户访问令牌|

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close

{
    "createTime": "2015-11-09 11:35:11",
    "disabled": 0,
    "id": 1,
    "link": "",
    "loginName": "admin",
    "nickName": "admin",
    "oldPassword": "",
    "operate": 0,
    "organizations": [],
    "parentId": -1,
    "password": "admin",
    "permissions": [],
    "roles": [],
    "s3accesskeyId": "",
    "s3secretkey": "",
    "siteCode": "S1",
    "storageSize": 10000,
    "storageUsage": 0,
    "type": 1,
    "userCode": "admin",
    "userToken": "Ixz5WVont0vaokjnBesMVusF7PI="
}
```
### **2. 获取用户权限**
`API-URL：`

>   **GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/{userCode}/permissions
    
获取用户拥有的权限信息。如果是admin用户（admin拥有最高权限。不需要通过权限模板判断），直接返回空。

**请求参数：**

| 字段        | 类型   |  说明  | |
| :------: | :-----:  | :----:  |:----:|
|userCode |string|用户编号|`必选`|

***请求样例：***
```json
GET /sobeyhive-fp/kernel/configs/user/f4170639a314424495dda9cd42f54b54/permissions HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
Content-Type: application/json
sobeyhive-http-token: SjUAxwMUwkpuY+CNt1daEMoVAVE=
sobeyhive-http-tool: Upload
Cache-Control: no-cache
```

**返回参数--PermissionLevelVO[]**：
| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| templateCode|string|权限编号|
| templateName|string|权限名称|
| level|int|权限级别|

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close

[
    {
        "level": 15,
        "templateCode": "e0cbd8b866b5482484e18ee1612e25d3",
        "templateName": "私有模板_user_test_001"
    }，
    {
        "level": 3,
        "templateCode": "12468b866b54823654634ee1612e25d3",
        "templateName": "张三的音视频私有模板"
    }，
    {
        "level": 3,
        "templateCode": "asdfasb5482484e18ee1asd2342356n4",
        "templateName": "李四的图片素有模板"
    }
]
```
### **3. 获取用户的权限用户组**
`API-URL：`

>   **GET** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/configs/user/{userCode}/groups
    
获取用户关联的所有权限用户组列表。

**请求参数：**

| 字段        | 类型   |  说明  | |
| :------: | :-----:  | :----:  |:----:|
|userCode |string|用户编号|`必选`|

***请求样例：***
```json
GET /sobeyhive-fp/kernel/configs/user/admin/groups HTTP/1.1
Host: localhost:8080
sobeyhive-http-system: Nebula
sobeyhive-http-site: S1
Content-Type: application/json
sobeyhive-http-token: i0l7/w8fa8MFfYxyO7GadPArh1s=
sobeyhive-http-tool: Upload
Cache-Control: no-cache
Postman-Token: 17849041-02cf-ff6f-287c-c1f23924d79c

```

**返回参数--PermissionLevelVO[]**：
| 字段        | 类型   |  说明  |
| :------: | :-----:  | :----:  |
| groupCode|string|权限用户组编号|
| groupName|string|权限用户组名称|
| level|int|权限用户组级别|

***返回样例：***
```json
HTTP/1.1 200 OK
Date: Wed, 01 Mar  2006 12:00:00 GMT
Content-Length: 0
Content-Type: application/json
Connection: close

[
    {
        "canDelete": false,
        "canExecute": false,
        "canRead": true,
        "canWrite": true,
        "groupCode": "d8780ef36b65498f9364e449620b37da",
        "groupName": "test_second_group",
        "level": 3
    },
    {
        "canDelete": false,
        "canExecute": false,
        "canRead": true,
        "canWrite": false,
        "groupCode": "c68cf27269eb412b859a599d9edc654e",
        "groupName": "1",
        "level": 1
    },
    {
        "canDelete": false,
        "canExecute": false,
        "canRead": true,
        "canWrite": false,
        "groupCode": "18783f53539c4b21b9a3bcfb204488a8",
        "groupName": "2",
        "level": 1
    },
    {
        "canDelete": false,
        "canExecute": false,
        "canRead": true,
        "canWrite": false,
        "groupCode": "1c117a2a0e384e6fb14024defc2cde7b",
        "groupName": "3",
        "level": 1
    },
    {
        "canDelete": false,
        "canExecute": false,
        "canRead": true,
        "canWrite": false,
        "groupCode": "27a442bde83c4882bf1bf24f0ec13357",
        "groupName": "4",
        "level": 1
    },
    {
        "canDelete": false,
        "canExecute": false,
        "canRead": true,
        "canWrite": false,
        "groupCode": "20b8662fe1844cafa6d28f6e272904d8",
        "groupName": "5",
        "level": 1
    },
    {
        "canDelete": false,
        "canExecute": false,
        "canRead": true,
        "canWrite": false,
        "groupCode": "d222832556d941d0a27dd97eb0ab0988",
        "groupName": "6",
        "level": 1
    },
    {
        "canDelete": false,
        "canExecute": false,
        "canRead": true,
        "canWrite": false,
        "groupCode": "a3d7dac7aa1344be9be6f56e040a30d4",
        "groupName": "1111",
        "level": 1
    }
]
```