using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            WebClient client = new WebClient();
            var str =  client.DownloadString("https://web.hotline.io/app/conversation/message?rand=1514469224961&convid=9190958&excludeCampaign=true");

            Console.Write(str);
            Console.Read();
             
        }
    }
}
