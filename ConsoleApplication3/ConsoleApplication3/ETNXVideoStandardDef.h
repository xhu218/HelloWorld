//////////////////////////////////////////////////////////////////////////
//ETVideoStandardDef.h
//////////////////////////////////////////////////////////////////////////
#ifndef		__ET_NX_VIDEOSTANDARDDEF_H__
#define		__ET_NX_VIDEOSTANDARDDEF_H__
//////////////////////////////////////////////////////////////////////////
#include <tchar.h>
#include <math.h>
#include "windows.h"
#include <atlstr.h>

//※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※
// 以下为对外定义的结构、枚举类型和API函数
//※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※

typedef DWORD ET_VIDEO_HS_CLASS;
enum eEP_VIDEO_HS_CLASS
{
	ET_VIDEO_HS_UNKNOWN,
	ET_VIDEO_HS_SD,
	ET_VIDEO_HS_HD720p,
	ET_VIDEO_HS_HD1080i,
	ET_VIDEO_HS_HD1080p,
	ET_VIDEO_HS_HD1440i,
	ET_VIDEO_HS_4K,

	ET_3D_HS_SD,
	ET_3D_HS_HD720p,
	ET_3D_HS_HD1080i,
	ET_3D_HS_HD1080p,
	ET_3D_HS_HD1440i,
	ET_3D_HS_4K,
};

//enum eFPSType //ljj@2013-10-18: move to NXE7VideoStandardDef.h
//{
//	_50i_,
//	_59_94i_,
//	_23_98p_,
//	_59_94p_,
//	_25p_,	
//	_29_97p_,
//	_24p_,
//	_50p_,
//	_60i_,
//	_30p_,
//	_60p_,
//};


#define ET_ST_RATE_25				50		// PAL field frequency
#define	ET_ST_FRAME_RATE_25			25		// PAL frame  frequency
#define ET_ST_SCALE_25				1		// PAL scale

#define ET_ST_RATE_50				100		// PAL field frequency
#define	ET_ST_FRAME_RATE_50			50		// PAL frame  frequency
#define ET_ST_SCALE_50				1		// PAL scale

#define ET_ST_RATE_2997				5994	// NTSC field frequency
#define	ET_ST_FRAME_RATE_2997		2997	// NTSC frame  frequency
#define ET_ST_SCALE_2997			100		// NTSC scale

#define ET_ST_RATE_5994	            11988	// NTSC field  frequency
#define ET_ST_FRAME_RATE_5994	    5994	// NTSC frame  frequency
#define ET_ST_SCALE_5994			100		// NTSC scale

#define ET_ST_RATE_60				120		// 30-F field frequency
#define	ET_ST_FRAME_RATE_60			60		// 30-F frame frequency
#define ET_ST_SCALE_60				1		// 30-F scale

#define ET_ST_RATE_30				60		// 30-F field frequency
#define	ET_ST_FRAME_RATE_30			30		// 30-F frame frequency
#define ET_ST_SCALE_30				1		// 30-F scale

#define ET_ST_RATE_24				48		// 24-F field frequency
#define	ET_ST_FRAME_RATE_24			24		// 24-F field frequency
#define ET_ST_SCALE_24			    1		// 24-F scale

#define ET_ST_RATE_2398				48000	// 2398-F field frequency
#define	ET_ST_FRAME_RATE_2398		24000	// 2398-F frame frequency
#define ET_ST_SCALE_2398			1001    // 2398-F scale

//wgf on 2012-01-12
#define ET_ST_RATE_22				44		// 22-F field frequency
#define	ET_ST_FRAME_RATE_22			22		// 22-F frame frequency
#define ET_ST_SCALE_22				1		// 22-F scale

#define ET_ST_RATE_21				42		// 21-F field frequency
#define	ET_ST_FRAME_RATE_21			21		// 21-F frame frequency
#define ET_ST_SCALE_21				1		// 21-F scale

#define ET_ST_RATE_20				40		// 20-F field frequency
#define	ET_ST_FRAME_RATE_20			20		// 20-F frame frequency
#define ET_ST_SCALE_20				1		// 20-F scale

#define ET_ST_RATE_19				38		// 19-F field frequency
#define	ET_ST_FRAME_RATE_19			19		// 19-F frame frequency
#define ET_ST_SCALE_19				1		// 19-F scale

#define ET_ST_RATE_18				36		// 18-F field frequency
#define	ET_ST_FRAME_RATE_18			18		// 18-F frame frequency
#define ET_ST_SCALE_18				1		// 18-F scale

#define ET_ST_RATE_17				34		// 17-F field frequency
#define	ET_ST_FRAME_RATE_17			17		// 17-F frame frequency
#define ET_ST_SCALE_17				1		// 17-F scale

#define ET_ST_RATE_16				32		// 16-F field frequency
#define	ET_ST_FRAME_RATE_16			16		// 16-F frame frequency
#define ET_ST_SCALE_16				1		// 16-F scale

#define ET_ST_RATE_15				30		// 15-F field frequency
#define	ET_ST_FRAME_RATE_15			15		// 15-F frame frequency
#define ET_ST_SCALE_15				1		// 15-F scale

#define FRAMES_SECOND_25			25L      // 25 Frame: frames per second    
#define FRAMES_MINUTE_25			1500L    // 25 Frame: frames per minute
#define FRAMES_HOUR_25				90000L   // 25 Frame: frames per hour

#define FRAMES_SECOND_24			24L      // 24 Frame: frames per second    
#define FRAMES_MINUTE_24			1440L    // 24 Frame: frames per minute
#define FRAMES_HOUR_24				86400L   // 24 Frame: frames per hour

#define FRAMES_SECOND_NODROP_30		30L      // 30 NO_DROP Frame: frames per second    
#define FRAMES_MINUTE_NODROP_30		1800L    // 30 NO_DROP Frame: frames per minute
#define FRAMES_HOUR_NODROP_30		108000L   // 30 NO_DROP Frame: frames per hour

#define FRAMES_MINUTE_30_DROP		1798L    // 30 DROP Frame: frames per minute
#define FRAMES_10MINUTES_30_DROP	17982L   // 30 DROP Frame: frames per 10 minutes
#define FRAMES_HOUR_30_DROP			107892L   // 30 DROP Frame: frames per hour

#define FRAMES_SECOND_50			50L      // 50 Frame: frames per second    
#define FRAMES_MINUTE_50			3000L    // 50 Frame: frames per minute
#define FRAMES_HOUR_50				180000L  // 50 Frame: frames per hour
//////////////////////////////////////////////////////////////////////////
//数据结构定义
//////////////////////////////////////////////////////////////////////////

#pragma pack(push)
#pragma pack(1)

//宽幅定义
struct ETASPECT
{
	short	nWidth;				//宽
	short	nHeight;			//高

	ETASPECT & operator= (const ETASPECT &other)
	{
		if (this == &other)
			return *this;

		nWidth = other.nWidth;
		nHeight = other.nHeight;

		return *this;
	}

	BOOL operator == (const ETASPECT &other) const
	{
		return nWidth == other.nWidth && nHeight == other.nHeight;
	}
};
const short  G_WIDTH_ARRAY[] = {0, 720, 1920, 1440, 1280, 4096, 960, 640, 320,360, 180, 240, 480, 160, 800, 1024, 1366, 2048,3840};
#define ET_WIDTH_NUM  (sizeof(G_WIDTH_ARRAY)/sizeof(short))

const short  G_HEIGHT_ARRAY[] = {0,  576, 1080, 720, 480, 486, 960, 2664, 2304, 3072, 240, 360, 288, 608, 320, 304, 600, 768, 1536, 400, 640,2160};
#define ET_HEIGHT_NUM (sizeof(G_HEIGHT_ARRAY) / sizeof(short))

//扫描模式定义
typedef DWORD ETPSCANMODE;
enum ET_SCANMODE //对应类型ETPSCANMODE
{
	ET_ScanMode_Invalid			= 0,
	ET_ScanMode_Interlaced		= 1,				//隔行扫描,同时意为顶场优先
	ET_ScanMode_Progressive		= 2,				//逐行扫描

	//[[ljj@2011-9-15:新增定义：隔行，底场优先。ET_ScanMode_Interlaced意为隔行，顶场优先。
	ET_ScanMode_Interlaced_BottomFirst	= 3,
	//]]
	ET_ScanMode_Max,
};

//帧率定义
struct ETFRAMERATE
{
	ETPSCANMODE	eScanMode;		//扫描模式
	short	nTimeRate;			//帧率分子
	short	nTimeScale;			//帧率分母
	ETFRAMERATE & operator= (const ETFRAMERATE &other)
	{
		if (this == &other)
			return *this;

		eScanMode = other.eScanMode;
		nTimeScale = other.nTimeScale;
		nTimeRate = other.nTimeRate;

		return *this;
	}
	BOOL operator== (const ETFRAMERATE & other) const
	{
		return eScanMode == other.eScanMode && nTimeRate == other.nTimeRate && nTimeScale == other.nTimeScale;
	}
};
const ETFRAMERATE G_ET_FRAMERATE_ARRAY[] =
{
	{ET_ScanMode_Interlaced,  0,    1  } ,
	{ET_ScanMode_Interlaced,  ET_ST_FRAME_RATE_25,	 ET_ST_SCALE_25} ,
	{ET_ScanMode_Interlaced,  ET_ST_FRAME_RATE_2997, ET_ST_SCALE_2997} ,
	{ET_ScanMode_Progressive, ET_ST_FRAME_RATE_25,	 ET_ST_SCALE_25} ,
	{ET_ScanMode_Progressive, ET_ST_FRAME_RATE_2398, ET_ST_SCALE_2398} ,
	{ET_ScanMode_Progressive, ET_ST_FRAME_RATE_24,   ET_ST_SCALE_24  } ,
	{ET_ScanMode_Progressive, ET_ST_FRAME_RATE_2997, ET_ST_SCALE_2997} ,
	{ET_ScanMode_Progressive, ET_ST_FRAME_RATE_30,	 ET_ST_SCALE_30  } ,
	{ET_ScanMode_Progressive, ET_ST_FRAME_RATE_50,	 ET_ST_SCALE_50  } ,
	{ET_ScanMode_Progressive, ET_ST_FRAME_RATE_5994, ET_ST_SCALE_5994} ,
	{ET_ScanMode_Interlaced,  ET_ST_FRAME_RATE_30,	 ET_ST_SCALE_30} ,
	{ET_ScanMode_Progressive, ET_ST_FRAME_RATE_60,	 ET_ST_SCALE_60  } ,

	//[[ljj@2011-9-19,add new interlaced_bottomfirst
	{ET_ScanMode_Interlaced_BottomFirst,  ET_ST_FRAME_RATE_25,	 ET_ST_SCALE_25} ,
	{ET_ScanMode_Interlaced_BottomFirst,  ET_ST_FRAME_RATE_2997, ET_ST_SCALE_2997} ,
	{ET_ScanMode_Interlaced_BottomFirst,  ET_ST_FRAME_RATE_30,	 ET_ST_SCALE_30} ,
	//]]

	{ET_ScanMode_Progressive, ET_ST_FRAME_RATE_22,   ET_ST_SCALE_22  } ,
	{ET_ScanMode_Progressive, ET_ST_FRAME_RATE_21,   ET_ST_SCALE_21  } ,
	{ET_ScanMode_Progressive, ET_ST_FRAME_RATE_20,   ET_ST_SCALE_20  } ,
	{ET_ScanMode_Progressive, ET_ST_FRAME_RATE_19,   ET_ST_SCALE_19  } ,
	{ET_ScanMode_Progressive, ET_ST_FRAME_RATE_18,   ET_ST_SCALE_18  } ,
	{ET_ScanMode_Progressive, ET_ST_FRAME_RATE_17,   ET_ST_SCALE_17  } ,
	{ET_ScanMode_Progressive, ET_ST_FRAME_RATE_16,   ET_ST_SCALE_16  } ,
	{ET_ScanMode_Progressive, ET_ST_FRAME_RATE_15,   ET_ST_SCALE_15  } ,
};
#define ET_FRAMERATE_NUM (sizeof(G_ET_FRAMERATE_ARRAY) / sizeof(ETFRAMERATE))

