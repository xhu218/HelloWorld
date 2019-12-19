(function($) {

    var ETVS_Unknown                  = 0x40000000;
  
    var   ET_ScanMode_Invalid         = 0;
    var   ET_ScanMode_Interlaced      = 1;                //隔行扫描;同时意为顶场优先
    var   ET_ScanMode_Progressive     = 2;                //逐行扫描

    //[[ljj@2011-9-15:新增定义：隔行，底场优先。ET_ScanMode_Interlaced意为隔行，顶场优先。
    var ET_ScanMode_Interlaced_BottomFirst  = 3;
    //]]
    var ET_ScanMode_Max = 4;


    var ET_VideoStandard_UNKNOW             = 0x00000000;       //Invalid

    var ET_VideoStandard_PAL                = 0x00000001;       //PAL size:720*576 f/s : 25
    var ET_VideoStandard_NTSC_2997          = 0x00000002;       //NTSC size:720*486  f/s : 29.97
    var ET_VideoStandard_NTSC_30            = 0x00000004;       //NTSC size:720*486 f/s : 30 
    var ET_VideoStandard_SECAM              = 0x00000008;       //SECAM

    var ET_VideoStandard_1920_1080_50i      = 0x00000010;       //HDTV size:1920*1080 f/s : 25  interlaced
    var ET_VideoStandard_1920_1080_5994i    = 0x00000020;       //HDTV size:1920*1080 f/s : 29.97 interlaced
    var ET_VideoStandard_1920_1080_60i      = 0x00000040;       //HDTV size:1920*1080 f/s : 30 interlaced

    var ET_VideoStandard_1920_1080_2398p    = 0x00000080;       //HDTV size:1920*1080 f/s : 23.98 progressive
    var ET_VideoStandard_1920_1080_24p      = 0x00000100;       //HDTV size:1920*1080 f/s : 24 progressive
    var ET_VideoStandard_1920_1080_25p      = 0x00000200;       //HDTV size:1920*1080 f/s : 25 progressive
    var ET_VideoStandard_1920_1080_2997p    = 0x00000400;       //HDTV size:1920*1080 f/s : 29.97 progressive
    var ET_VideoStandard_1920_1080_30p      = 0x00000800;       //HDTV size:1920*1080 f/s : 30 progressive

    var ET_VideoStandard_1280_720_2398p     = 0x00001000;       //HDTV size:1280*720 f/s : 23.98 progressive
    var ET_VideoStandard_1280_720_24p       = 0x00002000;       //HDTV size:1280*720 f/s : 24 progressive
    var ET_VideoStandard_1280_720_50p       = 0x00004000;       //HDTV size:1280*720 f/s : 50 progressive
    var ET_VideoStandard_1280_720_5994p     = 0x00008000;       //HDTV size:1280*720 f/s : 59.94 progressive

    var ET_VideoStandard_1440_1080_50i      = 0x00010000;       //HD  size:1440*1080 f/s : 25 interlaced
    var ET_VideoStandard_1440_1080_5994i    = 0x00020000;       //HD  size:1440*1080 f/s : 29.97 interlaced
    var ET_VideoStandard_1440_1080_60i      = 0x00040000;       //HD  size:1440*1080 f/s : 30 interlaced

    var ET_VideoStandard_PAL_16_9           = 0x00080000;       //PAL size:720*576 f/s : 25  
    var ET_VideoStandard_NTSC_2997_16_9     = 0x00100000;       //NTSC size:720*486  f/s : 29.97
    var ET_VideoStandard_NTSC_30_16_9       = 0x00200000;       //NTSC size:720*486 f/s : 30 
    var ET_VideoStandard_NTSC_2997_480      = 0x00400000;       //NTSC size:720*480  f/s : 29.97  //先留着，防止以后特殊情况再改成480
    var ET_VideoStandard_NTSC_30_480        = 0x00800000;       //NTSC size:720*480 f/s : 30 //先留着，防止以后特殊情况再改成480
    var ET_VIDEOSTANDARD_1280_1080_50i      = 0x01000000;       //HD  size:1280*1080 f/s : 25 interlaced
    var ET_VIDEOSTANDARD_PAL_25P            = 0x10001000;      //PAL size:720*576 f/s : 25
    var ET_VIDEOSTANDARD_PAL_25P_16_9       = 0x10004000;
    var ET_VIDEOSTANDARD_PAL_50P            = 0x10000100;      //PAL size:720*576 f/s : 50
    var ET_VIDEOSTANDARD_PAL_50P_16_9       = 0x10000400;
    var ET_VIDEOSTANDARD_1440_1080_50p      = 0x10000010;     //
    var ET_VIDEOSTANDARD_1440_1080_25p      = 0x10000040;     //
    var ET_VIDEOSTANDARD_1920_1080_50p      = 0x10000004;      //
    var ET_VIDEOSTANDARD_1280_720_25p       = 0x10000001;      //

    //新定义的宏【仅供E7使用】
    //  var ET_VideoStandard_1280_720_25p       = 0x434120c1; //ljj@2013-11-20: change standard value 0x434120c1 to NS value.符合新定义模式的值，从文件中读取出来可以自然被正确解释。NS的值属于老的定义模式，需要下面的数组进行翻译。
    var ET_VideoStandard_4096_2304_25p      = 0x43412a01;
    var ET_VideoStandard_4096_3072_25p      = 0x43212a41;
    //  var ET_VideoStandard_1280_720_2997p     = 0x464120c1;//ljj@2013-11-20: change 0x464120c1 to NS value

    //[[ljj@2013-11-20: from NS value.
    //var ET_VideoStandard_1280_720_25p     = 0x10000001;       //
    //var ET_VideoStandard_1280_720_2997p       = 0x10000002;       //

    var ET_VideoStandard_1920_1080_50p      = 0x10000004;       //
    var ET_VideoStandard_1920_1080_5994p    = 0x10000008;       //

    var ET_VideoStandard_1440_1080_50p      = 0x10000010;       //
    var ET_VideoStandard_1440_1080_5994p    = 0x10000020;       //
    var ET_VideoStandard_1440_1080_25p      = 0x10000040;       //
    var ET_VideoStandard_1440_1080_2997p    = 0x10000080;       //

    var ET_VideoStandard_PAL_50P            = 0x10000100;       //PAL size:720*576 f/s : 25
    var ET_VideoStandard_NTSC_5994P         = 0x10000200;       //NTSC size:720*486  f/s : 29.97
    var ET_VideoStandard_PAL_50P_16_9       = 0x10000400;       
    var ET_VideoStandard_NTSC_5994P_16_9    = 0x10000800;       

    var ET_VideoStandard_PAL_25P            = 0x10001000;       //PAL size:720*576 f/s : 25
    var ET_VideoStandard_NTSC_2997P         = 0x10002000;       //NTSC size:720*486  f/s : 29.97
    var ET_VideoStandard_PAL_25P_16_9       = 0x10004000;       
    var ET_VideoStandard_NTSC_2997P_16_9    = 0x10008000;   
    //]]ljj:from NS value end.

    //[[ljj@2014-1-7: from NS & nova value.
    var ET_VideoStandard_1280_1080_50i      = 0x41412081;
    var ET_VideoStandard_1280_1080_5994i    = 0x42412081;
    var ET_VideoStandard_1280_1080_60i      = 0x4a412081;

    //for 广电
    var ET_VideoStandard_1280_720_25p       = 0x01000000;                   //HDTV size:1280*720 f/s : 25 progressive
    var ET_VideoStandard_1280_720_2997p     = 0x02000000;               //HDTV size:1280*720 f/s : 2997 progressive

    //for 海外
    var ET_VideoStandard_1280_720_25pex     = 0x10000001;      //
    var ET_VideoStandard_1280_720_2997pex   = 0x10000002;      //


    var ETVS_OK                         = 0x00000000;       //OK
    var ETVS_VERSION_NG                 = 0x00000001;       //版本号不支持
    var ETVS_WIDTH_NG                   = 0x00000002;       //宽度不合标准
    var ETVS_HEIGHT_NG                  = 0x00000004;       //高度不合标准
    var ETVS_FRAMERATE_NG               = 0x00000008;       //帧率不合标准
    var ETVS_DAR_NG                     = 0x00000010;       //DAR不合标准
    var ETVS_VIEW_NG                    = 0x00000020;       //视窗个数不合标准
    var ETVS_VESION1_NG                 = 0x00000040;       //老版本的定义不合法
    var ETVS_BITCOUNT_NG                = 0x00000080;       //BitCount不合标准


    var ET_AspectRatio_Unknown      = 0;
    var ET_AspectRatio_4_3          = 1;    //4:3
    var ET_AspectRatio_16_9         = 2;    //16:9
    var ET_AspectRatio_1_1          = 3;    //1:1
    var ET_AspectRatio_MAX          = 4;



    var ET_ST_RATE_25             =  50      ;// PAL field frequency
    var ET_ST_FRAME_RATE_25       = 25       ;// PAL frame  frequency
    var ET_ST_SCALE_25            =  1       ;// PAL scale

    var ET_ST_RATE_50             =  100     ;// PAL field frequency
    var ET_ST_FRAME_RATE_50       =  50      ;// PAL frame  frequency
    var ET_ST_SCALE_50            =  1       ;// PAL scale

    var ET_ST_RATE_2997           =  5994    ;// NTSC field frequency
    var ET_ST_FRAME_RATE_2997     =  2997    ;// NTSC frame  frequency
    var ET_ST_SCALE_2997          =  100     ;// NTSC scale

    var ET_ST_RATE_5994           =  11988   ;// NTSC field  frequency
    var ET_ST_FRAME_RATE_5994     =  5994    ;// NTSC frame  frequency
    var ET_ST_SCALE_5994          =  100     ;// NTSC scale

    var ET_ST_RATE_60             =  120     ;// 30-F field frequency
    var ET_ST_FRAME_RATE_60       =  60      ;// 30-F frame frequency
    var ET_ST_SCALE_60            =  1       ;// 30-F scale

    var ET_ST_RATE_30             =  60      ;// 30-F field frequency
    var ET_ST_FRAME_RATE_30       =  30      ;// 30-F frame frequency
    var ET_ST_SCALE_30            =  1       ;// 30-F scale

    var ET_ST_RATE_24             =  48      ;// 24-F field frequency
    var ET_ST_FRAME_RATE_24       =  24      ;// 24-F field frequency
    var ET_ST_SCALE_24            =  1       ;// 24-F scale

    var ET_ST_RATE_2398           =  48000   ;// 2398-F field frequency
    var ET_ST_FRAME_RATE_2398     =  24000   ;// 2398-F frame frequency
    var ET_ST_SCALE_2398          =  1001    ;// 2398-F scale

    //wgf on 2012-01-12
    var ET_ST_RATE_22             =  44      ;// 22-F field frequency
    var ET_ST_FRAME_RATE_22       =  22      ;// 22-F frame frequency
    var ET_ST_SCALE_22            =  1       ;// 22-F scale

    var ET_ST_RATE_21             =  42      ;// 21-F field frequency
    var ET_ST_FRAME_RATE_21       =  21      ;// 21-F frame frequency
    var ET_ST_SCALE_21            =  1       ;// 21-F scale

    var ET_ST_RATE_20             =  40      ;// 20-F field frequency
    var ET_ST_FRAME_RATE_20       =  20      ;// 20-F frame frequency
    var ET_ST_SCALE_20            =  1       ;// 20-F scale

    var ET_ST_RATE_19             =  38      ;// 19-F field frequency
    var ET_ST_FRAME_RATE_19       =  19      ;// 19-F frame frequency
    var ET_ST_SCALE_19            =  1       ;// 19-F scale

    var ET_ST_RATE_18             =  36      ;// 18-F field frequency
    var ET_ST_FRAME_RATE_18       =  18      ;// 18-F frame frequency
    var ET_ST_SCALE_18            =  1       ;// 18-F scale

    var ET_ST_RATE_17             =  34      ;// 17-F field frequency
    var ET_ST_FRAME_RATE_17       =  17      ;// 17-F frame frequency
    var ET_ST_SCALE_17            =  1       ;// 17-F scale

    var ET_ST_RATE_16             =  32      ;// 16-F field frequency
    var ET_ST_FRAME_RATE_16       =  16      ;// 16-F frame frequency
    var ET_ST_SCALE_16            =  1       ;// 16-F scale

    var ET_ST_RATE_15             =  30      ;// 15-F field frequency
    var ET_ST_FRAME_RATE_15       =  15      ;// 15-F frame frequency
    var ET_ST_SCALE_15            =  1       ;// 15-F scale

    var FRAMES_SECOND_25          =  25      ;// 25 Frame: frames per second    
    var FRAMES_MINUTE_25          =  1500    ;// 25 Frame: frames per minute
    var FRAMES_HOUR_25            =  90000   ;// 25 Frame: frames per hour

    var FRAMES_SECOND_24          =  24      ;// 24 Frame: frames per second    
    var FRAMES_MINUTE_24          =  1440    ;// 24 Frame: frames per minute
    var FRAMES_HOUR_24            =  86400   ;// 24 Frame: frames per hour

    var FRAMES_SECOND_NODROP_30   =  30      ;// 30 NO_DROP Frame: frames per second    
    var FRAMES_MINUTE_NODROP_30   =  1800    ;// 30 NO_DROP Frame: frames per minute
    var FRAMES_HOUR_NODROP_30     =  108000   ;// 30 NO_DROP Frame: frames per hour

    var FRAMES_MINUTE_30_DROP     =  1798    ;// 30 DROP Frame: frames per minute
    var FRAMES_10MINUTES_30_DROP  =  17982   ;// 30 DROP Frame: frames per 10 minutes
    var FRAMES_HOUR_30_DROP       =  107892   ;// 30 DROP Frame: frames per hour

    var FRAMES_SECOND_50          =  50      ;// 50 Frame: frames per second    
    var FRAMES_MINUTE_50          =  3000    ;// 50 Frame: frames per minute
    var FRAMES_HOUR_50 = 180000;// 50 Frame: frames per hour

    var ET_VIDEO_HS_UNKNOWN      =  0;
    var ET_VIDEO_HS_SD           =  1;
    var ET_VIDEO_HS_HD720p       =  2;
    var ET_VIDEO_HS_HD1080i      =  3;
    var ET_VIDEO_HS_HD1080p      =  4;
    var ET_VIDEO_HS_HD1440i      =  5;
    var ET_VIDEO_HS_4K           =  6;

    var ET_3D_HS_SD              =  7;
    var ET_3D_HS_HD720p          =  8; 
    var ET_3D_HS_HD1080i         =  9;
    var ET_3D_HS_HD1080p         =  10;
    var ET_3D_HS_HD1440i         =  11;
    var ET_3D_HS_4K = 12;

    ETVS_VERSION = function (l) { return (l >> 30); };
    ETVS_FRAMERATE_I = function (l) { return ((l & 0x3f000000) >> 24); };
    ETVS_DAR_I = function (l) { return ((l & 0x00e00000) >> 21); };
    ETVS_VIEW_I = function (l) { return ((l & 0x001f0000) >> 16); };
    ETVS_WIDTH_I = function (l) { return ((l & 0x0000f800) >> 11); };
    ETVS_HEIGHT_I = function (l) { return ((l & 0x000007c0) >> 6); };
    ETVS_BITCOUNT_I = function (l) { return (l & 0x0000003f); };

    ETVS_SET_VERSION = function (l, r) { return (r |= (l << 30)); };
    ETVS_SET_FRAMERATE = function (l, r) { return (r |= (l << 24)); };
    ETVS_SET_DAR = function (l, r) { return (r |= (l << 21)); };
    ETVS_SET_VIEW = function (l, r) { return (r |= (l << 16)); };
    ETVS_SET_WIDTH = function (l, r) { return (r |= (l << 11)); };
    ETVS_SET_HEIGHT = function (l, r) { return (r |= (l << 6)); };
    ETVS_SET_BITCOUNT = function (l, r) { return (r |= l); };

    var G_ET_FRAMERATE_ARRAY =
    [{ "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": 0, "nTimeScale": 1 }, { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_25, "nTimeScale": ET_ST_SCALE_25 }, { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_2997, "nTimeScale": ET_ST_SCALE_2997 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_25, "nTimeScale": ET_ST_SCALE_25 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_2398, "nTimeScale": ET_ST_SCALE_2398 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_24, "nTimeScale": ET_ST_SCALE_24 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_2997, "nTimeScale": ET_ST_SCALE_2997 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_30, "nTimeScale": ET_ST_SCALE_30 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_50, "nTimeScale": ET_ST_SCALE_50 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_5994, "nTimeScale": ET_ST_SCALE_5994 }, { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_30, "nTimeScale": ET_ST_SCALE_30 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_60, "nTimeScale": ET_ST_SCALE_60 }, { "eScanMode": ET_ScanMode_Interlaced_BottomFirst, "nTimeRate": ET_ST_FRAME_RATE_25, "nTimeScale": ET_ST_SCALE_25 }, { "eScanMode": ET_ScanMode_Interlaced_BottomFirst, "nTimeRate": ET_ST_FRAME_RATE_2997, "nTimeScale": ET_ST_SCALE_2997 }, { "eScanMode": ET_ScanMode_Interlaced_BottomFirst, "nTimeRate": ET_ST_FRAME_RATE_30, "nTimeScale": ET_ST_SCALE_30 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_22, "nTimeScale": ET_ST_SCALE_22 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_21, "nTimeScale": ET_ST_SCALE_21 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_20, "nTimeScale": ET_ST_SCALE_20 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_19, "nTimeScale": ET_ST_SCALE_19 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_18, "nTimeScale": ET_ST_SCALE_18 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_17, "nTimeScale": ET_ST_SCALE_17 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_16, "nTimeScale": ET_ST_SCALE_16 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_15, "nTimeScale": ET_ST_SCALE_15 }];

    var G_EXST_VIDEOSTANDARD_ARRAY =
    [{ "tpVideoStand": ET_VideoStandard_UNKNOW, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 0, "nHeight": 0 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": 0, "nTimeScale": 1 }, "eAspectRatio": ET_AspectRatio_Unknown, "eView": 0, "eBitCount": 0 } }, { "tpVideoStand": ET_VideoStandard_PAL, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 720, "nHeight": 576 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_25, "nTimeScale": ET_ST_SCALE_25, }, "eAspectRatio": ET_AspectRatio_4_3, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_NTSC_2997, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 720, "nHeight": 486 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_2997, "nTimeScale": ET_ST_SCALE_2997 }, "eAspectRatio": ET_AspectRatio_4_3, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_NTSC_30, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 720, "nHeight": 486 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_30, "nTimeScale": ET_ST_SCALE_30 }, "eAspectRatio": ET_AspectRatio_4_3, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1920_1080_50i, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1920, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_25, "nTimeScale": ET_ST_SCALE_25, }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1920_1080_5994i, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1920, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_2997, "nTimeScale": ET_ST_SCALE_2997 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1920_1080_60i, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1920, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_30, "nTimeScale": ET_ST_SCALE_30 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1920_1080_2398p, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1920, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_2398, "nTimeScale": ET_ST_SCALE_2398 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1920_1080_24p, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1920, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_24, "nTimeScale": ET_ST_SCALE_24 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1920_1080_25p, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1920, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_25, "nTimeScale": ET_ST_SCALE_25, }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1920_1080_2997p, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1920, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_2997, "nTimeScale": ET_ST_SCALE_2997 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1920_1080_30p, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1920, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_30, "nTimeScale": ET_ST_SCALE_30 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1280_720_2398p, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1280, "nHeight": 720 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_2398, "nTimeScale": ET_ST_SCALE_2398 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1280_720_24p, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1280, "nHeight": 720 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_24, "nTimeScale": ET_ST_SCALE_24 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1280_720_50p, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1280, "nHeight": 720 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_50, "nTimeScale": ET_ST_SCALE_50 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1280_720_5994p, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1280, "nHeight": 720 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_5994, "nTimeScale": ET_ST_SCALE_5994 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1440_1080_50i, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1440, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_25, "nTimeScale": ET_ST_SCALE_25, }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1440_1080_5994i, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1440, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_2997, "nTimeScale": ET_ST_SCALE_2997 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1440_1080_60i, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1440, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_30, "nTimeScale": ET_ST_SCALE_30 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_PAL_16_9, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 720, "nHeight": 576 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_25, "nTimeScale": ET_ST_SCALE_25, }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_NTSC_2997_16_9, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 720, "nHeight": 486 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_2997, "nTimeScale": ET_ST_SCALE_2997 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_NTSC_30_16_9, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 720, "nHeight": 486 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_30, "nTimeScale": ET_ST_SCALE_30 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_NTSC_2997_480, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 720, "nHeight": 480 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_2997, "nTimeScale": ET_ST_SCALE_2997 }, "eAspectRatio": ET_AspectRatio_4_3, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_NTSC_30_480, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 720, "nHeight": 480 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_30, "nTimeScale": ET_ST_SCALE_30 }, "eAspectRatio": ET_AspectRatio_4_3, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1280_720_25p, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1280, "nHeight": 720 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_25, "nTimeScale": ET_ST_SCALE_25, }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1280_720_2997p, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1280, "nHeight": 720 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_2997, "nTimeScale": ET_ST_SCALE_2997 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1280_720_25pex, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1280, "nHeight": 720 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_25, "nTimeScale": ET_ST_SCALE_25, }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1280_720_2997pex, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1280, "nHeight": 720 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_2997, "nTimeScale": ET_ST_SCALE_2997 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_4096_2304_25p, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 4096, "nHeight": 2304 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_25, "nTimeScale": ET_ST_SCALE_25, }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_4096_3072_25p, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 4096, "nHeight": 3072 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_25, "nTimeScale": ET_ST_SCALE_25, }, "eAspectRatio": ET_AspectRatio_4_3, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1280_1080_50i, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1280, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_25, "nTimeScale": ET_ST_SCALE_25, }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1280_1080_5994i, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1280, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_2997, "nTimeScale": ET_ST_SCALE_2997 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1280_1080_60i, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1280, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_30, "nTimeScale": ET_ST_SCALE_30 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1920_1080_50p, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1920, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_50, "nTimeScale": ET_ST_SCALE_50 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1920_1080_5994p, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1920, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_5994, "nTimeScale": ET_ST_SCALE_5994 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1440_1080_50p, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1440, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_50, "nTimeScale": ET_ST_SCALE_50 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1440_1080_5994p, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1440, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_5994, "nTimeScale": ET_ST_SCALE_5994 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1440_1080_25p, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1440, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_25, "nTimeScale": ET_ST_SCALE_25, }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_1440_1080_2997p, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 1440, "nHeight": 1080 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_2997, "nTimeScale": ET_ST_SCALE_2997 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_PAL_50P, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 720, "nHeight": 576 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_50, "nTimeScale": ET_ST_SCALE_50 }, "eAspectRatio": ET_AspectRatio_4_3, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_NTSC_5994P, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 720, "nHeight": 486 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_5994, "nTimeScale": ET_ST_SCALE_5994 }, "eAspectRatio": ET_AspectRatio_4_3, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_PAL_50P_16_9, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 720, "nHeight": 576 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_50, "nTimeScale": ET_ST_SCALE_50 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_NTSC_5994P_16_9, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 720, "nHeight": 486 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_5994, "nTimeScale": ET_ST_SCALE_5994 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_PAL_25P, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 720, "nHeight": 576 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_25, "nTimeScale": ET_ST_SCALE_25, }, "eAspectRatio": ET_AspectRatio_4_3, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_NTSC_2997P, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 720, "nHeight": 486 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_2997, "nTimeScale": ET_ST_SCALE_2997 }, "eAspectRatio": ET_AspectRatio_4_3, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_PAL_25P_16_9, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 720, "nHeight": 576 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_25, "nTimeScale": ET_ST_SCALE_25, }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }, { "tpVideoStand": ET_VideoStandard_NTSC_2997P_16_9, "tpVideoStandardInfo": { "nVersion": 0, "tpAspect": { "nWidth": 720, "nHeight": 486 }, "tpFrameRate": { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_2997, "nTimeScale": ET_ST_SCALE_2997 }, "eAspectRatio": ET_AspectRatio_16_9, "eView": 1, "eBitCount": 8 } }];

    var ET_EXSIT_VIDEOSTANDARD_NUM = G_EXST_VIDEOSTANDARD_ARRAY.length;


    var G_ET_FRAMERATE_ARRAY = [{ "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": 0, "nTimeScale": 1 }, { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_25, "nTimeScale": ET_ST_SCALE_25 }, { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_2997, "nTimeScale": ET_ST_SCALE_2997 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_25, "nTimeScale": ET_ST_SCALE_25 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_2398, "nTimeScale": ET_ST_SCALE_2398 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_24, "nTimeScale": ET_ST_SCALE_24 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_2997, "nTimeScale": ET_ST_SCALE_2997 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_30, "nTimeScale": ET_ST_SCALE_30 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_50, "nTimeScale": ET_ST_SCALE_50 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_5994, "nTimeScale": ET_ST_SCALE_5994 }, { "eScanMode": ET_ScanMode_Interlaced, "nTimeRate": ET_ST_FRAME_RATE_30, "nTimeScale": ET_ST_SCALE_30 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_60, "nTimeScale": ET_ST_SCALE_60 }, { "eScanMode": ET_ScanMode_Interlaced_BottomFirst, "nTimeRate": ET_ST_FRAME_RATE_25, "nTimeScale": ET_ST_SCALE_25 }, { "eScanMode": ET_ScanMode_Interlaced_BottomFirst, "nTimeRate": ET_ST_FRAME_RATE_2997, "nTimeScale": ET_ST_SCALE_2997 }, { "eScanMode": ET_ScanMode_Interlaced_BottomFirst, "nTimeRate": ET_ST_FRAME_RATE_30, "nTimeScale": ET_ST_SCALE_30 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_22, "nTimeScale": ET_ST_SCALE_22 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_21, "nTimeScale": ET_ST_SCALE_21 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_20, "nTimeScale": ET_ST_SCALE_20 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_19, "nTimeScale": ET_ST_SCALE_19 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_18, "nTimeScale": ET_ST_SCALE_18 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_17, "nTimeScale": ET_ST_SCALE_17 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_16, "nTimeScale": ET_ST_SCALE_16 }, { "eScanMode": ET_ScanMode_Progressive, "nTimeRate": ET_ST_FRAME_RATE_15, "nTimeScale": ET_ST_SCALE_15 }];
    var ET_FRAMERATE_NUM = G_ET_FRAMERATE_ARRAY.length;

    var G_WIDTH_ARRAY = [0, 720, 1920, 1440, 1280, 4096, 960, 640, 320, 360, 180, 240, 480, 160, 800, 1024, 1366, 2048, 3840];
    var ET_WIDTH_NUM = G_WIDTH_ARRAY.length;

    var G_HEIGHT_ARRAY = [0, 576, 1080, 720, 480, 486, 960, 2664, 2304, 3072, 240, 360, 288, 608, 320, 304, 600, 768, 1536, 400, 640, 2160];

    var ET_HEIGHT_NUM = G_HEIGHT_ARRAY.length;

    var G_VIEW_ARRAY = [0, 1, 2, 4, 8, 16, 32];

    var ET_VIEW_NUM = G_VIEW_ARRAY.length;

    var G_BITCOUNT_ARRAY = [0, 8, 10, 12, 16];
    var ET_BITCOUNT_NUM = G_BITCOUNT_ARRAY.length;

    ETGetScanMode = function (dwStandard) {
        var stFrameRate = ETGetVideoFrameRate(dwStandard);
        if (null != stFrameRate) {
            return stFrameRate.eScanMode;
        }
        return ET_ScanMode_Invalid;
    };


    //由制式得到帧率
    ETGetVideoFrameRate = function (dwStandard) {
        var pExsitVS = ETGetExsitVideoStandard(dwStandard);
        var tpFrameRate;
        if (null != pExsitVS) {
            return tpFrameRate = pExsitVS.tpVideoStandardInfo.tpFrameRate;
            //return pExsitVS.tpVideoStand == ET_VideoStandard_UNKNOW ? ETVS_VESION1_NG : ETVS_OK;
        }

        //var vRet = ETVS_FRAMERATE_NG;
        var iIndex = ETVS_FRAMERATE_I(dwStandard);

        if (iIndex > 0 && iIndex < ET_FRAMERATE_NUM) {
            tpFrameRate = G_ET_FRAMERATE_ARRAY[iIndex];
            //vRet = ETVS_OK;
        }
        else {
            tpFrameRate = G_ET_FRAMERATE_ARRAY[0];
        }
        return tpFrameRate;
        //return vRet;
    };

    ETGetExsitVideoStandard = function (dwStandard) {

        var iExsitVSCount = G_EXST_VIDEOSTANDARD_ARRAY.length;

        for (var i = 0; i < iExsitVSCount; i++) {
            if (G_EXST_VIDEOSTANDARD_ARRAY[i].tpVideoStand == dwStandard) {
                //return (ETExsitVideoStandard*)G_EXST_VIDEOSTANDARD_ARRAY+i;
                return G_EXST_VIDEOSTANDARD_ARRAY[i]
            }
        }
        return null;

    };

    //为了与之前的制式进行兼容，将使用新规则拼出来的制式，转成之前的制式值
    ET_GetOldStandard = function (dwStandard) {
        if (ETVS_VERSION(dwStandard) == 0) //已经是老制式，直接返回
            return dwStandard;

        var dwOldStadnard = ET_VideoStandard_UNKNOW;
        switch (dwStandard) {
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
    };

    ET_VS = function (lWidth, lHeight, eAspectRatio, lViewCount, dbFrameRate, eScanMode, lBitCount)//ljj@2010-12-31:根据值来整合制式
    {
        var vStandardInfo;
        var idxWidth = 0;
        var idxHeight = 0;
        var idxAspectRatio = 0;
        var idxView = 0;
        var idxBit = 0;
        var idxFrameRate = 0;

        //逐个遍历，双重标准：最小，和正差值最小。
        var lTmp = 0x7fffffff;
        var lTmp1 = 0;
        var lTmpIdx = -1;
        var lMinIndex = -1;
        var lMin = 0x7fff; // 32767 对于宽高够用 add by wgf@2012-5-9
        if (lWidth > 0) {
            //大于0才做。
            lTmpIdx = 5; // 4096
            for (var i = 1; i < ET_WIDTH_NUM; i++) {
                if (lWidth == G_WIDTH_ARRAY[i]) {
                    lTmpIdx = i;
                    break;
                }
                else {
                    if (lWidth < G_WIDTH_ARRAY[i] && G_WIDTH_ARRAY[i] < G_WIDTH_ARRAY[lTmpIdx]) {
                        lTmpIdx = i;
                    }
                }
            }

            if (lTmpIdx >= 1) //找到合适的值
            {
                idxWidth = lTmpIdx;
            }
            else {
                for (var i = 1; i < ET_WIDTH_NUM; i++) {
                    if (G_WIDTH_ARRAY[i] <= lMin) {
                        lMin = G_WIDTH_ARRAY[i];
                        lMinIndex = i;
                    }
                }

                if (lMinIndex >= 1) {
                    idxWidth = lMinIndex;
                }
                else {
                    idxWidth = 0;
                }
            }
        }
        else {
            idxWidth = 0;
        }

        //Height也一样
        lTmp = 0x7fffffff;
        lTmp1 = 0;
        lTmpIdx = -1;
        lMinIndex = -1;
        lMin = 0x7fff; // 32767 对于宽高够用 add by wgf@2012-5-9
        if (lHeight > 0) {
            //大于0才做。
            lTmpIdx = 9; // 3072
            for (var i = 1; i < ET_HEIGHT_NUM; i++) {
                if (lHeight == G_HEIGHT_ARRAY[i]) {
                    lTmpIdx = i;
                    break;
                }
                else {
                    if (lHeight < G_HEIGHT_ARRAY[i] && G_HEIGHT_ARRAY[i] < G_HEIGHT_ARRAY[lTmpIdx]) {
                        lTmpIdx = i;
                    }
                }
            }

            if (lTmpIdx >= 1) //找到合适的值
            {
                idxHeight = lTmpIdx;
            }
            else {
                for (var i = 1; i < ET_HEIGHT_NUM; i++) {
                    if (G_HEIGHT_ARRAY[i] <= lMin) {
                        lMin = G_HEIGHT_ARRAY[i];
                        lMinIndex = i;
                    }
                }

                if (lMinIndex >= 1) {
                    idxHeight = lMinIndex;
                }
                else {
                    idxHeight = 0;
                }
            }
        }
        else {
            idxHeight = 0;
        }

        //lViewCount:同理
        if (lViewCount == 0) {
            lViewCount = 1;
        }
        lTmp = 0x7fffffff;
        lTmp1 = 0;
        lTmpIdx = -1;
        lMinIndex = -1;
        lMin = 0x7fff; // 32767 对于宽高够用 add by wgf@2012-5-9
        for (var i = 1; i < ET_VIEW_NUM; i++) {
            lTmp1 = lViewCount - G_VIEW_ARRAY[i];
            if (lTmp1 == 0) {
                lTmpIdx = i;
                break;
            }
            if (lTmp1 > 0 && lTmp1 < lTmp) {
                lTmp = lTmp1;
                lTmpIdx = i;
            }
        }
        if (lTmpIdx >= 1) //找到合适的值
        {
            idxView = lTmpIdx;
        }
        else {
            for (var i = 1; i < ET_VIEW_NUM; i++) {
                if (G_VIEW_ARRAY[i] <= lMin) {
                    lMin = G_VIEW_ARRAY[i];
                    lMinIndex = i;
                }
            }
            if (lMinIndex >= 1) {
                idxView = lMinIndex;
            }
            else {
                idxView = 1;
            }
        }

        //dbFrameRate和eScanMode合起来制作ETRATE
        //采取最接近战略
        if (eScanMode == ET_ScanMode_Invalid) {
            eScanMode = ET_ScanMode_Interlaced;
        }
        var lNearlyIdx = -1;
        var dbNearlyFps = 0x7fffffff;
        if (eScanMode == ET_ScanMode_Interlaced_BottomFirst)
            eScanMode = ET_ScanMode_Interlaced;
        for (var i = 0; i < ET_FRAMERATE_NUM; i++) {
            if (G_ET_FRAMERATE_ARRAY[i].eScanMode == eScanMode) {
                var dbFps = parseInt(G_ET_FRAMERATE_ARRAY[i].nTimeRate / G_ET_FRAMERATE_ARRAY[i].nTimeScale);
                var dbTmp = Math.abs(dbFps - dbFrameRate);
                if (dbTmp <= dbNearlyFps) {
                    lNearlyIdx = i;
                    dbNearlyFps = dbTmp;
                }
            }
        }
        if (lNearlyIdx >= 1) {
            idxFrameRate = lNearlyIdx;
        }
        else {
            idxFrameRate = 0;
        }

        //lBitCount采取最接近策略
        if (lBitCount <= 0) {
            lBitCount = 8;
        }
        lNearlyIdx = -1;
        var lNearly = 0x7fffffff;
        for (var i = 0; i < ET_BITCOUNT_NUM; i++) {
            var ltmp = Math.abs((G_BITCOUNT_ARRAY[i] - lBitCount));
            if (ltmp <= lNearly) {
                lNearly = ltmp;
                lNearlyIdx = i;
            }
        }
        if (lNearlyIdx >= 1) {
            idxBit = lNearlyIdx;
        }
        else {
            idxBit = 0;
        }

        idxAspectRatio = eAspectRatio;

        /*
        vStandardInfo.nVersion = 1;
        vStandardInfo.eAspectRatio = idxAspectRatio;

        vStandardInfo.tpAspect = {};
        vStandardInfo.tpAspect.nWidth = G_WIDTH_ARRAY[idxWidth];
        vStandardInfo.tpAspect.nHeight = G_HEIGHT_ARRAY[idxHeight];
        vStandardInfo.eView = G_VIEW_ARRAY[idxView];
        vStandardInfo.tpFrameRate = G_ET_FRAMERATE_ARRAY[idxFrameRate];
        vStandardInfo.eBitCount = G_BITCOUNT_ARRAY[idxBit];
        */

        
        vStandardInfo = {
            "nVersion": 1,
            "tpAspect": {
                "nWidth": G_WIDTH_ARRAY[idxWidth],
                "nHeight": G_HEIGHT_ARRAY[idxHeight]
            },
            "tpFrameRate": {
                "eScanMode": G_ET_FRAMERATE_ARRAY[idxFrameRate].eScanMode,
                "nTimeRate": G_ET_FRAMERATE_ARRAY[idxFrameRate].nTimeRate,
                "nTimeScale": G_ET_FRAMERATE_ARRAY[idxFrameRate].nTimeScale
                },            
            "eAspectRatio": idxAspectRatio,
            "eView": G_VIEW_ARRAY[idxView],
            "eBitCount": G_BITCOUNT_ARRAY[idxBit]
        };


        return ET_GetOldStandard(ET_VS_EX(vStandardInfo));
    };

    ET_VS_EX = function(tpStandardInfo)
    {
        var dwStandard = ETVS_Unknown;
        //宽
        var bFindBest = false;
        var iMaxSimilarity = 5; // 4096
        for(var eWidth = 1 ; eWidth < ET_WIDTH_NUM; ++eWidth)
        {
            if (G_WIDTH_ARRAY[eWidth] == tpStandardInfo.tpAspect.nWidth)
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
        for( var eHeight = 1; eHeight < ET_HEIGHT_NUM; ++ eHeight)
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
        var tpFrameRate = tpStandardInfo.tpFrameRate;
        if(tpFrameRate.eScanMode == ET_ScanMode_Interlaced_BottomFirst)
            tpFrameRate.eScanMode = ET_ScanMode_Interlaced;
        for( var eFrameRate = 1; eFrameRate < ET_FRAMERATE_NUM; ++ eFrameRate)
        {
            if( G_ET_FRAMERATE_ARRAY[eFrameRate] == tpFrameRate)
            {
                ETVS_SET_FRAMERATE(eFrameRate,dwStandard);
                break;
            }
        }

        //画面个数
        for( var eView = 1; eView < ET_VIEW_NUM; ++ eView)
        {
            if( G_VIEW_ARRAY[eView] == tpStandardInfo.eView)
            {
                ETVS_SET_VIEW(eView,dwStandard);
                break;
            }
        }

        //宽幅比
        for (var eAspectRatio = 1; eAspectRatio < ET_AspectRatio_MAX; ++eAspectRatio)
        {
            if (eAspectRatio == tpStandardInfo.eAspectRatio)
            {
                ETVS_SET_DAR(eAspectRatio, dwStandard);
                break;
            }
        }

        //Bit位数
        for (var eBitCount = 1; eBitCount < ET_BITCOUNT_NUM; ++eBitCount)
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
    ET_VSI = function (dwStandard) {
        var pExsitVS = ETGetExsitVideoStandard(dwStandard);
        if (null != pExsitVS) {
            return pExsitVS.tpVideoStandardInfo;
        }

        var tpStandardInfo;
        var tpAspect;
        if (tpStandardInfo != undefined) {
            tpStandardInfo.nVersion = 1;
            ETGetVideoApsect(dwStandard, tpStandardInfo.tpAspect);
            ETGetVideoFrameRate(dwStandard, tpStandardInfo.tpFrameRate);
            ETGetVideoAspectRatio(dwStandard, tpAspect);
            tpStandardInfo.eAspectRatio = tpAspect;
            ETGetVideoView(dwStandard, tpStandardInfo.eView);
            ETGetVideoBitCount(dwStandard, tpStandardInfo.eBitCount);
        }
        return tpStandardInfo;
    }

    var G_ETVIDEOSTANDARD_DESC_ARRAY = [{ "dwVideoStandard": ET_VideoStandard_PAL, "dwHSClass": ET_VIDEO_HS_SD, "strTitle": "625/50i" }, { "dwVideoStandard": ET_VideoStandard_1440_1080_50i, "dwHSClass": ET_VIDEO_HS_HD1440i, "strTitle": "1080/50i" }, { "dwVideoStandard": ET_VideoStandard_1920_1080_50i, "dwHSClass": ET_VIDEO_HS_HD1080i, "strTitle": "1080/50i(1920*1080)" }, { "dwVideoStandard": ET_VS(720, 576, ET_AspectRatio_4_3, 2, 25.0, ET_ScanMode_Interlaced, 8), "dwHSClass": ET_3D_HS_SD, "strTitle": "3D 625/50i" }, { "dwVideoStandard": ET_VS(1440, 1080, ET_AspectRatio_16_9, 2, 25.0, ET_ScanMode_Interlaced, 8), "dwHSClass": ET_3D_HS_HD1440i, "strTitle": "3D 1080/50i" }, { "dwVideoStandard": ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 25.0, ET_ScanMode_Interlaced, 8), "dwHSClass": ET_3D_HS_HD1080i, "strTitle": "3D 1080/50i(1920*1080)" }, { "dwVideoStandard": ET_VS(1280, 720, ET_AspectRatio_16_9, 1, 25.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_VIDEO_HS_HD720p, "strTitle": "HD1280*720 25p" }, { "dwVideoStandard": ET_VideoStandard_1920_1080_25p, "dwHSClass": ET_VIDEO_HS_HD1080p, "strTitle": "HD1920*1080 25p" }, { "dwVideoStandard": ET_VS(4096, 2304, ET_AspectRatio_16_9, 1, 25.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_VIDEO_HS_4K, "strTitle": "HD4096*2304 25p" }, { "dwVideoStandard": ET_VS(4096, 3072, ET_AspectRatio_4_3, 1, 25.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_VIDEO_HS_4K, "strTitle": "HD4096*3072 25p" }, { "dwVideoStandard": ET_VS(3840, 2160, ET_AspectRatio_16_9, 1, 25.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_VIDEO_HS_4K, "strTitle": "QFHD3840*2160 25p" }, { "dwVideoStandard": ET_VS(1280, 720, ET_AspectRatio_16_9, 2, 25.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_HD720p, "strTitle": "3D HD1280*720 25p" }, { "dwVideoStandard": ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 25.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_HD1080p, "strTitle": "3D HD1920*1080 25p" }, { "dwVideoStandard": ET_VS(4096, 2304, ET_AspectRatio_16_9, 2, 25.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_4K, "strTitle": "3D HD4096*2304 25p" }, { "dwVideoStandard": ET_VS(4096, 3072, ET_AspectRatio_4_3, 2, 25.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_4K, "strTitle": "3D HD4096*3072 25p" }, { "dwVideoStandard": ET_VS(3840, 2160, ET_AspectRatio_16_9, 2, 25.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_4K, "strTitle": "3D QFHD3840*2160 25p" }, { "dwVideoStandard": ET_VideoStandard_NTSC_2997, "dwHSClass": ET_VIDEO_HS_SD, "strTitle": "525/59.94i" }, { "dwVideoStandard": ET_VideoStandard_1440_1080_5994i, "dwHSClass": ET_VIDEO_HS_HD1440i, "strTitle": "1080/59.94i" }, { "dwVideoStandard": ET_VideoStandard_1920_1080_5994i, "dwHSClass": ET_VIDEO_HS_HD1080i, "strTitle": "1080/59.94i(1920*1080)" }, { "dwVideoStandard": ET_VideoStandard_NTSC_2997_16_9, "dwHSClass": ET_VIDEO_HS_SD, "strTitle": "525/59.94i(16:9)" }, { "dwVideoStandard": ET_VideoStandard_NTSC_2997_480, "dwHSClass": ET_VIDEO_HS_SD, "strTitle": "525/59.94i(480)" }, { "dwVideoStandard": ET_VS(720, 486, ET_AspectRatio_4_3, 2, 29.97, ET_ScanMode_Interlaced, 8), "dwHSClass": ET_3D_HS_SD, "strTitle": "3D 525/59.94i" }, { "dwVideoStandard": ET_VS(1440, 1080, ET_AspectRatio_16_9, 2, 29.97, ET_ScanMode_Interlaced, 8), "dwHSClass": ET_3D_HS_HD1440i, "strTitle": "3D 1080/59.94i" }, { "dwVideoStandard": ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 29.97, ET_ScanMode_Interlaced, 8), "dwHSClass": ET_3D_HS_HD1080i, "strTitle": "3D 1080/59.94i(1920*1080)" }, { "dwVideoStandard": ET_VideoStandard_NTSC_30, "dwHSClass": ET_VIDEO_HS_SD, "strTitle": "525/60i" }, { "dwVideoStandard": ET_VideoStandard_1440_1080_60i, "dwHSClass": ET_VIDEO_HS_HD1440i, "strTitle": "1080/60i" }, { "dwVideoStandard": ET_VideoStandard_1920_1080_60i, "dwHSClass": ET_VIDEO_HS_HD1080i, "strTitle": "1080/60i(1920*1080)" }, { "dwVideoStandard": ET_VS(720, 486, ET_AspectRatio_4_3, 2, 30.0, ET_ScanMode_Interlaced, 8), "dwHSClass": ET_3D_HS_SD, "strTitle": "3D 525/60i" }, { "dwVideoStandard": ET_VS(1440, 1080, ET_AspectRatio_16_9, 2, 30.0, ET_ScanMode_Interlaced, 8), "dwHSClass": ET_3D_HS_HD1440i, "strTitle": "3D 1080/60i" }, { "dwVideoStandard": ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 30.0, ET_ScanMode_Interlaced, 8), "dwHSClass": ET_3D_HS_HD1080i, "strTitle": "3D 1080/60i(1920*1080)" }, { "dwVideoStandard": ET_VideoStandard_1280_720_50p, "dwHSClass": ET_VIDEO_HS_HD720p, "strTitle": "HD1280*720 50p" }, { "dwVideoStandard": ET_VS(1920, 1080, ET_AspectRatio_16_9, 1, 50.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_VIDEO_HS_HD1080p, "strTitle": "HD1920*1080 50p" }, { "dwVideoStandard": ET_VS(1280, 720, ET_AspectRatio_16_9, 2, 50.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_HD720p, "strTitle": "3D HD1280*720 50p" }, { "dwVideoStandard": ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 50.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_HD1080p, "strTitle": "3D HD1920*1080 50p" }, { "dwVideoStandard": ET_VideoStandard_1280_720_24p, "dwHSClass": ET_VIDEO_HS_HD720p, "strTitle": "HD1280*720 24p" }, { "dwVideoStandard": ET_VideoStandard_1920_1080_24p, "dwHSClass": ET_VIDEO_HS_HD1080p, "strTitle": "HD1920*1080 24p" }, { "dwVideoStandard": ET_VS(4096, 2304, ET_AspectRatio_16_9, 1, 24.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_VIDEO_HS_4K, "strTitle": "HD4096*2304 24p" }, { "dwVideoStandard": ET_VS(4096, 3072, ET_AspectRatio_4_3, 1, 24.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_VIDEO_HS_4K, "strTitle": "HD4096*3072 24p" }, { "dwVideoStandard": ET_VS(3840, 2160, ET_AspectRatio_16_9, 1, 24.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_VIDEO_HS_4K, "strTitle": "QFHD3840*2160 24p" }, { "dwVideoStandard": ET_VS(1280, 720, ET_AspectRatio_16_9, 2, 24.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_HD720p, "strTitle": "3D HD1280*720 24p" }, { "dwVideoStandard": ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 24.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_HD1080p, "strTitle": "3D HD1920*1080 24p" }, { "dwVideoStandard": ET_VS(4096, 2304, ET_AspectRatio_16_9, 2, 24.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_4K, "strTitle": "3D HD4096*2304 24p" }, { "dwVideoStandard": ET_VS(4096, 3072, ET_AspectRatio_4_3, 2, 24.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_4K, "strTitle": "3D HD4096*3072 24p" }, { "dwVideoStandard": ET_VS(3840, 2160, ET_AspectRatio_16_9, 2, 24.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_4K, "strTitle": "3D QFHD3840*2160 24p" }, { "dwVideoStandard": ET_VideoStandard_1280_720_2398p, "dwHSClass": ET_VIDEO_HS_HD720p, "strTitle": "HD1280*720 23.98p" }, { "dwVideoStandard": ET_VideoStandard_1920_1080_2398p, "dwHSClass": ET_VIDEO_HS_HD1080p, "strTitle": "HD1920*1080 23.98p" }, { "dwVideoStandard": ET_VS(1280, 720, ET_AspectRatio_16_9, 2, 23.98, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_HD720p, "strTitle": "3D HD1280*720 23.98p" }, { "dwVideoStandard": ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 23.98, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_HD1080p, "strTitle": "3D HD1920*1080 23.98p" }, { "dwVideoStandard": ET_VS(1280, 720, ET_AspectRatio_16_9, 1, 29.97, ET_ScanMode_Progressive, 8), "dwHSClass": ET_VIDEO_HS_HD720p, "strTitle": "HD1280*720 29.97p" }, { "dwVideoStandard": ET_VS(1440, 1080, ET_AspectRatio_16_9, 1, 29.97, ET_ScanMode_Progressive, 8), "dwHSClass": ET_VIDEO_HS_HD1080p, "strTitle": "HD1440*1080 29.97p" }, { "dwVideoStandard": ET_VideoStandard_1920_1080_2997p, "dwHSClass": ET_VIDEO_HS_HD1080p, "strTitle": "HD1920*1080 29.97p" }, { "dwVideoStandard": ET_VS(1280, 720, ET_AspectRatio_16_9, 2, 29.97, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_HD720p, "strTitle": "3D HD1280*720 29.97p" }, { "dwVideoStandard": ET_VS(1440, 1080, ET_AspectRatio_16_9, 2, 29.97, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_HD1080p, "strTitle": "3D HD1440*1080 29.97p" }, { "dwVideoStandard": ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 29.97, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_HD1080p, "strTitle": "3D HD1920*1080 29.97p" }, { "dwVideoStandard": ET_VS(1280, 720, ET_AspectRatio_16_9, 1, 30, ET_ScanMode_Progressive, 8), "dwHSClass": ET_VIDEO_HS_HD720p, "strTitle": "HD1280*720 30p" }, { "dwVideoStandard": ET_VS(1440, 1080, ET_AspectRatio_16_9, 1, 30, ET_ScanMode_Progressive, 8), "dwHSClass": ET_VIDEO_HS_HD1080p, "strTitle": "HD1440*1080 30p" }, { "dwVideoStandard": ET_VideoStandard_1920_1080_30p, "dwHSClass": ET_VIDEO_HS_HD1080p, "strTitle": "HD1920*1080 30p" }, { "dwVideoStandard": ET_VS(1280, 720, ET_AspectRatio_16_9, 2, 30, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_HD1080p, "strTitle": "3D HD1280*720 30p" }, { "dwVideoStandard": ET_VS(1440, 1080, ET_AspectRatio_16_9, 2, 30, ET_ScanMode_Progressive, 8), "dwHSClass": ET_VIDEO_HS_HD1080p, "strTitle": "3D HD1440*1080 30p" }, { "dwVideoStandard": ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 30.0, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_HD1080p, "strTitle": "3D HD1920*1080 30p" }, { "dwVideoStandard": ET_VideoStandard_1280_720_5994p, "dwHSClass": ET_VIDEO_HS_HD720p, "strTitle": "HD1280*720 59.94p" }, { "dwVideoStandard": ET_VS(1920, 1080, ET_AspectRatio_16_9, 1, 59.94, ET_ScanMode_Progressive, 8), "dwHSClass": ET_VIDEO_HS_HD1080p, "strTitle": "HD1920*1080 59.94p" }, { "dwVideoStandard": ET_VS(1280, 720, ET_AspectRatio_16_9, 2, 59.94, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_HD720p, "strTitle": "3D HD1280*720 59.94p" }, { "dwVideoStandard": ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 59.94, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_HD1080p, "strTitle": "3D HD1920*1080 59.94p" }, { "dwVideoStandard": ET_VS(1280, 720, ET_AspectRatio_16_9, 1, 60, ET_ScanMode_Progressive, 8), "dwHSClass": ET_VIDEO_HS_HD720p, "strTitle": "HD1280*720 60p" }, { "dwVideoStandard": ET_VS(1920, 1080, ET_AspectRatio_16_9, 1, 60, ET_ScanMode_Progressive, 8), "dwHSClass": ET_VIDEO_HS_HD1080p, "strTitle": "HD1920*1080 60p" }, { "dwVideoStandard": ET_VS(1280, 720, ET_AspectRatio_16_9, 2, 60, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_HD720p, "strTitle": "3D HD1280*720 60p" }, { "dwVideoStandard": ET_VS(1920, 1080, ET_AspectRatio_16_9, 2, 60, ET_ScanMode_Progressive, 8), "dwHSClass": ET_3D_HS_HD1080p, "strTitle": "3D HD1920*1080 60p" }];

    var ET_VIDEOSTANDARD_NUM = G_ETVIDEOSTANDARD_DESC_ARRAY.length;

    //由制式得到宽高
    ETGetVideoApsect = function (dwStandard) {
        var pExsitVS = ETGetExsitVideoStandard(dwStandard);
        if (NULL != pExsitVS) {
            tpAspect = pExsitVS.tpVideoStandardInfo.tpAspect;
            return tpAspect;
            //return pExsitVS->tpVideoStand == ET_VideoStandard_UNKNOW ? ETVS_VESION1_NG : ETVS_OK;
        }

        var vRet = ETVS_OK;
        var iwIndex = ETVS_WIDTH_I(dwStandard);
        var ihIndex = ETVS_HEIGHT_I(dwStandard);

        if (iwIndex > 0 && iwIndex < ET_WIDTH_NUM)
            tpAspect.nWidth = G_WIDTH_ARRAY[iwIndex];
        else {
            tpAspect.nWidth = G_WIDTH_ARRAY[0];
            vRet |= ETVS_WIDTH_NG;
        }

        if (ihIndex > 0 && ihIndex < ET_HEIGHT_NUM)
            tpAspect.nHeight = G_HEIGHT_ARRAY[ihIndex];
        else {
            tpAspect.nHeight = G_HEIGHT_ARRAY[0];
            vRet |= ETVS_HEIGHT_NG;
        }
        return tpAspect;
        //return vRet;
    }

    //由制式得到DAR
    ETGetVideoAspectRatio = function (dwStandard) {
        var pExsitVS = ETGetExsitVideoStandard(dwStandard);
        if (null != pExsitVS) {
            eAspectRatio = pExsitVS.tpVideoStandardInfo.eAspectRatio;
            return eAspectRatio;
            //return pExsitVS->tpVideoStand == ET_VideoStandard_UNKNOW ? ETVS_VESION1_NG : ETVS_OK;
        }

        var vRet = ETVS_DAR_NG;
        var iIndex = ETVS_DAR_I(dwStandard);

        if (iIndex > 0 && iIndex < ET_AspectRatio_MAX) {
            eAspectRatio = iIndex;
            vRet = ETVS_OK;
        }
        else {
            eAspectRatio = iIndex;
        }

        return eAspectRatio;
        // return vRet;
    }

    //获取当前的系统制式属于哪一种制式系列，提供给不带MFC的库使用
    this.ET_VideoStandardGetHSClass=function(vStandard)
    {
        if (vStandard == ET_VideoStandard_UNKNOW)
            return ET_VIDEO_HS_UNKNOWN;

        var dwHSClass = ET_VIDEO_HS_UNKNOWN;
        for (var i = 0; i < ET_VIDEOSTANDARD_NUM; ++i)
        {
            if (vStandard == G_ETVIDEOSTANDARD_DESC_ARRAY[i].dwVideoStandard)
            {
                dwHSClass = G_ETVIDEOSTANDARD_DESC_ARRAY[i].dwHSClass;
                break;
            }
        }

        if (dwHSClass == ET_VIDEO_HS_UNKNOWN) //非标准制式
        {
            var info = ET_VSI(vStandard);
            if (info != undefined) {
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
        }
        return dwHSClass;
    };

    this.ETGetVideoStandardPI_FrameRate = function(vStandard)
    {
        var PI_FrameRate = {"PI":ETGetVideoStandardPI(vStandard),"FrameRate":ETGetFrameRate(vStandard)};
        return PI_FrameRate;        
    }

    this.ETGetVideoStandardPI = function(dwStandard)
    {
          //首先获取扫描模式
        var dwScanMode = ETGetScanMode(dwStandard);
        //逐行/隔行
        if(ET_ScanMode_Progressive == dwScanMode)
        {
            return ET_ScanMode_Progressive;
        }
        else if(ET_ScanMode_Interlaced == dwScanMode || ET_ScanMode_Interlaced_BottomFirst == dwScanMode)
        {
            return ET_ScanMode_Interlaced;
        }
        else 
        {
            return ET_ScanMode_Invalid;
        }
    }

    this.ET_VideoStandardIsProgressive = function(vStandard){
        //首先获取扫描模式
        var dwScanMode = ETGetScanMode(vStandard);
        //逐行/隔行
        return (ET_ScanMode_Progressive == dwScanMode);
    };

    this.ET_VideoStandardIsInterlaced = function(dwStandard)
    {
        //首先获取扫描模式
        var dwScanMode = ETGetScanMode(dwStandard);
        //逐行/隔行
        return (ET_ScanMode_Interlaced == dwScanMode || ET_ScanMode_Interlaced_BottomFirst == dwScanMode);
    };

    this.ETGetFrameRate = function(dwStandard) //ljj@2011-1-5:得到double的frameRate。
    {
        var stFrameRate = ETGetVideoFrameRate(dwStandard);
        if (null != stFrameRate && stFrameRate.nTimeScale > 0)
        {
            return ( stFrameRate.nTimeRate / stFrameRate.nTimeScale);
        }
        return 0.0;
    }

   




})(jQuery);
