// ConsoleApplication3.cpp : 定义控制台应用程序的入口点。
//

#include "stdafx.h"
 #include <Windows.h>
#include "ETNXVideoStandardDef.h"


int _tmain(int argc, _TCHAR* argv[])
{
	printf("sss");
   	
	ET_VIDEO_HS_CLASS result =  ET_VideoStandardGetHSClass(1109461057);
	printf("result = %d",result);
	printf("sss");

SYSTEMTIME curTime;

GetLocalTime(&curTime);

CString strCurTime;

strCurTime.Format(_T("d/d/d d:d:d"), curTime.wYear, curTime.wMonth,
curTime.wDay, curTime.wHour, curTime.wMinute,
curTime.wSecond);






	return 0;
}