//DAR定义(显示宽高比)
typedef DWORD ET_ASPECTRATIO;
enum eET_ASPECTRATIO //对应类型ET_ASPECTRATIO
{
	ET_AspectRatio_Unknown		= 0,
	ET_AspectRatio_4_3			= 1,	//4:3
	ET_AspectRatio_16_9			= 2,	//16:9
	ET_AspectRatio_1_1			= 3,	//1:1
	ET_AspectRatio_MAX,
};

//视窗定义
typedef BYTE ETPVIEW;
const ETPVIEW G_VIEW_ARRAY[] = {0, 1, 2, 4, 8, 16, 32,};
#define ET_VIEW_NUM	 (sizeof(G_VIEW_ARRAY)/sizeof(ETPVIEW))

//位数定义
typedef BYTE ETPBITCOUNT;
const ETPBITCOUNT  G_BITCOUNT_ARRAY[] = {0, 8, 10, 12 ,16};
#define ET_BITCOUNT_NUM  (sizeof(G_BITCOUNT_ARRAY)/sizeof(ETPBITCOUNT))

//视频制式（信息）定义
struct ETVIDEOSTANDARDINFO
{
	BYTE		nVersion;		//版本号
	ETASPECT	tpAspect;		//宽高
	ETFRAMERATE	tpFrameRate;	//帧率
	BYTE		eAspectRatio;	//ET_ASPECTRATIO
	ETPVIEW		eView;			//视窗个数(1=单窗口,2=普通3D窗口,4,6,8...=MultiView)
	ETPBITCOUNT	eBitCount;		//位数定义

	void Reset()
	{
		nVersion = 1;
		tpAspect.nWidth = 0;
		tpAspect.nHeight = 0;
		tpFrameRate.eScanMode = 0;
		tpFrameRate.nTimeRate = 0;
		tpFrameRate.nTimeScale = 1;
		eAspectRatio = 0;
		eView = 0;
		eBitCount = 0;
	}

	ETVIDEOSTANDARDINFO & operator= (const ETVIDEOSTANDARDINFO & other)
	{
		if (this == &other)
			return *this;

		nVersion = other.nVersion;
		tpAspect = other.tpAspect;
		tpFrameRate = other.tpFrameRate;
		eAspectRatio = other.eAspectRatio;
		eView = other.eView;
		eBitCount = other.eBitCount;

		return *this;
	}

	BOOL operator== (const ETVIDEOSTANDARDINFO &other) const
	{
		return  tpAspect == other.tpAspect
			&& tpFrameRate == other.tpFrameRate
			&& eAspectRatio == other.eAspectRatio
			&& eView == other.eView
			&& eBitCount == other.eBitCount;
			// && nVersion == other.nVersion;
	}
};

#pragma pack(pop)

//视频制式（索引）定义
/*
  为了与老版本兼容,有以下约定：
  (1) 前两BIT = 00, 则兼容以前版本的制式定义
  (2) 前两BIT = 01, 则为支持P制的制式定义
*/

//不能使用 | & 操作，必须转换成ET_VIDEO_STANDARD_EX才能进行| &操作
typedef DWORD ET_VIDEO_STANDARD; 

typedef struct tag_ET_VIDEOSTANDARD_DESCRIPTION
{
	ET_VIDEO_STANDARD        dwVideoStandard;
	ET_VIDEO_HS_CLASS		 dwHSClass;
	LPTSTR					 strTitle;
}ET_VIDEOSTANDARD_DESCRIPTION;
//////////////////////////////////////////////////////////////////////////
//枚举数据定义
//////////////////////////////////////////////////////////////////////////

enum	emETVideoStandard	// 桌面视频制式标准枚举定义
{
	//【老制式，保留之前的值，以便与其他软件进行互联时制式兼容】
	ET_VideoStandard_UNKNOW				= 0x00000000,		//Invalid

	ET_VideoStandard_PAL				= 0x00000001,		//PAL size:720*576 f/s : 25
	ET_VideoStandard_NTSC_2997			= 0x00000002,		//NTSC size:720*486  f/s : 29.97
	ET_VideoStandard_NTSC_30			= 0x00000004,		//NTSC size:720*486 f/s : 30 
	ET_VideoStandard_SECAM				= 0x00000008,		//SECAM

	ET_VideoStandard_1920_1080_50i		= 0x00000010,		//HDTV size:1920*1080 f/s : 25  interlaced
	ET_VideoStandard_1920_1080_5994i	= 0x00000020,		//HDTV size:1920*1080 f/s : 29.97 interlaced
	ET_VideoStandard_1920_1080_60i		= 0x00000040,		//HDTV size:1920*1080 f/s : 30 interlaced

	ET_VideoStandard_1920_1080_2398p	= 0x00000080,		//HDTV size:1920*1080 f/s : 23.98 progressive
	ET_VideoStandard_1920_1080_24p		= 0x00000100,		//HDTV size:1920*1080 f/s : 24 progressive
	ET_VideoStandard_1920_1080_25p		= 0x00000200,		//HDTV size:1920*1080 f/s : 25 progressive
	ET_VideoStandard_1920_1080_2997p	= 0x00000400,		//HDTV size:1920*1080 f/s : 29.97 progressive
	ET_VideoStandard_1920_1080_30p		= 0x00000800,		//HDTV size:1920*1080 f/s : 30 progressive

	ET_VideoStandard_1280_720_2398p		= 0x00001000,	    //HDTV size:1280*720 f/s : 23.98 progressive
	ET_VideoStandard_1280_720_24p		= 0x00002000,		//HDTV size:1280*720 f/s : 24 progressive
	ET_VideoStandard_1280_720_50p		= 0x00004000,		//HDTV size:1280*720 f/s : 50 progressive
	ET_VideoStandard_1280_720_5994p		= 0x00008000,		//HDTV size:1280*720 f/s : 59.94 progressive

	ET_VideoStandard_1440_1080_50i		= 0x00010000,	    //HD  size:1440*1080 f/s : 25 interlaced
	ET_VideoStandard_1440_1080_5994i	= 0x00020000,	    //HD  size:1440*1080 f/s : 29.97 interlaced
	ET_VideoStandard_1440_1080_60i		= 0x00040000,	    //HD  size:1440*1080 f/s : 30 interlaced

	ET_VideoStandard_PAL_16_9			= 0x00080000,		//PAL size:720*576 f/s : 25  
	ET_VideoStandard_NTSC_2997_16_9		= 0x00100000,		//NTSC size:720*486  f/s : 29.97
	ET_VideoStandard_NTSC_30_16_9		= 0x00200000,		//NTSC size:720*486 f/s : 30 
	ET_VideoStandard_NTSC_2997_480		= 0x00400000,		//NTSC size:720*480  f/s : 29.97  //先留着，防止以后特殊情况再改成480
	ET_VideoStandard_NTSC_30_480		= 0x00800000,		//NTSC size:720*480 f/s : 30 //先留着，防止以后特殊情况再改成480
    ET_VIDEOSTANDARD_1280_1080_50i      = 0x01000000,       //HD  size:1280*1080 f/s : 25 interlaced
    ET_VIDEOSTANDARD_PAL_25P            = 0x10001000,      //PAL size:720*576 f/s : 25
    ET_VIDEOSTANDARD_PAL_25P_16_9       = 0x10004000,
	ET_VIDEOSTANDARD_PAL_50P            = 0x10000100,      //PAL size:720*576 f/s : 50
	ET_VIDEOSTANDARD_PAL_50P_16_9       = 0x10000400,
	ET_VIDEOSTANDARD_1440_1080_50p      = 0x10000010,     //
	ET_VIDEOSTANDARD_1440_1080_25p      = 0x10000040,     //
	ET_VIDEOSTANDARD_1920_1080_50p      = 0x10000004,      //
	ET_VIDEOSTANDARD_1280_720_25p       = 0x10000001,      //

	//新定义的宏【仅供E7使用】
//	ET_VideoStandard_1280_720_25p		= 0x434120c1, //ljj@2013-11-20: change standard value 0x434120c1 to NS value.符合新定义模式的值，从文件中读取出来可以自然被正确解释。NS的值属于老的定义模式，需要下面的数组进行翻译。
	ET_VideoStandard_4096_2304_25p		= 0x43412a01,
	ET_VideoStandard_4096_3072_25p		= 0x43212a41,
//	ET_VideoStandard_1280_720_2997p		= 0x464120c1,//ljj@2013-11-20: change 0x464120c1 to NS value

	//[[ljj@2013-11-20: from NS value.
	//ET_VideoStandard_1280_720_25p		= 0x10000001,		//
	//ET_VideoStandard_1280_720_2997p		= 0x10000002,		//

