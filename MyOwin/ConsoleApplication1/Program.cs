using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {


            HttpListener httpListener = new HttpListener();

            httpListener.AuthenticationSchemes = AuthenticationSchemes.Anonymous;
            httpListener.Prefixes.Add("http://172.16.148.14:9023/");
            httpListener.Start();
            new Thread(new ThreadStart(delegate
            {
                while (true)
                {
                    try
                    {


                        HttpListenerContext httpListenerContext = httpListener.GetContext();
                        httpListenerContext.Response.StatusCode = 200;
                        using (StreamWriter writer = new StreamWriter(httpListenerContext.Response.OutputStream))
                        {
                            String path = String.Format("C:\\Users\\WangFugui\\Desktop\\{0}.jpg", DateTime.Now.ToString("yyyy-MM-dd HH mm ss"));


                            BufferedStream br = new BufferedStream(httpListenerContext.Request.InputStream);
                            MemoryStream ms = new MemoryStream();
                            FileStream writer1 = new FileStream(path, FileMode.CreateNew, FileAccess.Write);
                            var length = 0;
                            byte[] data = new byte[65536];
                            while ((length = br.Read(data, 0, 65536)) > 0)
                            {
                                ms.Write(data, 0, length);
                            }

                            writer1.Write(ms.ToArray(), 0, (int)ms.Length);
                            //Console.WriteLine(httpListenerContext.Request.InputStream.Length);
                            //writer1.Write(httpListenerContext.Request.InputStream.Length);
                            writer1.Flush();
                            writer1.Close();


                            writer.WriteLine("<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/><title>测试服务器</title></head><body>");
                            writer.WriteLine("<div style=\"height:20px;color:blue;text-align:center;\"><p> hello</p></div>");
                            writer.WriteLine("<ul>");
                            writer.WriteLine("</ul>");
                            writer.WriteLine("</body></html>");

                        }

                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.ToString());
                    }

                }

            })).Start();

            //if(File.Exists(@"\\172.16.134.2\X\ABC\BCD\WFG.TXT"))
            /*
             if (File.Exists(@"J:\ABC\BCD\WFG1.TXT"))
             {
                 Console.WriteLine("存在J");
             }
             else
             {
                 Console.WriteLine("不存在J");

             }
             /*
             for (int i = 0; i < 10; i++)
             {
                 fun1(i);
             }
              */

            /*
  var url = "OperationType=RegisterEvent&&Params=%7B%22Guid%22%3A%2255a9fb209a530cefa0ce5c9533171817%22%2C%22Title%22%3A%22New%20Clip%22%2C%22FolderID%22%3A%22%22%2C%22EdlParTypeColection%22%3A%5B%7B%22Urn%22%3A%22smpte%22%2C%22Guid%22%3A%2217ceac3c3775400fb4455f6496f98261%22%2C%22FrameRate%22%3A%22smpte-25%22%2C%22ClipBegin%22%3A%2200%3A00%3A00%3A00%22%2C%22ClipEnd%22%3A%2200%3A00%3A32%3A05%22%2C%22EdlBegin%22%3A%2200%3A00%3A00%3A00%22%7D%5D%7D&&EventID=283e5eda-e45d-4b90-9a14-00c45c24c8b3&&EventPath=%5C%5CPublic%20Material%5COA%20Material%5CStudioA%5C2018%5C01%5C23%5C111";
  Console.WriteLine(System.Web.HttpUtility.UrlDecode(url));

  
  DateTime dt = new DateTime(2018, 1, 22, 11, 36, 07);
  Console.WriteLine(dt.ToLocalTime());
 /*
  WebClient client = new WebClient();
  var str =  client.DownloadString("https://web.hotline.io/app/conversation/message?rand=1514469224961&convid=9190958&excludeCampaign=true");

  Console.Write(str);
  */
            Console.Read();

        }

        private static void fun1(int x)
        {
            Console.WriteLine("start");
            System.Threading.Thread.Sleep(1000 * 60 * 10);
        }
    }
}
