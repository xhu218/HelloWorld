// stdafx.h : 标准系统包含文件的包含文件，
// 或是经常使用但不常更改的
// 特定于项目的包含文件
//

#pragma once

#include "targetver.h"
#include "ole2.h"

#define WIN32_LEAN_AND_MEAN             // 从 Windows 头中排除极少使用的资料
// Windows 头文件:
#include <windows.h>

typedef /* [public][public][public][public] */ struct  __MIDL___MIDL_itf_AKEnvelopeCom_0000_0026
    {
    BSTR strSrcAKGroup;
    BSTR strObjectName;
    BSTR strObjectCategory;
    BSTR strInstanceID;
    int nFileNumber;
    }	OBJECT_SUMMARY;

// TODO: 在此处引用程序需要的其他头文件
extern "C" void Say(char* szWords,int nLen);                           //声明Say导出函数
extern "C" float Sum(float fNum1,float fNum2);						   //声明Sum导出函数
extern "C" bool Test1(int a,OBJECT_SUMMARY & b,BSTR c);