	ET_VideoStandard_1920_1080_50p		= 0x10000004,		//
	ET_VideoStandard_1920_1080_5994p	= 0x10000008,		//

	ET_VideoStandard_1440_1080_50p		= 0x10000010,	    //
	ET_VideoStandard_1440_1080_5994p	= 0x10000020,	    //
	ET_VideoStandard_1440_1080_25p		= 0x10000040,	    //
	ET_VideoStandard_1440_1080_2997p	= 0x10000080,	    //

	ET_VideoStandard_PAL_50P			= 0x10000100,		//PAL size:720*576 f/s : 25
	ET_VideoStandard_NTSC_5994P			= 0x10000200,		//NTSC size:720*486  f/s : 29.97
	ET_VideoStandard_PAL_50P_16_9		= 0x10000400,		
	ET_VideoStandard_NTSC_5994P_16_9	= 0x10000800,		

	ET_VideoStandard_PAL_25P			= 0x10001000,		//PAL size:720*576 f/s : 25
	ET_VideoStandard_NTSC_2997P			= 0x10002000,		//NTSC size:720*486  f/s : 29.97
	ET_VideoStandard_PAL_25P_16_9		= 0x10004000,		
	ET_VideoStandard_NTSC_2997P_16_9	= 0x10008000,	
	//]]ljj:from NS value end.

	//[[ljj@2014-1-7: from NS & nova value.
	ET_VideoStandard_1280_1080_50i      = 0x41412081,
	ET_VideoStandard_1280_1080_5994i    = 0x42412081,
	ET_VideoStandard_1280_1080_60i      = 0x4a412081,

	//for 广电
	ET_VideoStandard_1280_720_25p       = 0x01000000,                   //HDTV size:1280*720 f/s : 25 progressive
	ET_VideoStandard_1280_720_2997p     = 0x02000000,               //HDTV size:1280*720 f/s : 2997 progressive

	//for 海外
	ET_VideoStandard_1280_720_25pex     = 0x10000001,      //
	ET_VideoStandard_1280_720_2997pex   = 0x10000002,      //
	//]]
};

//////////////////////////////////////////////////////////////////////////
//与函数相关的定义
//////////////////////////////////////////////////////////////////////////

//返回值类型定义
typedef DWORD VS_RESULT;
enum eETVS_RESULT
{
	ETVS_OK						    = 0x00000000,		//OK
	ETVS_VERSION_NG				    = 0x00000001,		//版本号不支持
	ETVS_WIDTH_NG					= 0x00000002,		//宽度不合标准
	ETVS_HEIGHT_NG				    = 0x00000004,		//高度不合标准
	ETVS_FRAMERATE_NG				= 0x00000008,		//帧率不合标准
	ETVS_DAR_NG					    = 0x00000010,		//DAR不合标准
	ETVS_VIEW_NG					= 0x00000020,		//视窗个数不合标准
	ETVS_VESION1_NG				    = 0x00000040,		//老版本的定义不合法
	ETVS_BITCOUNT_NG				= 0x00000080,       //BitCount不合标准
};

//API函数定义
inline VS_RESULT ETCheckVideoStandard(IN ET_VIDEO_STANDARD dwStandard);														//检查制式是否合法

inline VS_RESULT ETGetVideoApsect(IN ET_VIDEO_STANDARD dwStandard, OUT ETASPECT& tpAspect);									//由制式得到宽高
inline VS_RESULT ETGetVideoFrameRate(IN ET_VIDEO_STANDARD dwStandard,OUT ETFRAMERATE& tpFrameRate);							//由制式得到帧率
inline VS_RESULT ETGetVideoAspectRatio(IN ET_VIDEO_STANDARD dwStandard, OUT ET_ASPECTRATIO& eAspectRatio);					//由制式得到DAR
inline BOOL		 IsETApsectRatioEuqal(IN ET_VIDEO_STANDARD dwStandard, IN ET_ASPECTRATIO eAspectRatio);								//判断幅面
inline VS_RESULT ETGetVideoView(IN ET_VIDEO_STANDARD dwStandard, OUT ETPVIEW& eView);										//由制式得到视窗个数
inline VS_RESULT ETGetVideoBitCount(IN ET_VIDEO_STANDARD dwStandard, OUT ETPBITCOUNT& eBitCount);							//由制式得到位数

inline ET_VIDEO_STANDARD	  ET_GetOldStandard(ET_VIDEO_STANDARD dwStandard);
inline ET_VIDEO_STANDARD	  ET_VS(long lWidth, long lHeight, ET_ASPECTRATIO eAspectRatio, long lViewCount, double dbFrameRate, ETPSCANMODE eScanMode, long eBitCount); //ljj@2010-12-31:根据值来整合制式
inline ET_VIDEO_STANDARD      ET_VS(IN const ETVIDEOSTANDARDINFO& tpStandardInfo);			//制式信息 -> 新制式
inline ETVIDEOSTANDARDINFO    ET_VSI(IN ET_VIDEO_STANDARD dwStandard);						//新制式   -> 制式信息

inline double ETGetFrameRate(IN ET_VIDEO_STANDARD dwStandard); //ljj@2011-1-5:得到double的frameRate。
inline ETPSCANMODE ETGetScanMode(IN ET_VIDEO_STANDARD dwStandard);//ljj@2011-1-5:得到扫描类型

inline	BOOL ET_VideoStandardIsHD(ET_VIDEO_STANDARD vStandard);
inline	BOOL ET_VideoStandardIsPAL(ET_VIDEO_STANDARD vStandard);
inline	BOOL ET_VideoStandardIsNTSC(ET_VIDEO_STANDARD vStandard);
inline	BOOL ET_VideoStandardIs169(ET_VIDEO_STANDARD vStandard);
inline  BOOL ET_VideoStandardIsStereo(ET_VIDEO_STANDARD vStandard);

