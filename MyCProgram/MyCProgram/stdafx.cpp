// stdafx.cpp : 只包括标准包含文件的源文件
// MyCProgram.pch 将作为预编译头
// stdafx.obj 将包含预编译类型信息

#include "stdafx.h"

// TODO: 在 STDAFX.H 中
// 引用任何所需的附加头文件，而不是在此文件中引用




void Say(char* szWords,int nLen)
{
    strcpy(szWords,"Hello,World!");
    strcat(szWords,"\0");
}

float Sum(float fNum1,float fNum2)
{
    return fNum1+fNum2;
}

bool Test1(int a,OBJECT_SUMMARY & b,BSTR c ,int length)
{
		return a;
}