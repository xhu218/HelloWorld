
    var   ET_ScanMode_Invalid         = 0;
    var ET_ScanMode_Interlaced      = 1;                //隔行扫描;同时意为顶场优先
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
    var FRAMES_HOUR_50            =  180000  ;// 50 Frame: frames per hour

    var G_ET_FRAMERATE_ARRAY =
    [
        {
        "eScanMode": ET_ScanMode_Interlaced,
        "nTimeRate": 0,
        "nTimeScale": 1
        },
        {
            "eScanMode": ET_ScanMode_Interlaced,
            "nTimeRate": ET_ST_FRAME_RATE_25,
            "nTimeScale": ET_ST_SCALE_25
        },
        {
            "eScanMode": ET_ScanMode_Interlaced,
            "nTimeRate": ET_ST_FRAME_RATE_2997,
            "nTimeScale": ET_ST_SCALE_2997
        },
        {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_25,
            "nTimeScale": ET_ST_SCALE_25
        },
        {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_2398,
            "nTimeScale": ET_ST_SCALE_2398
        },
        {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_24,
            "nTimeScale": ET_ST_SCALE_24
        },
        {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_2997,
            "nTimeScale": ET_ST_SCALE_2997
        },
        {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_30,
            "nTimeScale": ET_ST_SCALE_30
        },
        {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_50,
            "nTimeScale": ET_ST_SCALE_50
        },
        {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_5994,
            "nTimeScale": ET_ST_SCALE_5994
        },
        {
            "eScanMode": ET_ScanMode_Interlaced,
            "nTimeRate": ET_ST_FRAME_RATE_30,
            "nTimeScale": ET_ST_SCALE_30
        },
        {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_60,
            "nTimeScale": ET_ST_SCALE_60
        },
        {
            "eScanMode": ET_ScanMode_Interlaced_BottomFirst,
            "nTimeRate": ET_ST_FRAME_RATE_25,
            "nTimeScale": ET_ST_SCALE_25
        },
        {
            "eScanMode": ET_ScanMode_Interlaced_BottomFirst,
            "nTimeRate": ET_ST_FRAME_RATE_2997,
            "nTimeScale": ET_ST_SCALE_2997
        },
        {
            "eScanMode": ET_ScanMode_Interlaced_BottomFirst,
            "nTimeRate": ET_ST_FRAME_RATE_30,
            "nTimeScale": ET_ST_SCALE_30
        },
        {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_22,
            "nTimeScale": ET_ST_SCALE_22
        },
        {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_21,
            "nTimeScale": ET_ST_SCALE_21
        },
        {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_20,
            "nTimeScale": ET_ST_SCALE_20
        },
        {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_19,
            "nTimeScale": ET_ST_SCALE_19
        },
        {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_18,
            "nTimeScale": ET_ST_SCALE_18
        },
        {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_17,
            "nTimeScale": ET_ST_SCALE_17
        },
        {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_16,
            "nTimeScale": ET_ST_SCALE_16
        },
        {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_15,
            "nTimeScale": ET_ST_SCALE_15
        }
    ];

    var G_EXST_VIDEOSTANDARD_ARRAY = [
    {
        "tpVideoStand": ET_VideoStandard_UNKNOW,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 0,
                "nHeight": 0
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Interlaced,
                "nTimeRate": 0,
                "nTimeScale": 1
            },
            "eAspectRatio": ET_AspectRatio_Unknown,
            "eView": 0,
            "eBitCount": 0
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_PAL,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 720,
                "nHeight": 576
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Interlaced,
                "nTimeRate": ET_ST_FRAME_RATE_25,
                "nTimeScale": ET_ST_SCALE_25,
        },
        "eAspectRatio": ET_AspectRatio_4_3,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_NTSC_2997,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 720,
            "nHeight": 486
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Interlaced,
            "nTimeRate": ET_ST_FRAME_RATE_2997,
            "nTimeScale": ET_ST_SCALE_2997
        },
        "eAspectRatio": ET_AspectRatio_4_3,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_NTSC_30,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 720,
            "nHeight": 486
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Interlaced,
            "nTimeRate": ET_ST_FRAME_RATE_30,
            "nTimeScale": ET_ST_SCALE_30
        },
        "eAspectRatio": ET_AspectRatio_4_3,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_1920_1080_50i,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 1920,
            "nHeight": 1080
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Interlaced,
            "nTimeRate": ET_ST_FRAME_RATE_25,
            "nTimeScale": ET_ST_SCALE_25,
            },
            "eAspectRatio": ET_AspectRatio_16_9,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_1920_1080_5994i,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 1920,
                "nHeight": 1080
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Interlaced,
                "nTimeRate": ET_ST_FRAME_RATE_2997,
                "nTimeScale": ET_ST_SCALE_2997
            },
            "eAspectRatio": ET_AspectRatio_16_9,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_1920_1080_60i,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 1920,
                "nHeight": 1080
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Interlaced,
                "nTimeRate": ET_ST_FRAME_RATE_30,
                "nTimeScale": ET_ST_SCALE_30
            },
            "eAspectRatio": ET_AspectRatio_16_9,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_1920_1080_2398p,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 1920,
                "nHeight": 1080
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Progressive,
                "nTimeRate": ET_ST_FRAME_RATE_2398,
                "nTimeScale": ET_ST_SCALE_2398
            },
            "eAspectRatio": ET_AspectRatio_16_9,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_1920_1080_24p,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 1920,
                "nHeight": 1080
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Progressive,
                "nTimeRate": ET_ST_FRAME_RATE_24,
                "nTimeScale": ET_ST_SCALE_24
            },
            "eAspectRatio": ET_AspectRatio_16_9,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_1920_1080_25p,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 1920,
                "nHeight": 1080
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Progressive,
                "nTimeRate": ET_ST_FRAME_RATE_25,
                "nTimeScale": ET_ST_SCALE_25,
        },
        "eAspectRatio": ET_AspectRatio_16_9,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_1920_1080_2997p,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 1920,
            "nHeight": 1080
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_2997,
            "nTimeScale": ET_ST_SCALE_2997
        },
        "eAspectRatio": ET_AspectRatio_16_9,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_1920_1080_30p,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 1920,
            "nHeight": 1080
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_30,
            "nTimeScale": ET_ST_SCALE_30
        },
        "eAspectRatio": ET_AspectRatio_16_9,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_1280_720_2398p,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 1280,
            "nHeight": 720
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_2398,
            "nTimeScale": ET_ST_SCALE_2398
        },
        "eAspectRatio": ET_AspectRatio_16_9,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_1280_720_24p,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 1280,
            "nHeight": 720
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_24,
            "nTimeScale": ET_ST_SCALE_24
        },
        "eAspectRatio": ET_AspectRatio_16_9,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_1280_720_50p,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 1280,
            "nHeight": 720
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_50,
            "nTimeScale": ET_ST_SCALE_50
        },
        "eAspectRatio": ET_AspectRatio_16_9,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_1280_720_5994p,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 1280,
            "nHeight": 720
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_5994,
            "nTimeScale": ET_ST_SCALE_5994
        },
        "eAspectRatio": ET_AspectRatio_16_9,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_1440_1080_50i,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 1440,
            "nHeight": 1080
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Interlaced,
            "nTimeRate": ET_ST_FRAME_RATE_25,
            "nTimeScale": ET_ST_SCALE_25,
            },
            "eAspectRatio": ET_AspectRatio_16_9,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_1440_1080_5994i,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 1440,
                "nHeight": 1080
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Interlaced,
                "nTimeRate": ET_ST_FRAME_RATE_2997,
                "nTimeScale": ET_ST_SCALE_2997
            },
            "eAspectRatio": ET_AspectRatio_16_9,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_1440_1080_60i,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 1440,
                "nHeight": 1080
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Interlaced,
                "nTimeRate": ET_ST_FRAME_RATE_30,
                "nTimeScale": ET_ST_SCALE_30
            },
            "eAspectRatio": ET_AspectRatio_16_9,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_PAL_16_9,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 720,
                "nHeight": 576
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Interlaced,
                "nTimeRate": ET_ST_FRAME_RATE_25,
                "nTimeScale": ET_ST_SCALE_25,
        },
        "eAspectRatio": ET_AspectRatio_16_9,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_NTSC_2997_16_9,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 720,
            "nHeight": 486
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Interlaced,
            "nTimeRate": ET_ST_FRAME_RATE_2997,
            "nTimeScale": ET_ST_SCALE_2997
        },
        "eAspectRatio": ET_AspectRatio_16_9,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_NTSC_30_16_9,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 720,
            "nHeight": 486
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Interlaced,
            "nTimeRate": ET_ST_FRAME_RATE_30,
            "nTimeScale": ET_ST_SCALE_30
        },
        "eAspectRatio": ET_AspectRatio_16_9,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_NTSC_2997_480,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 720,
            "nHeight": 480
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Interlaced,
            "nTimeRate": ET_ST_FRAME_RATE_2997,
            "nTimeScale": ET_ST_SCALE_2997
        },
        "eAspectRatio": ET_AspectRatio_4_3,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_NTSC_30_480,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 720,
            "nHeight": 480
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Interlaced,
            "nTimeRate": ET_ST_FRAME_RATE_30,
            "nTimeScale": ET_ST_SCALE_30
        },
        "eAspectRatio": ET_AspectRatio_4_3,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_1280_720_25p,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 1280,
            "nHeight": 720
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_25,
            "nTimeScale": ET_ST_SCALE_25,
            },
            "eAspectRatio": ET_AspectRatio_16_9,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_1280_720_2997p,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 1280,
                "nHeight": 720
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Progressive,
                "nTimeRate": ET_ST_FRAME_RATE_2997,
                "nTimeScale": ET_ST_SCALE_2997
            },
            "eAspectRatio": ET_AspectRatio_16_9,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_1280_720_25pex,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 1280,
                "nHeight": 720
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Progressive,
                "nTimeRate": ET_ST_FRAME_RATE_25,
                "nTimeScale": ET_ST_SCALE_25,
        },
        "eAspectRatio": ET_AspectRatio_16_9,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_1280_720_2997pex,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 1280,
            "nHeight": 720
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_2997,
            "nTimeScale": ET_ST_SCALE_2997
        },
        "eAspectRatio": ET_AspectRatio_16_9,
        "eView": 1,
        "eBitCount": 8
    }

},
{
    "tpVideoStand": ET_VideoStandard_4096_2304_25p,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 4096,
            "nHeight": 2304
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_25,
            "nTimeScale": ET_ST_SCALE_25,
            },
            "eAspectRatio": ET_AspectRatio_16_9,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_4096_3072_25p,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 4096,
                "nHeight": 3072
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Progressive,
                "nTimeRate": ET_ST_FRAME_RATE_25,
                "nTimeScale": ET_ST_SCALE_25,
        },
        "eAspectRatio": ET_AspectRatio_4_3,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_1280_1080_50i,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 1280,
            "nHeight": 1080
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Interlaced,
            "nTimeRate": ET_ST_FRAME_RATE_25,
            "nTimeScale": ET_ST_SCALE_25,
            },
            "eAspectRatio": ET_AspectRatio_16_9,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_1280_1080_5994i,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 1280,
                "nHeight": 1080
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Interlaced,
                "nTimeRate": ET_ST_FRAME_RATE_2997,
                "nTimeScale": ET_ST_SCALE_2997
            },
            "eAspectRatio": ET_AspectRatio_16_9,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_1280_1080_60i,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 1280,
                "nHeight": 1080
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Interlaced,
                "nTimeRate": ET_ST_FRAME_RATE_30,
                "nTimeScale": ET_ST_SCALE_30
            },
            "eAspectRatio": ET_AspectRatio_16_9,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_1920_1080_50p,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 1920,
                "nHeight": 1080
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Progressive,
                "nTimeRate": ET_ST_FRAME_RATE_50,
                "nTimeScale": ET_ST_SCALE_50
            },
            "eAspectRatio": ET_AspectRatio_16_9,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_1920_1080_5994p,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 1920,
                "nHeight": 1080
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Progressive,
                "nTimeRate": ET_ST_FRAME_RATE_5994,
                "nTimeScale": ET_ST_SCALE_5994
            },
            "eAspectRatio": ET_AspectRatio_16_9,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_1440_1080_50p,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 1440,
                "nHeight": 1080
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Progressive,
                "nTimeRate": ET_ST_FRAME_RATE_50,
                "nTimeScale": ET_ST_SCALE_50
            },
            "eAspectRatio": ET_AspectRatio_16_9,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_1440_1080_5994p,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 1440,
                "nHeight": 1080
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Progressive,
                "nTimeRate": ET_ST_FRAME_RATE_5994,
                "nTimeScale": ET_ST_SCALE_5994
            },
            "eAspectRatio": ET_AspectRatio_16_9,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_1440_1080_25p,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 1440,
                "nHeight": 1080
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Progressive,
                "nTimeRate": ET_ST_FRAME_RATE_25,
                "nTimeScale": ET_ST_SCALE_25,
        },
        "eAspectRatio": ET_AspectRatio_16_9,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_1440_1080_2997p,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 1440,
            "nHeight": 1080
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_2997,
            "nTimeScale": ET_ST_SCALE_2997
        },
        "eAspectRatio": ET_AspectRatio_16_9,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_PAL_50P,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 720,
            "nHeight": 576
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_50,
            "nTimeScale": ET_ST_SCALE_50
        },
        "eAspectRatio": ET_AspectRatio_4_3,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_NTSC_5994P,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 720,
            "nHeight": 486
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_5994,
            "nTimeScale": ET_ST_SCALE_5994
        },
        "eAspectRatio": ET_AspectRatio_4_3,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_PAL_50P_16_9,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 720,
            "nHeight": 576
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_50,
            "nTimeScale": ET_ST_SCALE_50
        },
        "eAspectRatio": ET_AspectRatio_16_9,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_NTSC_5994P_16_9,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 720,
            "nHeight": 486
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_5994,
            "nTimeScale": ET_ST_SCALE_5994
        },
        "eAspectRatio": ET_AspectRatio_16_9,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_PAL_25P,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 720,
            "nHeight": 576
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_25,
            "nTimeScale": ET_ST_SCALE_25,
            },
            "eAspectRatio": ET_AspectRatio_4_3,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_NTSC_2997P,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 720,
                "nHeight": 486
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Progressive,
                "nTimeRate": ET_ST_FRAME_RATE_2997,
                "nTimeScale": ET_ST_SCALE_2997
            },
            "eAspectRatio": ET_AspectRatio_4_3,
            "eView": 1,
            "eBitCount": 8
        }
    },
    {
        "tpVideoStand": ET_VideoStandard_PAL_25P_16_9,
        "ETVIDEOSTANDARDINFO": {
            "nVersion": 0,
            "tpAspect": {
                "nWidth": 720,
                "nHeight": 576
            },
            "tpFrameRate": {
                "eScanMode": ET_ScanMode_Progressive,
                "nTimeRate": ET_ST_FRAME_RATE_25,
                "nTimeScale": ET_ST_SCALE_25,
        },
        "eAspectRatio": ET_AspectRatio_16_9,
        "eView": 1,
        "eBitCount": 8
    }
},
{
    "tpVideoStand": ET_VideoStandard_NTSC_2997P_16_9,
    "ETVIDEOSTANDARDINFO": {
        "nVersion": 0,
        "tpAspect": {
            "nWidth": 720,
            "nHeight": 486
        },
        "tpFrameRate": {
            "eScanMode": ET_ScanMode_Progressive,
            "nTimeRate": ET_ST_FRAME_RATE_2997,
            "nTimeScale": ET_ST_SCALE_2997
        },
        "eAspectRatio": ET_AspectRatio_16_9,
        "eView": 1,
        "eBitCount": 8
    }
}
]
    var emETVideoStandard = {     "ET_VideoStandard_UNKNOW": "0x00000000",     "ET_VideoStandard_PAL": "0x00000001",     "ET_VideoStandard_NTSC_2997": "0x00000002",     "ET_VideoStandard_NTSC_30": "0x00000004",     "ET_VideoStandard_SECAM": "0x00000008",     "ET_VideoStandard_1920_1080_50i": "0x00000010",     "ET_VideoStandard_1920_1080_5994i": "0x00000020",     "ET_VideoStandard_1920_1080_60i": "0x00000040",     "ET_VideoStandard_1920_1080_2398p": "0x00000080",     "ET_VideoStandard_1920_1080_24p": "0x00000100",     "ET_VideoStandard_1920_1080_25p": "0x00000200",     "ET_VideoStandard_1920_1080_2997p": "0x00000400",     "ET_VideoStandard_1920_1080_30p": "0x00000800",     "ET_VideoStandard_1280_720_2398p": "0x00001000",     "ET_VideoStandard_1280_720_24p": "0x00002000",     "ET_VideoStandard_1280_720_50p": "0x00004000",     "ET_VideoStandard_1280_720_5994p": "0x00008000",     "ET_VideoStandard_1440_1080_50i": "0x00010000",     "ET_VideoStandard_1440_1080_5994i": "0x00020000",     "ET_VideoStandard_1440_1080_60i": "0x00040000",     "ET_VideoStandard_PAL_16_9": "0x00080000",     "ET_VideoStandard_NTSC_2997_16_9": "0x00100000",     "ET_VideoStandard_NTSC_30_16_9": "0x00200000",     "ET_VideoStandard_NTSC_2997_480": "0x00400000",     "ET_VideoStandard_NTSC_30_480": "0x00800000",     "ET_VideoSTANDARD_1280_1080_50i": "0x01000000",     "ET_VideoSTANDARD_PAL_25P": "0x10001000",     "ET_VideoSTANDARD_PAL_25P_16_9": "0x10004000",     "ET_VideoSTANDARD_PAL_50P": "0x10000100",     "ET_VideoSTANDARD_PAL_50P_16_9": "0x10000400",     "ET_VideoSTANDARD_1440_1080_50p": "0x10000010",     "ET_VideoSTANDARD_1440_1080_25p": "0x10000040",     "ET_VideoSTANDARD_1920_1080_50p": "0x10000004",     "ET_VideoSTANDARD_1280_720_25p": "0x10000001",     "ET_VideoStandard_4096_2304_25p": "0x43412a01",     "ET_VideoStandard_4096_3072_25p": "0x43212a41",     "ET_VideoStandard_1920_1080_50p": "0x10000004",     "ET_VideoStandard_1920_1080_5994p": "0x10000008",     "ET_VideoStandard_1440_1080_50p": "0x10000010",     "ET_VideoStandard_1440_1080_5994p": "0x10000020",     "ET_VideoStandard_1440_1080_25p": "0x10000040",     "ET_VideoStandard_1440_1080_2997p": "0x10000080",     "ET_VideoStandard_PAL_50P": "0x10000100",     "ET_VideoStandard_NTSC_5994P": "0x10000200",     "ET_VideoStandard_PAL_50P_16_9": "0x10000400",     "ET_VideoStandard_NTSC_5994P_16_9": "0x10000800",     "ET_VideoStandard_PAL_25P": "0x10001000",     "ET_VideoStandard_NTSC_2997P": "0x10002000",     "ET_VideoStandard_PAL_25P_16_9": "0x10004000",     "ET_VideoStandard_NTSC_2997P_16_9": "0x10008000",     "ET_VideoStandard_1280_1080_50i": "0x41412081",     "ET_VideoStandard_1280_1080_5994i": "0x42412081",     "ET_VideoStandard_1280_1080_60i": "0x4a412081",     "ET_VideoStandard_1280_720_25p": "0x01000000",     "ET_VideoStandard_1280_720_2997p": "0x02000000",     "ET_VideoStandard_1280_720_25pex": "0x10000001",     "ET_VideoStandard_1280_720_2997pex": "0x10000002" };



     function showhello () {
        console.log("start...");
        console.log(ET_VideoStandardIsProgressive(ET_VideoStandard_1920_1080_2398p));
        console.log(ET_VideoStandardIsInterlaced(ET_VideoStandard_1920_1080_2398p));
         console.log(ET_VideoStandardIsInterlaced(123321));
         console.log(ETGetFrameRate(ET_VideoStandard_PAL_50P_16_9));
        console.log("end...");
    };

    function ET_VideoStandardIsProgressive(vStandard){
        //首先获取扫描模式
        var dwScanMode = ETGetScanMode(vStandard);
        //逐行/隔行
        return (ET_ScanMode_Progressive == dwScanMode);
    };

    function ET_VideoStandardIsInterlaced(dwStandard){
        //首先获取扫描模式
        var dwScanMode = ETGetScanMode(dwStandard);
        //逐行/隔行
        return (ET_ScanMode_Interlaced == dwScanMode || ET_ScanMode_Interlaced_BottomFirst == dwScanMode);
    };

    function ETGetFrameRate(dwStandard) //ljj@2011-1-5:得到double的frameRate。
    {
        var stFrameRate = ETGetVideoFrameRate(dwStandard);
        if (null != stFrameRate && stFrameRate.nTimeScale > 0)
        {
            return parseInt( stFrameRate.nTimeRate / stFrameRate.nTimeScale);
        }
        return 0.0;
    }



     function ETGetScanMode (dwStandard){
        var stFrameRate = ETGetVideoFrameRate(dwStandard);
        if (null != stFrameRate)
        {
            return stFrameRate.eScanMode;
        }
        return ET_ScanMode_Invalid;
    };

    function ETVS_FRAMERATE_I(l){
          return  ((l&0x3f000000)>>24);
        }

    //由制式得到帧率
    function ETGetVideoFrameRate(dwStandard)
    {
        var pExsitVS = ETGetExsitVideoStandard(dwStandard);
        var tpFrameRate;
        if( null != pExsitVS)
        {
            return tpFrameRate = pExsitVS.ETVIDEOSTANDARDINFO.tpFrameRate;
            //return pExsitVS.tpVideoStand == ET_VideoStandard_UNKNOW ? ETVS_VESION1_NG : ETVS_OK;
        }

        //var vRet = ETVS_FRAMERATE_NG;
        var iIndex = ETVS_FRAMERATE_I(dwStandard);

        if( iIndex > 0 && iIndex < ET_FRAMERATE_NUM)
        {
            tpFrameRate = G_ET_FRAMERATE_ARRAY[iIndex];
            //vRet = ETVS_OK;
        }
        else
        {
            tpFrameRate = G_ET_FRAMERATE_ARRAY[0];
        }
        return tpFrameRate;
        //return vRet;
    };

    function ETGetExsitVideoStandard(dwStandard){ 
        
        var iExsitVSCount = G_EXST_VIDEOSTANDARD_ARRAY.length;
        
        for (var i = 0; i < iExsitVSCount; i++)
        {
            if (G_EXST_VIDEOSTANDARD_ARRAY[i].tpVideoStand == dwStandard)
            {
                //return (ETExsitVideoStandard*)G_EXST_VIDEOSTANDARD_ARRAY+i;
                return G_EXST_VIDEOSTANDARD_ARRAY[i]
            }
        }
        return null;      
       
    };