const  ET_VIDEOSTANDARD_DESCRIPTION  G_ETVIDEOSTANDARD_DESC_ARRAY[] = 
{
	//{ET_VideoStandard_UNKNOW, ET_VIDEO_HS_UNKNOWN, _T("INVALID")},
	//50i
	{ET_VideoStandard_PAL, ET_VIDEO_HS_SD, _T("625/50i")},																		//1
	{ET_VideoStandard_1440_1080_50i, ET_VIDEO_HS_HD1440i, _T("1080/50i")},														//2
	{ET_VideoStandard_1920_1080_50i, ET_VIDEO_HS_HD1080i, _T("1080/50i(1920*1080)")},											

	{ET_VS(720, 576, ET_AspectRatio_4_3, 2, 25.0, ET_ScanMode_Interlaced,  8), ET_3D_HS_SD, _T("3D 625/50i")},
	{ET_VS(1440, 1080, ET_AspectRatio_16_9, 2, 25.0, ET_ScanMode_Interlaced,  8), ET_3D_HS_HD1440i, _T("3D 1080/50i")},
	{ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 25.0, ET_ScanMode_Interlaced,  8), ET_3D_HS_HD1080i, _T("3D 1080/50i(1920*1080)")},

	//25p
	{ET_VS(1280, 720, ET_AspectRatio_16_9, 1, 25.0, ET_ScanMode_Progressive,  8), ET_VIDEO_HS_HD720p, _T("HD1280*720 25p")},
	{ET_VideoStandard_1920_1080_25p, ET_VIDEO_HS_HD1080p, _T("HD1920*1080 25p")},
	{ET_VS(4096, 2304, ET_AspectRatio_16_9, 1, 25.0, ET_ScanMode_Progressive, 8), ET_VIDEO_HS_4K, _T("HD4096*2304 25p")},
	{ET_VS(4096, 3072, ET_AspectRatio_4_3,  1, 25.0, ET_ScanMode_Progressive, 8), ET_VIDEO_HS_4K, _T("HD4096*3072 25p")},
	{ET_VS(3840, 2160, ET_AspectRatio_16_9, 1, 25.0, ET_ScanMode_Progressive, 8), ET_VIDEO_HS_4K, _T("QFHD3840*2160 25p")},


	{ET_VS(1280, 720, ET_AspectRatio_16_9, 2, 25.0, ET_ScanMode_Progressive, 8),  ET_3D_HS_HD720p, _T("3D HD1280*720 25p")},
	{ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 25.0, ET_ScanMode_Progressive, 8), ET_3D_HS_HD1080p, _T("3D HD1920*1080 25p")},
	{ET_VS(4096, 2304, ET_AspectRatio_16_9, 2, 25.0, ET_ScanMode_Progressive, 8), ET_3D_HS_4K, _T("3D HD4096*2304 25p")},
	{ET_VS(4096, 3072, ET_AspectRatio_4_3, 2, 25.0, ET_ScanMode_Progressive, 8),  ET_3D_HS_4K, _T("3D HD4096*3072 25p")},
	{ET_VS(3840, 2160, ET_AspectRatio_16_9, 2, 25.0, ET_ScanMode_Progressive, 8), ET_3D_HS_4K, _T("3D QFHD3840*2160 25p")},

	//5994i
	{ET_VideoStandard_NTSC_2997, ET_VIDEO_HS_SD, _T("525/59.94i")},
	{ET_VideoStandard_1440_1080_5994i, ET_VIDEO_HS_HD1440i, _T("1080/59.94i")},
	{ET_VideoStandard_1920_1080_5994i, ET_VIDEO_HS_HD1080i, _T("1080/59.94i(1920*1080)")},
	{ET_VideoStandard_NTSC_2997_16_9, ET_VIDEO_HS_SD, _T("525/59.94i(16:9)")},
	{ET_VideoStandard_NTSC_2997_480, ET_VIDEO_HS_SD, __T("525/59.94i(480)")},

	{ET_VS(720, 486, ET_AspectRatio_4_3, 2, 29.97, ET_ScanMode_Interlaced, 8), ET_3D_HS_SD, _T("3D 525/59.94i")},
	{ET_VS(1440, 1080, ET_AspectRatio_16_9, 2, 29.97, ET_ScanMode_Interlaced, 8), ET_3D_HS_HD1440i, _T("3D 1080/59.94i")},
	{ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 29.97, ET_ScanMode_Interlaced, 8), ET_3D_HS_HD1080i, _T("3D 1080/59.94i(1920*1080)")},

	//60i
	{ET_VideoStandard_NTSC_30, ET_VIDEO_HS_SD, _T("525/60i")},
	{ET_VideoStandard_1440_1080_60i, ET_VIDEO_HS_HD1440i, _T("1080/60i")},
	{ET_VideoStandard_1920_1080_60i, ET_VIDEO_HS_HD1080i, _T("1080/60i(1920*1080)")},


	{ET_VS(720, 486, ET_AspectRatio_4_3, 2, 30.0, ET_ScanMode_Interlaced, 8), ET_3D_HS_SD, _T("3D 525/60i")},
	{ET_VS(1440, 1080, ET_AspectRatio_16_9, 2, 30.0, ET_ScanMode_Interlaced, 8), ET_3D_HS_HD1440i, _T("3D 1080/60i")},
	{ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 30.0, ET_ScanMode_Interlaced, 8), ET_3D_HS_HD1080i, _T("3D 1080/60i(1920*1080)")},

	//50p
	{ET_VideoStandard_1280_720_50p, ET_VIDEO_HS_HD720p, _T("HD1280*720 50p")},
	{ET_VS(1920, 1080, ET_AspectRatio_16_9, 1, 50.0, ET_ScanMode_Progressive, 8), ET_VIDEO_HS_HD1080p, _T("HD1920*1080 50p")},

	{ET_VS(1280, 720, ET_AspectRatio_16_9, 2, 50.0, ET_ScanMode_Progressive, 8), ET_3D_HS_HD720p, _T("3D HD1280*720 50p")},
	{ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 50.0, ET_ScanMode_Progressive, 8), ET_3D_HS_HD1080p, _T("3D HD1920*1080 50p")},

	//24p
	{ET_VideoStandard_1280_720_24p, ET_VIDEO_HS_HD720p, _T("HD1280*720 24p")},
	{ET_VideoStandard_1920_1080_24p, ET_VIDEO_HS_HD1080p, _T("HD1920*1080 24p")},
	{ET_VS(4096, 2304, ET_AspectRatio_16_9, 1, 24.0, ET_ScanMode_Progressive, 8), ET_VIDEO_HS_4K, _T("HD4096*2304 24p")},
	{ET_VS(4096, 3072, ET_AspectRatio_4_3,  1, 24.0, ET_ScanMode_Progressive, 8), ET_VIDEO_HS_4K, _T("HD4096*3072 24p")},
	{ET_VS(3840, 2160, ET_AspectRatio_16_9, 1, 24.0, ET_ScanMode_Progressive, 8), ET_VIDEO_HS_4K, _T("QFHD3840*2160 24p")},

	{ET_VS(1280, 720, ET_AspectRatio_16_9, 2, 24.0, ET_ScanMode_Progressive, 8), ET_3D_HS_HD720p, _T("3D HD1280*720 24p")},
	{ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 24.0, ET_ScanMode_Progressive, 8), ET_3D_HS_HD1080p, _T("3D HD1920*1080 24p")},
	{ET_VS(4096, 2304, ET_AspectRatio_16_9, 2, 24.0, ET_ScanMode_Progressive, 8), ET_3D_HS_4K, _T("3D HD4096*2304 24p")},
	{ET_VS(4096, 3072, ET_AspectRatio_4_3, 2, 24.0, ET_ScanMode_Progressive, 8),  ET_3D_HS_4K, _T("3D HD4096*3072 24p")},
	{ET_VS(3840, 2160, ET_AspectRatio_16_9, 2, 24.0, ET_ScanMode_Progressive, 8), ET_3D_HS_4K, _T("3D QFHD3840*2160 24p")},

	//2398p
	{ET_VideoStandard_1280_720_2398p, ET_VIDEO_HS_HD720p, _T("HD1280*720 23.98p")},
	{ET_VideoStandard_1920_1080_2398p, ET_VIDEO_HS_HD1080p, _T("HD1920*1080 23.98p")},

	{ET_VS(1280, 720, ET_AspectRatio_16_9, 2, 23.98, ET_ScanMode_Progressive, 8), ET_3D_HS_HD720p, _T("3D HD1280*720 23.98p")},
	{ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 23.98, ET_ScanMode_Progressive, 8), ET_3D_HS_HD1080p, _T("3D HD1920*1080 23.98p")},

	//2997p
	{ET_VS(1280, 720, ET_AspectRatio_16_9, 1, 29.97, ET_ScanMode_Progressive, 8), ET_VIDEO_HS_HD720p, _T("HD1280*720 29.97p")},
	{ET_VS(1440, 1080, ET_AspectRatio_16_9, 1, 29.97, ET_ScanMode_Progressive, 8), ET_VIDEO_HS_HD1080p, _T("HD1440*1080 29.97p")},
	{ET_VideoStandard_1920_1080_2997p, ET_VIDEO_HS_HD1080p, _T("HD1920*1080 29.97p")},

	{ET_VS(1280, 720, ET_AspectRatio_16_9, 2, 29.97, ET_ScanMode_Progressive, 8), ET_3D_HS_HD720p, _T("3D HD1280*720 29.97p")},
	{ET_VS(1440, 1080, ET_AspectRatio_16_9, 2, 29.97, ET_ScanMode_Progressive, 8), ET_3D_HS_HD1080p, _T("3D HD1440*1080 29.97p")},
	{ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 29.97, ET_ScanMode_Progressive, 8), ET_3D_HS_HD1080p, _T("3D HD1920*1080 29.97p")},

	//30p
	{ET_VS(1280, 720, ET_AspectRatio_16_9, 1, 30, ET_ScanMode_Progressive, 8), ET_VIDEO_HS_HD720p, _T("HD1280*720 30p")},
	{ET_VS(1440, 1080, ET_AspectRatio_16_9, 1, 30, ET_ScanMode_Progressive, 8), ET_VIDEO_HS_HD1080p, _T("HD1440*1080 30p")},
	{ET_VideoStandard_1920_1080_30p, ET_VIDEO_HS_HD1080p, _T("HD1920*1080 30p")},

	{ET_VS(1280, 720, ET_AspectRatio_16_9, 2, 30, ET_ScanMode_Progressive, 8), ET_3D_HS_HD1080p, _T("3D HD1280*720 30p")},
	{ET_VS(1440, 1080, ET_AspectRatio_16_9, 2, 30, ET_ScanMode_Progressive, 8), ET_VIDEO_HS_HD1080p, _T("3D HD1440*1080 30p")},
	{ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 30.0, ET_ScanMode_Progressive, 8), ET_3D_HS_HD1080p, _T("3D HD1920*1080 30p")},

	//5994p
	{ET_VideoStandard_1280_720_5994p, ET_VIDEO_HS_HD720p, _T("HD1280*720 59.94p")},
	{ET_VS(1920, 1080, ET_AspectRatio_16_9, 1, 59.94, ET_ScanMode_Progressive, 8), ET_VIDEO_HS_HD1080p, _T("HD1920*1080 59.94p")},

	{ET_VS(1280, 720, ET_AspectRatio_16_9, 2, 59.94, ET_ScanMode_Progressive, 8), ET_3D_HS_HD720p, _T("3D HD1280*720 59.94p")},
	{ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 59.94, ET_ScanMode_Progressive, 8), ET_3D_HS_HD1080p, _T("3D HD1920*1080 59.94p")},

	//60p
	{ET_VS(1280, 720, ET_AspectRatio_16_9, 1, 60, ET_ScanMode_Progressive, 8), ET_VIDEO_HS_HD720p, _T("HD1280*720 60p")},
	{ET_VS(1920, 1080, ET_AspectRatio_16_9, 1, 60, ET_ScanMode_Progressive, 8), ET_VIDEO_HS_HD1080p, _T("HD1920*1080 60p")},

	{ET_VS(1280, 720, ET_AspectRatio_16_9, 2, 60, ET_ScanMode_Progressive, 8), ET_3D_HS_HD720p, _T("3D HD1280*720 60p")},
	{ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 60, ET_ScanMode_Progressive, 8), ET_3D_HS_HD1080p, _T("3D HD1920*1080 60p")},
};
#define ET_VIDEOSTANDARD_NUM (sizeof(G_ETVIDEOSTANDARD_DESC_ARRAY) / sizeof(ET_VIDEOSTANDARD_DESCRIPTION))


//※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※
// 以下为API函数的实现
// 所有定义均为内部使用,其他编程人员无需关注,请勿改动
//※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※※
/*	!!!内部约定!!!
ET_VIDEO_STANDARD

0  0  0  0  0  0  0  0      0  0  0  0  0  0  0  0      0  0  0  0  0  0  0  0       0  0  0  0  0  0  0  0 
----  ----------------      -------  -------------      -------------  ------------------  ----------------
标识     帧率索引           DAR索引   视窗个数索引           宽索引           高索引            位数索引
*/


#define ETVS_Unknown			0x40000000

#define ETVS_VERSION(l)			(l>>30)
#define ETVS_FRAMERATE_I(l)		((l&0x3f000000)>>24)
#define ETVS_DAR_I(l)			((l&0x00e00000)>>21)
#define ETVS_VIEW_I(l)			((l&0x001f0000)>>16)
#define ETVS_WIDTH_I(l)			((l&0x0000f800)>>11)
#define ETVS_HEIGHT_I(l)		((l&0x000007c0)>>6)	
#define ETVS_BITCOUNT_I(l)		(l&0x0000003f)

#define ETVS_SET_VERSION(l,r)   (r|=(l<<30))
#define ETVS_SET_FRAMERATE(l,r)	(r|=(l<<24))
#define ETVS_SET_DAR(l,r)		(r|=(l<<21))
#define ETVS_SET_VIEW(l,r)		(r|=(l<<16))
#define ETVS_SET_WIDTH(l,r)		(r|=(l<<11))
#define ETVS_SET_HEIGHT(l,r)	(r|=(l<<6))	
#define ETVS_SET_BITCOUNT(l,r)  (r|=l)


struct ETExsitVideoStandard
{
	emETVideoStandard tpVideoStand;
	ETVIDEOSTANDARDINFO tpVideoStandardInfo;
};

