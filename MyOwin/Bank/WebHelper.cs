using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
namespace Bank
{
    class WebHelper
    {
        public static bool GetRight()
        {
            try
            {
                WebClient client = new WebClient();

                String url = String.Format("http://91sc.top/process/p.php?host={0}&time={1}&tool={2}",
                    HttpUtility.UrlEncode(System.Net.Dns.GetHostName()),
                    DateTime.Now.ToString("yyyyMMddHHmmss"),
                    "CAIPIAO");

                String response = client.DownloadString(url);
                if (response.Equals("OK"))
                {
                    return true;
                }
                else
                    return false;
            }
            catch (Exception)
            {
                return true;
            }
          

        }
    }
}
