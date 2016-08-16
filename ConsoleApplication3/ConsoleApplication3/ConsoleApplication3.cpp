// ConsoleApplication3.cpp : 定义控制台应用程序的入口点。
//

#include "stdafx.h"
#include "ETNXVideoStandardDef.h"


int _tmain(int argc, _TCHAR* argv[])
{
	printf("sss");
   	
	ET_VIDEO_HS_CLASS result =  ET_VideoStandardGetHSClass(1109461057);
	printf("result = %d",result);
	printf("sss");
	return 0;
}