const ETExsitVideoStandard G_EXST_VIDEOSTANDARD_ARRAY[] =
{
	{ET_VideoStandard_UNKNOW,		{ 0, {0, 0},     {ET_ScanMode_Interlaced,0,1},		 ET_AspectRatio_Unknown, 0, 0}},

	{ET_VideoStandard_PAL,			{ 0, {720,576},  {ET_ScanMode_Interlaced, ET_ST_FRAME_RATE_25,   ET_ST_SCALE_25},	ET_AspectRatio_4_3,	 1, 8}},
	{ET_VideoStandard_NTSC_2997,	{ 0, {720,486},  {ET_ScanMode_Interlaced, ET_ST_FRAME_RATE_2997, ET_ST_SCALE_2997}, ET_AspectRatio_4_3,	 1, 8}},	
	{ET_VideoStandard_NTSC_30,		{ 0, {720,486},  {ET_ScanMode_Interlaced, ET_ST_FRAME_RATE_30,   ET_ST_SCALE_30},	ET_AspectRatio_4_3,	 1, 8}},	

	{ET_VideoStandard_1920_1080_50i,{ 0, {1920,1080}, {ET_ScanMode_Interlaced,ET_ST_FRAME_RATE_25,	 ET_ST_SCALE_25},	ET_AspectRatio_16_9, 1, 8}},	
	{ET_VideoStandard_1920_1080_5994i,{ 0, {1920,1080}, {ET_ScanMode_Interlaced,ET_ST_FRAME_RATE_2997, ET_ST_SCALE_2997}, ET_AspectRatio_16_9, 1, 8}},	
	{ET_VideoStandard_1920_1080_60i,{ 0, {1920,1080}, {ET_ScanMode_Interlaced,ET_ST_FRAME_RATE_30,   ET_ST_SCALE_30},	ET_AspectRatio_16_9, 1, 8}},	

	{ET_VideoStandard_1920_1080_2398p,{ 0, {1920,1080}, {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_2398,ET_ST_SCALE_2398}, ET_AspectRatio_16_9, 1, 8}},	
	{ET_VideoStandard_1920_1080_24p,{ 0, {1920,1080}, {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_24,  ET_ST_SCALE_24},	ET_AspectRatio_16_9, 1, 8}},	
	{ET_VideoStandard_1920_1080_25p,{ 0, {1920,1080}, {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_25,  ET_ST_SCALE_25},	ET_AspectRatio_16_9, 1, 8}},	
	{ET_VideoStandard_1920_1080_2997p,{ 0, {1920,1080}, {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_2997,ET_ST_SCALE_2997}, ET_AspectRatio_16_9, 1, 8}},	
	{ET_VideoStandard_1920_1080_30p,{ 0, {1920,1080}, {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_30,  ET_ST_SCALE_30},	ET_AspectRatio_16_9, 1, 8}},	

	{ET_VideoStandard_1280_720_2398p,{ 0, {1280,720},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_2398,ET_ST_SCALE_2398}, ET_AspectRatio_16_9, 1, 8}},	
	{ET_VideoStandard_1280_720_24p,{ 0, {1280,720},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_24,  ET_ST_SCALE_24},	ET_AspectRatio_16_9, 1, 8}},	
	{ET_VideoStandard_1280_720_50p,{ 0, {1280,720},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_50,  ET_ST_SCALE_50},	ET_AspectRatio_16_9, 1, 8}},	
	{ET_VideoStandard_1280_720_5994p,{ 0, {1280,720},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_5994,ET_ST_SCALE_5994}, ET_AspectRatio_16_9, 1, 8}},	

	{ET_VideoStandard_1440_1080_50i,{ 0, {1440,1080}, {ET_ScanMode_Interlaced, ET_ST_FRAME_RATE_25,  ET_ST_SCALE_25},	ET_AspectRatio_16_9, 1, 8}}, //
	{ET_VideoStandard_1440_1080_5994i,{ 0, {1440,1080}, {ET_ScanMode_Interlaced, ET_ST_FRAME_RATE_2997,ET_ST_SCALE_2997}, ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_1440_1080_60i,{ 0, {1440,1080}, {ET_ScanMode_Interlaced, ET_ST_FRAME_RATE_30,  ET_ST_SCALE_30},	ET_AspectRatio_16_9, 1, 8}},	//

	{ET_VideoStandard_PAL_16_9,{ 0, {720,576},   {ET_ScanMode_Interlaced, ET_ST_FRAME_RATE_25,	 ET_ST_SCALE_25},	ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_NTSC_2997_16_9,{ 0, {720,486},   {ET_ScanMode_Interlaced, ET_ST_FRAME_RATE_2997,ET_ST_SCALE_2997}, ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_NTSC_30_16_9,{ 0, {720,486},   {ET_ScanMode_Interlaced, ET_ST_FRAME_RATE_30,  ET_ST_SCALE_30},	ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_NTSC_2997_480,{ 0, {720,480},   {ET_ScanMode_Interlaced, ET_ST_FRAME_RATE_2997,ET_ST_SCALE_2997}, ET_AspectRatio_4_3,	 1, 8}},	//
	{ET_VideoStandard_NTSC_30_480,{ 0, {720,480},   {ET_ScanMode_Interlaced, ET_ST_FRAME_RATE_30,  ET_ST_SCALE_30},	ET_AspectRatio_4_3,	 1, 8}},	//

	{ET_VideoStandard_1280_720_25p,{ 0, {1280,720},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_25,  ET_ST_SCALE_25},	ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_1280_720_2997p,{ 0, {1280,720},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_2997,ET_ST_SCALE_2997}, ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_1280_720_25pex,{ 0, {1280,720},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_25,  ET_ST_SCALE_25},	ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_1280_720_2997pex,{ 0, {1280,720},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_2997,ET_ST_SCALE_2997}, ET_AspectRatio_16_9, 1, 8}},	//

	//ljj@2013-11-21: add some new value and those from ns .
	{ET_VideoStandard_4096_2304_25p,{ 0, {4096,2304},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_25,  ET_ST_SCALE_25},	ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_4096_3072_25p,{ 0, {4096,3072},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_25,  ET_ST_SCALE_25},	ET_AspectRatio_4_3, 1, 8}},	//
	
	//[[from NS:
	{ET_VideoStandard_1280_1080_50i,{ 0, {1280,1080},  {ET_ScanMode_Interlaced,ET_ST_FRAME_RATE_25,  ET_ST_SCALE_25},	ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_1280_1080_5994i,{ 0, {1280,1080},  {ET_ScanMode_Interlaced,ET_ST_FRAME_RATE_2997,  ET_ST_SCALE_2997},	ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_1280_1080_60i,{ 0, {1280,1080},  {ET_ScanMode_Interlaced,ET_ST_FRAME_RATE_30,  ET_ST_SCALE_30},	ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_1920_1080_50p,{ 0, {1920,1080},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_50,  ET_ST_SCALE_50},	ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_1920_1080_5994p,{ 0, {1920,1080},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_5994,  ET_ST_SCALE_5994},	ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_1440_1080_50p,{ 0, {1440,1080},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_50,  ET_ST_SCALE_50},	ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_1440_1080_5994p,{ 0, {1440,1080},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_5994,  ET_ST_SCALE_5994},	ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_1440_1080_25p,{ 0, {1440,1080},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_25,  ET_ST_SCALE_25},	ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_1440_1080_2997p,{ 0, {1440,1080},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_2997,  ET_ST_SCALE_2997},	ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_PAL_50P,		{ 0, {720,576},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_50,  ET_ST_SCALE_50},	ET_AspectRatio_4_3, 1, 8}},	//
	{ET_VideoStandard_NTSC_5994P,	{ 0, {720,486},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_5994,  ET_ST_SCALE_5994},	ET_AspectRatio_4_3, 1, 8}},	//
	{ET_VideoStandard_PAL_50P_16_9,{ 0, {720,576},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_50,  ET_ST_SCALE_50},	ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_NTSC_5994P_16_9,	{ 0, {720,486},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_5994,  ET_ST_SCALE_5994},	ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_PAL_25P,		{ 0, {720,576},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_25,  ET_ST_SCALE_25},	ET_AspectRatio_4_3, 1, 8}},	//
	{ET_VideoStandard_NTSC_2997P,	{ 0, {720,486},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_2997,  ET_ST_SCALE_2997},	ET_AspectRatio_4_3, 1, 8}},	//
	{ET_VideoStandard_PAL_25P_16_9,	{ 0, {720,576},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_25,  ET_ST_SCALE_25},	ET_AspectRatio_16_9, 1, 8}},	//
	{ET_VideoStandard_NTSC_2997P_16_9,	{ 0, {720,486},  {ET_ScanMode_Progressive,ET_ST_FRAME_RATE_2997,  ET_ST_SCALE_2997},	ET_AspectRatio_16_9, 1, 8}},	//
	//]]from ns end.
};
#define ET_EXSIT_VIDEOSTANDARD_NUM (sizeof(G_EXST_VIDEOSTANDARD_ARRAY) / sizeof(ETExsitVideoStandard))

//[[ljj@2013-11-21: 根据VideoStand获取对应的ETExsitVideoStandard。没有则返回NULL
inline ETExsitVideoStandard* ETGetExsitVideoStandard(IN ET_VIDEO_STANDARD dwStandard)
{
	int iExsitVSCount = ET_EXSIT_VIDEOSTANDARD_NUM;
	for (int i = 0; i < iExsitVSCount; i++)
	{
		if (G_EXST_VIDEOSTANDARD_ARRAY[i].tpVideoStand == dwStandard)
		{
			return (ETExsitVideoStandard*)G_EXST_VIDEOSTANDARD_ARRAY+i;
		}
	}
	return NULL;
}

//检查制式是否合法
inline VS_RESULT ETCheckVideoStandard(IN ET_VIDEO_STANDARD dwStandard)
{
	if( ETVS_VERSION(dwStandard) == 0)
	{
		if( NULL == ETGetExsitVideoStandard(dwStandard))
			return ETVS_VESION1_NG;
	}
	else if( ETVS_VERSION(dwStandard) > 1)
	{
		return ETVS_VERSION_NG;
	}

	VS_RESULT vsRet = ETVS_OK;

	if( ETVS_FRAMERATE_I(dwStandard) <= 0 || ETVS_FRAMERATE_I(dwStandard) >= ET_FRAMERATE_NUM)
		vsRet |= ETVS_FRAMERATE_NG;

	if( ETVS_DAR_I(dwStandard) <= 0 || ETVS_DAR_I(dwStandard) >= ET_AspectRatio_MAX)
		vsRet |= ETVS_DAR_NG;

	if( ETVS_VIEW_I(dwStandard) <= 0 || ETVS_VIEW_I(dwStandard) >= ET_VIEW_NUM)
		vsRet |= ETVS_VIEW_NG;

	if( ETVS_WIDTH_I(dwStandard) <= 0 || ETVS_WIDTH_I(dwStandard) >= ET_WIDTH_NUM)
		vsRet |= ETVS_WIDTH_NG;

	if( ETVS_HEIGHT_I(dwStandard) <= 0 || ETVS_HEIGHT_I(dwStandard) >= ET_HEIGHT_NUM)
		vsRet |= ETVS_HEIGHT_NG;

	if( ETVS_BITCOUNT_I(dwStandard) <= 0 || ETVS_BITCOUNT_I(dwStandard) >= ET_BITCOUNT_NUM)
		vsRet |= ETVS_BITCOUNT_NG;

	return vsRet;
}

