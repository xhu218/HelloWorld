using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml.Serialization;

namespace FileAnlysis
{
    public partial class Form1 : Form
    {

        [DllImport("ETMediaProcessV3U.dll", CharSet = CharSet.Unicode, EntryPoint = "ETGetFileLength")]
        public static extern long ETGetFileLength(string lpszFileName);

        [DllImport("ETMediaProcessV3U.dll", CharSet = CharSet.Unicode, EntryPoint = "ETGetMediaFileInfoV3")]
        public static extern bool ETGetMediaFileInfo(string lpszFileName, ref stu_ETFileInfo lpFileInfo);


        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            try
            {
                this.textBox2.Text = (ETGetFileLength(this.textBox1.Text).ToString());
            }
            catch (Exception ex)
            {

                MessageBox.Show(ex.ToString());
            }
           
        }



        private void button2_Click(object sender, EventArgs e)
        {
            stu_ETFileInfo stu = new stu_ETFileInfo();
            bool result =  ETGetMediaFileInfo(this.textBox1.Text,ref stu);
            if (result == true)
            {
                this.textBox2.Text = (stu.ToString());
            }
            else
            {
                this.textBox2.Text = "the result is false";
            }
        }
    }

    [StructLayout(LayoutKind.Sequential)]
    public struct GUID
    {
        public int a;
        public ushort b;
        public ushort c;
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 8)]
        public byte[] d;
    }

    [StructLayout(LayoutKind.Sequential)]
    public struct stu_ETFileInfo
    {
        public GUID filetypeguid;


        public Int32 fileformatid;			//  SDK定义ID  [6/3/2015 zhouhu]
        public Int32 filestate;			// 文件状态，参见TT_FILE_STATE_* [6/3/2015 zhouhu]
        public Int32 mediainfo;				// <媒体文件信息VFR VBR....标志位 参见TT_MEDIA_INFO_*> [6/3/2015 zhouhu]
        public Int32 mediatype;			//媒体类型
        public Int32 submediatype;		//子媒体类型
        public UInt64 length;			//文件长度（单位：帧）
        public UInt64 duration;			// 文件长度百纳秒 [6/3/2015 zhouhu]
        public UInt64 sample;	//采样总数
        public Int32 hasvideo;		//是否有视频
        public Int32 hasaudio;		//是否有音频
        public UInt64 filesize;		//文件大小
        public stu_ETFileVideoFormat filevideoformat;//视频格式
        public stu_ETFileAudioFormat fileaudioformat;//音频格式
        public Int32 needcreateindex;	//是否需要创建索引

        [System.Runtime.InteropServices.MarshalAsAttribute(System.Runtime.InteropServices.UnmanagedType.ByValTStr, SizeConst = 260)]
        public string filepath;				// 文件路径 [6/3/2015 zhouhu]

        public override string ToString()
        {
            XmlSerializer serializer = new XmlSerializer(this.GetType());
            //执行序列化并将序列化结果输出到控制台
            StringWriter  writer = new StringWriter();
            serializer.Serialize(writer,this);
            return writer.ToString();
        }


    }

    [StructLayout(LayoutKind.Sequential)]
    public struct stu_ETFileVideoFormat
    {
        public UInt32 fourcc;			//媒体类型
        public Int32 mediatypeid; 			// SDK 媒体文件ID [6/3/2015 zhouhu]
        public double framerate;			//帧率 15,24,25,29.97,30
        public Int32 imagewidth;		//素材画面宽
        public Int32 imageheight;			//素材画面高
        public Int32 afd;						// AFD信息 [6/3/2015 zhouhu]

        public ETPixelFormat pxelformat;				//像素格式
        public Int32 bitsperpixel;		//每像素位数
        public Int32 bitsrate;				// 码率 [6/3/2015 zhouhu]
        public Int32 still;				//是否为图片
        public Int32 compression;			//图像压缩方式
        public eET_ASPECTRATIO aspectratio;			// DAR显示比例 [6/3/2015 zhouhu]
        public ET_SCANMODE scanmode;	        //图像扫描模式
        public Int32 gopsize;				//GOP长度
        public Int32 fromecount;				// I帧个数 [6/3/2015 zhouhu]
        public UInt64 duration;				// 长度百纳秒 [6/3/2015 zhouhu]
        public Int32 bframecount;			//B帧个数
        public Int32 pframecount;			//P帧个数
        public Int32 vediostandard;			//制式[6/3/2015 zhouhu]
        public Int32 ntsctcmode;			//时码计算方式：0 按素材原始格式 1 用非丢帧模式
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 8)]
        public UInt64[] reserved;



    }

    [StructLayout(LayoutKind.Sequential)]
    public struct stu_ETFileAudioFormat
    {
        public UInt32 fourcc;			//媒体类型
        public Int32 meidaitypeid;			// SDK 媒体文件ID [6/3/2015 zhouhu]
        public Int32 channels;			//音频通道数
        public Int32 samplesrate;			//音频采样率
        public Int32 bitspersample;		//量化位数
        public Int64 duration;			//长度，百纳秒  
        public Int32 dbestreamchannel;		//DBE轨道
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 8)]
        public UInt64[] reserved;
    }

    public enum ETPixelFormat
    {
        ET_PIX_FMT_UNKNOWN = 0x00000000,

        ET_PIX_FMT_ARGB32 = 0x00000001,///< Packed pixel, 4 bytes per pixel, ARGBARGB...
        ET_PIX_FMT_RGBA32 = 0x00000002,///< Packed pixel, 4 bytes per pixel, BGRABGRA...
        ET_PIX_FMT_RGB24 = 0x00000004,///< Packed pixel, 3 bytes per pixel, RGBRGB...
        ET_PIX_FMT_BGR24 = 0x00000008,///< Packed pixel, 3 bytes per pixel, BGRBGR...
        ET_PIX_FMT_GRAY8 = 0x00000010,
        ET_PIX_FMT_RGB565 = 0x00000020,///< always stored in cpu endianness   16 bpp
        ET_PIX_FMT_RGB555 = 0x00000040,///< always stored in cpu endianness, most significant bit to 1  16 bpp

        ET_PIX_FMT_YUYV = 0x00000100,
        ET_PIX_FMT_YUAYVA = 0x00000200,
        ET_PIX_FMT_UYVY = 0x00000400,
        ET_PIX_FMT_UYAVYA = 0x00000800,
        ET_PIX_FMT_YUV422P = 0x00001000,///< Planar YUV 4:2:2 (1 Cr & Cb sample per 2x1 Y samples)
        ET_PIX_FMT_YUV444P = 0x00002000,///< Planar YUV 4:4:4 (1 Cr & Cb sample per 1x1 Y samples)
        ET_PIX_FMT_YUV410P = 0x00004000,///< Planar YUV 4:1:0 (1 Cr & Cb sample per 4x4 Y samples)
        ET_PIX_FMT_YUV411P = 0x00008000,///< Planar YUV 4:1:1 (1 Cr & Cb sample per 4x1 Y samples)
        ET_PIX_FMT_YUV420P = 0x00010000,///< Planar YUV 4:2:0 (1 Cr & Cb sample per 2x2 Y samples)
        ET_PIX_FMT_YUVA = 0x00020000,


        ET_PIX_FMT_SPLIT_ALPHA = 0x00040000, ///是否具有独立的alpha buffer
        ET_PIX_FMT_RGBA32X = 0x00080000 ///< Packed pixel, 4 bytes per pixel, RGBARGBA...
    };

    public enum eET_ASPECTRATIO //对应类型ET_ASPECTRATIO
    {
        ET_AspectRatio_Unknown = 0,
        ET_AspectRatio_4_3 = 1,	//4:3
        ET_AspectRatio_16_9 = 2,	//16:9
        ET_AspectRatio_1_1 = 3,	//1:1
        ET_AspectRatio_MAX,
    };
    public enum ET_SCANMODE //对应类型ETPSCANMODE
    {
        ET_ScanMode_Invalid = 0,
        ET_ScanMode_Interlaced = 1,				//隔行扫描,同时意为顶场优先
        ET_ScanMode_Progressive = 2,				//逐行扫描

        //[[ljj@2011-9-15:新增定义：隔行，底场优先。ET_ScanMode_Interlaced意为隔行，顶场优先。
        ET_ScanMode_Interlaced_BottomFirst = 3,
        //]]
        ET_ScanMode_Max,
    };

}
