using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;

namespace TcpClientTest
{
    class Program
    {
        static void Main(string[] args)
        {
            Trace.Listeners.Add(new ConsoleTraceListener());

            //TCPSessionDealer dealer = new TCPSessionDealer("172.16.148.51", 4001);
            TCPSessionDealer dealer = new TCPSessionDealer("172.16.148.51", 10541);

            for (int i = 0; i < 5; i++)
            {
                String msg = @"<mos>   <mosID>SONY.STUDIOA.WDC.CGTN.MOS</mosID>   <ncsID>CGTNWDC1</ncsID>   <messageID>"+i+"</messageID>   <roCreate>     <roID>CGTNWDC1;P_SYSTEM;1D025122-29E3-4F9F-BB9AA5AD5B9EF0DA</roID>     <roSlug>wanglei test</roSlug>     <roEdStart>2017-09-06T16:00:00</roEdStart>     <roEdDur>00:30:00</roEdDur>     <mosExternalMetadata>       <mosScope>PLAYLIST</mosScope>       <mosSchema>http://CGTNWDC1:10505/schema/enpsro.dtd</mosSchema>       <mosPayload><EndTime>2017-09-06T08:30:00</EndTime><MOSRedirection>SONY=SONY.STUDIOA.WDC.CGTN.MOS</MOSRedirection><MOSROStatusTime>1800-01-01T00:00:00</MOSROStatusTime><MOSroStorySend>SONY.STUDIOA.WDC.CGTN.MOS</MOSroStorySend><RundownDuration>30:00</RundownDuration><StartTime>2017-09-06T08:00:00</StartTime><ENPSItemType>2</ENPSItemType><roLayout>RowStatus|Slug|SegStatus|Segment|Presenter|Approved|Estimated|Actual|FrontTime|BackTime|CumeTime|Inset|ModBy|Camera</roLayout></mosPayload>     </mosExternalMetadata>     <story>       <storyID>CGTNWDC1;P_SYST5122-29E3-4F9F-BB9AA5AD5B9EF0DA;D7A30123-0665-4777-A10B6FA020486D00</storyID>       <storySlug>New Row 4 CCTV Administrator</storySlug>       <item>         <itemID>1</itemID>         <itemSlug>New Row 4 CCTV Administrator-1</itemSlug>         <objID>6e77c1434dd049c382b921abe9599d5f</objID>         <mosID>SONY.STUDIOA.WDC.CGTN.MOS</mosID>         <mosAbstract>New Row 4 CCTV Administrator 0:14</mosAbstract>         <objPaths>           <objPath techDescription=\"MXF\"></objPath>           <objProxyPath>oss://sobey_47279ffb98cc4ea4:nPZSIWZvUCYYGx+QrVSn527R00g=@10.108.134.230:7480/u20559/low_clip/New_Row_4_CCTV_Administrator-101/New Row 4 CCTV Administrator_20170905112523_low.mp4?encode=0&amp;product=amazon&amp;type=http&amp;version=2</objProxyPath>         </objPaths>         <itemEdStart>0</itemEdStart>         <itemEdDur>682</itemEdDur>         <mosExternalMetadata>           <mosScope>PLAYLIST</mosScope>           <mosSchema>http://sony.com/schema/sonaps4.5</mosSchema>           <mosPayload><objectType>CLIP</objectType><siteID>0</siteID></mosPayload>         </mosExternalMetadata>         <MosRedirect>false</MosRedirect>       </item>     </story>      </roCreate> </mos>";
                dealer.SendMosMessage(msg);
                System.Threading.Thread.Sleep(500);

            }

            Console.Read();

        }
    }
}