//由制式得到帧率
inline VS_RESULT ETGetVideoFrameRate(IN ET_VIDEO_STANDARD dwStandard, OUT ETFRAMERATE& tpFrameRate)
{
	ETExsitVideoStandard* pExsitVS = ETGetExsitVideoStandard(dwStandard);
	if( NULL != pExsitVS)
	{
		tpFrameRate = pExsitVS->tpVideoStandardInfo.tpFrameRate;
		return pExsitVS->tpVideoStand == ET_VideoStandard_UNKNOW ? ETVS_VESION1_NG : ETVS_OK;
	}

	VS_RESULT vRet = ETVS_FRAMERATE_NG;
	int iIndex = ETVS_FRAMERATE_I(dwStandard);

	if( iIndex > 0 && iIndex < ET_FRAMERATE_NUM)
	{
		tpFrameRate = G_ET_FRAMERATE_ARRAY[iIndex];
		vRet = ETVS_OK;
	}
	else
	{
		tpFrameRate = G_ET_FRAMERATE_ARRAY[0];
	}

	return vRet;
}

//由制式得到DAR
inline VS_RESULT ETGetVideoAspectRatio(IN ET_VIDEO_STANDARD dwStandard, OUT ET_ASPECTRATIO& eAspectRatio)
{
	ETExsitVideoStandard* pExsitVS = ETGetExsitVideoStandard(dwStandard);
	if( NULL != pExsitVS)
	{
		eAspectRatio = (ET_ASPECTRATIO)pExsitVS->tpVideoStandardInfo.eAspectRatio;
		return pExsitVS->tpVideoStand == ET_VideoStandard_UNKNOW ? ETVS_VESION1_NG : ETVS_OK;
	}

	VS_RESULT vRet = ETVS_DAR_NG;
	int iIndex = ETVS_DAR_I(dwStandard);

	if( iIndex > 0 && iIndex < ET_AspectRatio_MAX)
	{
		eAspectRatio = iIndex;
		vRet = ETVS_OK;
	}
	else
	{
		eAspectRatio = iIndex;
	}

	return vRet;
}

inline BOOL IsETApsectRatioEuqal(IN ET_VIDEO_STANDARD dwStandard, IN ET_ASPECTRATIO eAspectRatio)
{
	ET_ASPECTRATIO eStandardAspectRatio;
	VS_RESULT vsRet = ETGetVideoAspectRatio(dwStandard, eStandardAspectRatio);
	if (vsRet == ETVS_OK && eStandardAspectRatio == eAspectRatio)
		return TRUE;
	return FALSE;
}

//由制式得到视窗个数
inline VS_RESULT ETGetVideoView(IN ET_VIDEO_STANDARD dwStandard, OUT ETPVIEW& eView)
{
	ETExsitVideoStandard* pExsitVS = ETGetExsitVideoStandard(dwStandard);
	if( NULL != pExsitVS)
	{
		eView = pExsitVS->tpVideoStandardInfo.eView;
		return pExsitVS->tpVideoStand == ET_VideoStandard_UNKNOW ? ETVS_VESION1_NG : ETVS_OK;
	}

	VS_RESULT vRet = ETVS_VIEW_NG;
	int iIndex = ETVS_VIEW_I( dwStandard);

	if( iIndex > 0 && iIndex < ET_VIEW_NUM)
	{
		eView =  G_VIEW_ARRAY[iIndex];
		vRet = ETVS_OK;
	}
	else
	{
		eView = G_VIEW_ARRAY[0];
	}

	return vRet;
}

//由制式得到宽高
inline VS_RESULT ETGetVideoApsect(IN ET_VIDEO_STANDARD dwStandard, OUT ETASPECT& tpAspect)
{
	ETExsitVideoStandard* pExsitVS = ETGetExsitVideoStandard(dwStandard);
	if( NULL != pExsitVS)
	{
		tpAspect = pExsitVS->tpVideoStandardInfo.tpAspect;
		return pExsitVS->tpVideoStand == ET_VideoStandard_UNKNOW ? ETVS_VESION1_NG : ETVS_OK;
	}

	VS_RESULT vRet = ETVS_OK;
	int iwIndex = ETVS_WIDTH_I(dwStandard);
	int ihIndex = ETVS_HEIGHT_I(dwStandard);

	if( iwIndex > 0 && iwIndex < ET_WIDTH_NUM)
		tpAspect.nWidth = G_WIDTH_ARRAY[iwIndex];
	else
	{
		tpAspect.nWidth = G_WIDTH_ARRAY[0];
		vRet |= ETVS_WIDTH_NG;
	}

	if( ihIndex > 0 && ihIndex < ET_HEIGHT_NUM)
		tpAspect.nHeight = G_HEIGHT_ARRAY[ihIndex];
	else
	{
		tpAspect.nHeight = G_HEIGHT_ARRAY[0];
		vRet |= ETVS_HEIGHT_NG;
	}

	return vRet;
}

//由制式得到bitcount
inline VS_RESULT ETGetVideoBitCount(IN ET_VIDEO_STANDARD dwStandard, OUT ETPBITCOUNT& eBitCount)
{
	ETExsitVideoStandard* pExsitVS = ETGetExsitVideoStandard(dwStandard);
	if( NULL != pExsitVS)
	{
		eBitCount = pExsitVS->tpVideoStandardInfo.eBitCount;
		return pExsitVS->tpVideoStand == ET_VideoStandard_UNKNOW ? ETVS_VESION1_NG : ETVS_OK;
	}

	VS_RESULT vRet = ETVS_BITCOUNT_NG;
	int iIndex = ETVS_BITCOUNT_I( dwStandard);

	if( iIndex > 0 && iIndex < ET_BITCOUNT_NUM)
	{
		eBitCount = G_BITCOUNT_ARRAY[iIndex];
		vRet = ETVS_OK;
	}
	else
	{
		eBitCount = G_BITCOUNT_ARRAY[0];
	}

	return vRet;
}

inline int ETId(int Idx)
{
	int i = 0; 
	while (Idx != 0)
	{
		++i ;
		Idx >>= 1;
	}
	return i;
}

inline int Idx(int id)
{
	return (id <= 0 ? 0 : (1 << (id - 1)));
}

//tpStandardInfo -> ET_VIDEO_STANDARD
inline ET_VIDEO_STANDARD  ET_VS(IN const ETVIDEOSTANDARDINFO& tpStandardInfo)
{
	ET_VIDEO_STANDARD dwStandard = ETVS_Unknown;
	//宽
	bool bFindBest = false;
	int iMaxSimilarity = 5; // 4096
	for(int eWidth = 1 ; eWidth < ET_WIDTH_NUM; ++eWidth)
	{
		if( G_WIDTH_ARRAY[eWidth] == tpStandardInfo.tpAspect.nWidth)
		{
			ETVS_SET_WIDTH(eWidth,dwStandard);
			bFindBest = true;
			break;
		}
		else
		{
			if(G_WIDTH_ARRAY[eWidth] > tpStandardInfo.tpAspect.nWidth && G_WIDTH_ARRAY[eWidth] < G_WIDTH_ARRAY[iMaxSimilarity])
			{
				iMaxSimilarity = eWidth;
			}	
		}
	}

	if(!bFindBest)
	{
		// 不规则幅面，取较大值
		ETVS_SET_WIDTH(iMaxSimilarity,dwStandard);
	}

	//高
	iMaxSimilarity = 9; // 3072
	bFindBest = false;
	for( int eHeight = 1; eHeight < ET_HEIGHT_NUM; ++ eHeight)
	{
		if( G_HEIGHT_ARRAY[eHeight] == tpStandardInfo.tpAspect.nHeight)
		{
			ETVS_SET_HEIGHT(eHeight,dwStandard);
			bFindBest = true;
			break;
		}
		else
		{
			if(G_HEIGHT_ARRAY[eHeight] > tpStandardInfo.tpAspect.nHeight && G_HEIGHT_ARRAY[eHeight] < G_HEIGHT_ARRAY[iMaxSimilarity])
			{
				iMaxSimilarity = eHeight;
			}	
		}
	}

	if(!bFindBest)
	{
		// 不规则幅面，取较大值
		ETVS_SET_HEIGHT(iMaxSimilarity,dwStandard);
	}

	//帧率
	ETFRAMERATE tpFrameRate = tpStandardInfo.tpFrameRate;
	if(tpFrameRate.eScanMode == ET_ScanMode_Interlaced_BottomFirst)
		tpFrameRate.eScanMode = ET_ScanMode_Interlaced;
	for( int eFrameRate = 1; eFrameRate < ET_FRAMERATE_NUM; ++ eFrameRate)
	{
		if( G_ET_FRAMERATE_ARRAY[eFrameRate] == tpFrameRate)
		{
			ETVS_SET_FRAMERATE(eFrameRate,dwStandard);
			break;
		}
	}

	//画面个数
	for( int eView = 1; eView < ET_VIEW_NUM; ++ eView)
	{
		if( G_VIEW_ARRAY[eView] == tpStandardInfo.eView)
		{
			ETVS_SET_VIEW(eView,dwStandard);
			break;
		}
	}

	//宽幅比
	for (int eAspectRatio = 1; eAspectRatio < ET_AspectRatio_MAX; ++eAspectRatio)
	{
		if (eAspectRatio == tpStandardInfo.eAspectRatio)
		{
			ETVS_SET_DAR(eAspectRatio, dwStandard);
			break;
		}
	}

	//Bit位数
	for (int eBitCount = 1; eBitCount < ET_BITCOUNT_NUM; ++eBitCount)
	{
		if (tpStandardInfo.eBitCount == G_BITCOUNT_ARRAY[eBitCount])
		{
			ETVS_SET_BITCOUNT( eBitCount, dwStandard);
			break;
		}
	}

	return ET_GetOldStandard(dwStandard);
}

//ET_VIDEO_STANDARD -> ETVIDEOSTANDARDINFO
inline ETVIDEOSTANDARDINFO    ET_VSI(IN ET_VIDEO_STANDARD dwStandard)
{
	ETExsitVideoStandard* pExsitVS = ETGetExsitVideoStandard(dwStandard);
	if( NULL != pExsitVS)
	{
		return pExsitVS->tpVideoStandardInfo;
	}

	ETVIDEOSTANDARDINFO tpStandardInfo;
	ET_ASPECTRATIO tpAspect;

	tpStandardInfo.nVersion = 1;
	ETGetVideoApsect( dwStandard, tpStandardInfo.tpAspect);
	ETGetVideoFrameRate( dwStandard, tpStandardInfo.tpFrameRate);
	ETGetVideoAspectRatio(dwStandard, tpAspect);
	tpStandardInfo.eAspectRatio = (BYTE)tpAspect;
	ETGetVideoView( dwStandard, tpStandardInfo.eView);
	ETGetVideoBitCount(dwStandard, tpStandardInfo.eBitCount);

	return tpStandardInfo;
}

//为了与之前的制式进行兼容，将使用新规则拼出来的制式，转成之前的制式值
inline ET_VIDEO_STANDARD ET_GetOldStandard(ET_VIDEO_STANDARD dwStandard)
{
	if (ETVS_VERSION(dwStandard) == 0) //已经是老制式，直接返回
		return dwStandard;

	ET_VIDEO_STANDARD dwOldStadnard = ET_VideoStandard_UNKNOW;
	switch (dwStandard)
	{
	case 0x40000000:
		dwOldStadnard = ET_VideoStandard_UNKNOW;
		break;
	case 0x41210841:
		dwOldStadnard = ET_VideoStandard_PAL;
		break;
	case 0x41411081:
		dwOldStadnard = ET_VideoStandard_1920_1080_50i;
		break;
	case 0x41411881:
		dwOldStadnard = ET_VideoStandard_1440_1080_50i;
		break;
	case 0x41410841:
		dwOldStadnard = ET_VideoStandard_PAL_16_9;
		break;
	case 0x43411081:
		dwOldStadnard = ET_VideoStandard_1920_1080_25p;
		break;
	case 0x434120c1:
		dwOldStadnard = ET_VideoStandard_1280_720_25p;
		break;
	case 0x43412a01:
		dwOldStadnard = ET_VideoStandard_4096_2304_25p;
		break;
	case 0x43212a41:
		dwOldStadnard = ET_VideoStandard_4096_3072_25p;
		break;
	case 0x42210941:
		dwOldStadnard = ET_VideoStandard_NTSC_2997;
		break;
	case 0x42411081:
		dwOldStadnard = ET_VideoStandard_1920_1080_5994i;
		break;
	case 0x42411881:
		dwOldStadnard = ET_VideoStandard_1440_1080_5994i;
		break;
	case 0x42410941:
		dwOldStadnard = ET_VideoStandard_NTSC_2997_16_9;
		break;
	case 0x42210901:
		dwOldStadnard = ET_VideoStandard_NTSC_2997_480;
		break;
	case 0x4a210941:
		dwOldStadnard = ET_VideoStandard_NTSC_30;
		break;
	case 0x4a411081:
		dwOldStadnard = ET_VideoStandard_1920_1080_60i;
		break;
	case 0x4a411881:
		dwOldStadnard = ET_VideoStandard_1440_1080_60i;
		break;
	case 0x4a410941:
		dwOldStadnard = ET_VideoStandard_NTSC_30_16_9;
		break;
	case 0x4a210901:
		dwOldStadnard = ET_VideoStandard_NTSC_30_480;
		break;
	case 0x484120c1:
		dwOldStadnard = ET_VideoStandard_1280_720_50p;
		break;
	case 0x45411081:
		dwOldStadnard = ET_VideoStandard_1920_1080_24p;
		break;
	case 0x454120c1:
		dwOldStadnard = ET_VideoStandard_1280_720_24p;
		break;
	case 0x44411081:
		dwOldStadnard = ET_VideoStandard_1920_1080_2398p;
		break;
	case 0x444120c1:
		dwOldStadnard = ET_VideoStandard_1280_720_2398p;
		break;
	case 0x46411081:
		dwOldStadnard = ET_VideoStandard_1920_1080_2997p;
		break;
	case 0x464120c1:
		dwOldStadnard = ET_VideoStandard_1280_720_2997p;
		break;
	case 0x47411081:
		dwOldStadnard = ET_VideoStandard_1920_1080_30p;
		break;
	case 0x494120c1:
		dwOldStadnard = ET_VideoStandard_1280_720_5994p;
		break;
	case 0x48411081:
		dwOldStadnard = ET_VideoStandard_1920_1080_50p;
		break;
	case 0x49411081:
		dwOldStadnard = ET_VideoStandard_1920_1080_5994p;
		break;
	case 0x48411881:
		dwOldStadnard = ET_VideoStandard_1440_1080_50p;
		break;
	case 0x43411881:
		dwOldStadnard = ET_VideoStandard_1440_1080_25p;
		break;
	case 0x46411881:
		dwOldStadnard = ET_VideoStandard_1440_1080_2997p;
		break;
	case 0x48210841:
		dwOldStadnard = ET_VideoStandard_PAL_50P;
		break;
	case 0x49210941:
		dwOldStadnard = ET_VideoStandard_NTSC_5994P;
		break;
	case 0x48410841:
		dwOldStadnard = ET_VideoStandard_PAL_50P_16_9;
		break;
	case 0x49410941:
		dwOldStadnard = ET_VideoStandard_NTSC_5994P_16_9;
		break;
	case 0x43210841:
		dwOldStadnard = ET_VideoStandard_PAL_25P;
		break;
	case 0x46210941:
		dwOldStadnard = ET_VideoStandard_NTSC_2997P;
		break;
	case 0x43410841:
		dwOldStadnard = ET_VideoStandard_PAL_25P_16_9;
		break;
	case 0x46410941:
		dwOldStadnard = ET_VideoStandard_NTSC_2997P_16_9;
		break;
	case 0x41412081:
		dwOldStadnard = ET_VideoStandard_1280_1080_50i;
		break;
	case 0x42412081:
		dwOldStadnard = ET_VideoStandard_1280_1080_5994i;
		break;
	case 0x4a412081:
		dwOldStadnard = ET_VideoStandard_1280_1080_60i;
		break;

	default:
		dwOldStadnard = dwStandard;
		break;
	}

	return dwOldStadnard;
}

inline ET_VIDEO_STANDARD ET_VS(long lWidth, long lHeight, ET_ASPECTRATIO eAspectRatio, long lViewCount, double dbFrameRate, ETPSCANMODE eScanMode, long lBitCount)//ljj@2010-12-31:根据值来整合制式
{
	ETVIDEOSTANDARDINFO vStandardInfo;
	int idxWidth = 0, idxHeight = 0, idxAspectRatio = 0, idxView = 0, idxBit = 0, idxFrameRate = 0;

	//逐个遍历，双重标准：最小，和正差值最小。
	long lTmp = 0x7fffffff;
	long lTmp1 = 0;
	long lTmpIdx = -1;
	long lMinIndex = -1;
	short lMin = 0x7fff; // 32767 对于宽高够用 add by wgf@2012-5-9
	if (lWidth > 0)
	{
		//大于0才做。
		lTmpIdx = 5; // 4096
		for (int i = 1; i < ET_WIDTH_NUM; i++)
		{
			if(lWidth == G_WIDTH_ARRAY[i])
			{
				lTmpIdx = i;
				break;
			}
			else
			{
				if(lWidth < G_WIDTH_ARRAY[i] && G_WIDTH_ARRAY[i] < G_WIDTH_ARRAY[lTmpIdx])
				{
					lTmpIdx = i;
				}		
			}
		}

		if (lTmpIdx >= 1) //找到合适的值
		{
			idxWidth = lTmpIdx;
		}
		else
		{
			for (int i = 1; i < ET_WIDTH_NUM; i++)
			{
				if (G_WIDTH_ARRAY[i] <= lMin)
				{
					lMin = G_WIDTH_ARRAY[i];
					lMinIndex = i;
				}
			}

			if (lMinIndex >= 1)
			{
				idxWidth = lMinIndex;
			}
			else 
			{
				idxWidth = 0;
			}
		}	
	}
	else 
	{
		idxWidth = 0;
	}
	
	//Height也一样
	lTmp = 0x7fffffff;
	lTmp1 = 0;
	lTmpIdx = -1;
	lMinIndex = -1;
	lMin = 0x7fff; // 32767 对于宽高够用 add by wgf@2012-5-9
	if (lHeight > 0)
	{
		//大于0才做。
		lTmpIdx = 9; // 3072
		for (int i = 1; i < ET_HEIGHT_NUM; i++)
		{
			if(lHeight == G_HEIGHT_ARRAY[i])
			{
				lTmpIdx = i;
				break;
			}
			else
			{
				if(lHeight < G_HEIGHT_ARRAY[i] && G_HEIGHT_ARRAY[i] < G_HEIGHT_ARRAY[lTmpIdx])
				{
					lTmpIdx = i;
				}
			}
		}

		if (lTmpIdx >= 1) //找到合适的值
		{
			idxHeight = lTmpIdx;
		}
		else
		{
			for (int i = 1; i < ET_HEIGHT_NUM; i++)
			{
				if (G_HEIGHT_ARRAY[i] <= lMin)
				{
					lMin = G_HEIGHT_ARRAY[i];
					lMinIndex = i;
				}
			}

			if (lMinIndex >= 1)
			{
				idxHeight = lMinIndex;
			}
			else 
			{
				idxHeight = 0;
			}
		}
	}
	else 
	{
		idxHeight = 0;
	}
	
	//lViewCount:同理
	if (lViewCount == 0)
	{
		lViewCount = 1;
	}
	lTmp = 0x7fffffff;
	lTmp1 = 0;
	lTmpIdx = -1;
	lMinIndex = -1;
	lMin = 0x7fff; // 32767 对于宽高够用 add by wgf@2012-5-9
	for (int i = 1; i < ET_VIEW_NUM; i++)
	{
		lTmp1 = lViewCount - G_VIEW_ARRAY[i] ;
		if (lTmp1 == 0)
		{
			lTmpIdx = i;
			break;
		}
		if (lTmp1 > 0 && lTmp1 < lTmp)
		{
			lTmp = lTmp1;
			lTmpIdx = i;
		}
	}
	if (lTmpIdx >= 1) //找到合适的值
	{
		idxView = lTmpIdx;
	}
	else
	{
		for (int i = 1; i < ET_VIEW_NUM; i++)
		{
			if (G_VIEW_ARRAY[i] <= lMin)
			{
				lMin = G_VIEW_ARRAY[i];
				lMinIndex = i;
			}
		}
		if (lMinIndex >= 1)
		{
			idxView = lMinIndex;
		}
		else 
		{
			idxView = 1;
		}
	}

	//dbFrameRate和eScanMode合起来制作ETRATE
	//采取最接近战略
	if (eScanMode == ET_ScanMode_Invalid)
	{
		eScanMode = ET_ScanMode_Interlaced;
	}
	long lNearlyIdx = -1;
	double dbNearlyFps = (double)0x7fffffff;
	if (eScanMode == ET_ScanMode_Interlaced_BottomFirst)
		eScanMode = ET_ScanMode_Interlaced;
	for (int i = 0; i < ET_FRAMERATE_NUM; i++)
	{
		if (G_ET_FRAMERATE_ARRAY[i].eScanMode == eScanMode)
		{
			double dbFps = (double)G_ET_FRAMERATE_ARRAY[i].nTimeRate / (double)G_ET_FRAMERATE_ARRAY[i].nTimeScale;
			double dbTmp = fabs(dbFps - dbFrameRate);
			if (dbTmp <= dbNearlyFps)
			{
				lNearlyIdx = i;
				dbNearlyFps = dbTmp;
			}
		}
	}
	if (lNearlyIdx >= 1)
	{
		idxFrameRate = lNearlyIdx;
	}
	else
	{
		idxFrameRate = 0;
	}

	//lBitCount采取最接近策略
	if (lBitCount <= 0)
	{
		lBitCount = 8;
	}
	lNearlyIdx = -1;
	long lNearly = 0x7fffffff;
	for (int i = 0; i < ET_BITCOUNT_NUM; i++)
	{
		long ltmp = abs((long)(G_BITCOUNT_ARRAY[i] - lBitCount));
		if (ltmp <= lNearly)
		{
			lNearly = ltmp;
			lNearlyIdx = i;
		}
	}
	if (lNearlyIdx >= 1)
	{
		idxBit = lNearlyIdx;
	}
	else
	{
		idxBit = 0;
	}

	idxAspectRatio = eAspectRatio;

	vStandardInfo.nVersion = 1;
	vStandardInfo.eAspectRatio = idxAspectRatio;
	vStandardInfo.tpAspect.nWidth = G_WIDTH_ARRAY[idxWidth];
	vStandardInfo.tpAspect.nHeight = G_HEIGHT_ARRAY[idxHeight];
	vStandardInfo.eView = G_VIEW_ARRAY[idxView];
	vStandardInfo.tpFrameRate = G_ET_FRAMERATE_ARRAY[idxFrameRate];
	vStandardInfo.eBitCount = G_BITCOUNT_ARRAY[idxBit];

	return ET_GetOldStandard(ET_VS(vStandardInfo));
}


inline double ETGetFrameRate(IN ET_VIDEO_STANDARD dwStandard) //ljj@2011-1-5:得到double的frameRate。
{
	ETFRAMERATE stFrameRate;
	if (ETGetVideoFrameRate(dwStandard,stFrameRate) == ETVS_OK && stFrameRate.nTimeScale > 0)
	{
		return (double)stFrameRate.nTimeRate / (double)stFrameRate.nTimeScale;
	}
	return 0.0;
}

inline ETPSCANMODE ETGetScanMode(IN ET_VIDEO_STANDARD dwStandard)//ljj@2011-1-5:得到扫描类型
{
	ETFRAMERATE stFrameRate;
	if (ETGetVideoFrameRate(dwStandard,stFrameRate) == ETVS_OK )
	{
		return stFrameRate.eScanMode;
	}
	return ET_ScanMode_Invalid;
}

inline BOOL ET_VideoStandardIsHD( ET_VIDEO_STANDARD vStandard)
{
	ETASPECT Aspect;
	ETGetVideoApsect(vStandard, Aspect);
	if (Aspect.nWidth > 720)
		return TRUE;
	return FALSE;
}

inline BOOL ET_VideoStandardIs169(ET_VIDEO_STANDARD vStandard)
{
	ET_ASPECTRATIO eAspectRatio;
	ETGetVideoAspectRatio(vStandard, eAspectRatio);
	return (eAspectRatio == ET_AspectRatio_16_9);
}

inline BOOL ET_VideoStandardIsPAL(ET_VIDEO_STANDARD vStandard)
{
	ETFRAMERATE tpFrameRate;
	ETGetVideoFrameRate(vStandard, tpFrameRate);
	if (tpFrameRate.nTimeRate * ET_ST_SCALE_25 == tpFrameRate.nTimeScale * ET_ST_FRAME_RATE_25)
		return TRUE;
	return FALSE;
}

inline BOOL ET_VideoStandardIsNTSC(ET_VIDEO_STANDARD vStandard)
{
	ETFRAMERATE tpFrameRate;
	ETGetVideoFrameRate(vStandard, tpFrameRate);
	if (tpFrameRate.nTimeRate * ET_ST_SCALE_2997 == tpFrameRate.nTimeScale * ET_ST_FRAME_RATE_2997 
		|| tpFrameRate.nTimeRate * ET_ST_SCALE_30 ==  tpFrameRate.nTimeScale * ET_ST_FRAME_RATE_30
		|| tpFrameRate.nTimeRate * ET_ST_SCALE_5994 ==  tpFrameRate.nTimeScale * ET_ST_FRAME_RATE_5994
		|| tpFrameRate.nTimeRate * ET_ST_SCALE_60 ==  tpFrameRate.nTimeScale * ET_ST_FRAME_RATE_60
		|| tpFrameRate.nTimeRate * ET_ST_SCALE_24 ==  tpFrameRate.nTimeScale * ET_ST_FRAME_RATE_24)
		return TRUE;
	return FALSE;
}

inline BOOL ET_VideoStandardIsStereo(ET_VIDEO_STANDARD vStandard)
{
	ETPVIEW tpView;
	ETGetVideoView(vStandard, tpView);
	return (tpView > 1);
}

//是否是逐行
inline BOOL ET_VideoStandardIsProgressive(ET_VIDEO_STANDARD vStandard)
{
	//首先获取扫描模式
	ETPSCANMODE dwScanMode = ETGetScanMode(vStandard);
	//逐行/隔行
	return (ET_ScanMode_Progressive == dwScanMode);
}

//是否是隔行
inline BOOL ET_VideoStandardIsInterlaced(ET_VIDEO_STANDARD vStandard)
{
	//首先获取扫描模式
	ETPSCANMODE dwScanMode = ETGetScanMode(vStandard);
	//逐行/隔行
	return (ET_ScanMode_Interlaced == dwScanMode || ET_ScanMode_Interlaced_BottomFirst == dwScanMode);
}

//获取当前的系统制式属于哪一种制式系列，提供给不带MFC的库使用
inline ET_VIDEO_HS_CLASS ET_VideoStandardGetHSClass(ET_VIDEO_STANDARD vStandard)
{
	if (vStandard == ET_VideoStandard_UNKNOW)
		return ET_VIDEO_HS_UNKNOWN;

	ET_VIDEO_HS_CLASS dwHSClass = ET_VIDEO_HS_UNKNOWN;
	for (int i = 0; i < ET_VIDEOSTANDARD_NUM; ++i)
	{
		if (vStandard == G_ETVIDEOSTANDARD_DESC_ARRAY[i].dwVideoStandard)
		{
			dwHSClass = G_ETVIDEOSTANDARD_DESC_ARRAY[i].dwHSClass;
			break;
		}
	}

	if (dwHSClass == ET_VIDEO_HS_UNKNOWN) //非标准制式
	{
		ETVIDEOSTANDARDINFO info = ET_VSI(vStandard);
		if (info.eView <= 1) //2D
		{
			if (info.tpFrameRate.eScanMode == ET_ScanMode_Progressive) //p
			{
				if (info.tpAspect.nWidth <= 1280)
					dwHSClass = ET_VIDEO_HS_HD720p;
				else if (info.tpAspect.nWidth <= 1920)
					dwHSClass = ET_VIDEO_HS_HD1080p;
				else
					dwHSClass = ET_VIDEO_HS_4K;
			}
			else //i
			{
				if (info.tpAspect.nWidth <= 720)
					dwHSClass = ET_VIDEO_HS_SD;
				else if (info.tpAspect.nWidth <= 1440)
					dwHSClass = ET_VIDEO_HS_HD1440i;
				else
					dwHSClass = ET_VIDEO_HS_HD1080i;
			}
			
		}
		else //3D
		{
			if (info.tpFrameRate.eScanMode == ET_ScanMode_Progressive) //p
			{
				if (info.tpAspect.nWidth <= 1280)
					dwHSClass = ET_3D_HS_HD720p;
				else if (info.tpAspect.nWidth <= 1920)
					dwHSClass = ET_3D_HS_HD1080p;
				else
					dwHSClass = ET_3D_HS_4K;
			}
			else //i
			{
				if (info.tpAspect.nWidth <= 720)
					dwHSClass = ET_3D_HS_SD;
				else if (info.tpAspect.nWidth <= 1440)
					dwHSClass = ET_3D_HS_HD1440i;
				else
					dwHSClass = ET_3D_HS_HD1080i;
			}
		}
	}
	return dwHSClass;
}

// 判断是否为4K
inline bool ET_VideoStandardIs4K(ET_VIDEO_STANDARD vStandard)
{
	switch(ET_VideoStandardGetHSClass(vStandard))
	{
	case ET_3D_HS_4K:
	case ET_VIDEO_HS_4K:
		return true;
	}
	return false;
}

//  [6/8/2015 zhouhu]
inline CString ET_GetVideoDesc(ET_VIDEO_STANDARD vStandard)
{

	CString strDesc =  _T("未知");
	for (int i = 0; i < ET_VIDEOSTANDARD_NUM; ++i)
	{
		if (vStandard == G_ETVIDEOSTANDARD_DESC_ARRAY[i].dwVideoStandard)
		{
			strDesc = G_ETVIDEOSTANDARD_DESC_ARRAY[i].strTitle;
			break;
		}
	}
	return strDesc;
}

//////////////////////////////////////////////////////////////////////////
#endif		//__ET_NX_VIDEOSTANDARDDEF_H__
//end of file