using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Messaging;
namespace ConsoleApplication3
{

    public class A
    {
        public D brokers;
        public class D
        {
            public Dictionary<String, E> dict;
           
        }
        public class E
        {
            public B listener_security_protocol_map { get; set; }
            public List<string> endpoints { get; set; }
            public int jmx_port { get; set; }
            public string host { get; set; }
            public string timestamp { get; set; }
            public int port { get; set; }
            public int version { get; set; }
        }
        public class B
        {

            public string PLAINTEXT { get; set; }

        }
    }

    public class stu
    {
        public string name { get; set; }
        public List<object> stream { get; set; }
    }
    public class streamMedia
    {
        public String filepath;
    }
    class Program
    {
        static void Main(String[] args)
        {
            string json = "{\"name\":\"wfg\",\"stream\":[ 			{ 				\"fileguid\": \"d11b943830a9294f178a345ed1fd83ef\", 				\"filepath\": \"\\\\\\\\192.168.0.87\\\\infinityfs1\\\\hivefiles\\\\sobeyhive\\\\bucket-p\\\\u-x3oqxhywuw283423\\\\2019\\\\05\\\\30\\\\ed21340bead54d279362a8046520a848_videogroup_079d06b8843e476082fe405860220a31_000.mp4\", 				\"size\": 1689699617 			} 		]}";
            stu  streams = (stu)JsonConvert.DeserializeObject(json, typeof(stu));

            Console.WriteLine(streams.name);
            streamMedia s2 = (streamMedia)JsonConvert.DeserializeObject(streams.stream[0].ToString(), typeof(streamMedia));
            Console.WriteLine(s2.filepath);



            List<streamMedia> s1 = new List<streamMedia>();
            s1.Add(new streamMedia { filepath = "wfg" });

            Console.WriteLine(JsonConvert.SerializeObject(s1));

            //int x = 950;
            //int y = 4 * 1024 * 1024;
            //Console.WriteLine(Convert.ToInt64(x) * Convert.ToInt64(y));
            Console.ReadLine();
            //String url = "http://www.baidu.com////";
            //Console.WriteLine(url.TrimEnd('/'));
            //Console.Read();
        }
        static void Main1437(String[] args)
        {

            String json = File.ReadAllText(@"C:\Users\WangFugui\Desktop\test.json");
           // A a = JsonConvert.DeserializeObject<A>(json);
            Regex reg = new Regex("\"PLAINTEXT://(.*)\"");
            MatchCollection mc = reg.Matches(json);
            StringBuilder sb = new StringBuilder();
            foreach (Match m in mc)
            {
                sb.AppendFormat("http://{0};", m.Groups[1].Value);
                Console.WriteLine(m.Groups[1]);
            }
              String temp = "";
            if (sb.Length > 0)
            {
                temp  = sb.ToString();
                temp = temp.Substring(0, temp.Length - 1);
            }
            Console.WriteLine(temp);
            
          

            Console.ReadLine();

        }



        static void Main1(String[] args)
        {


            
            MessageQueue messageQueue = null;

            string description = "This is a test queue.";

            //string message = null;

            byte[] message = null;

            string path = @".\Private$\mosgw_roresponse";

            try
            {

                if (MessageQueue.Exists(path))
                {

                    messageQueue = new MessageQueue(path);

                    messageQueue.Label = description;

                }

                else
                {

                    MessageQueue.Create(path);

                    messageQueue = new MessageQueue(path);

                    messageQueue.Label = description;

                }

                messageQueue.Send(message);

            }

            catch
            {

                throw;

            }

            finally
            {

                messageQueue.Dispose();

            }

            /*
            String transferPath = "½ § ¤ ´`´Å å ^^ æÆ øØ €we€ åÅ æÆ øØ !\"#&/{([)]=}?+`´`|~~*',;.:-_><\\  ~`!@#$^&*()_+{}|:\"<>?-=[];'\\,./";
            // transferPath = "½ § ¤ ´`´Å å ^^ æÆ øØ €we€ åÅ";  //OK
            //transferPath = "½ § ¤ ´`´Å å ^^ æÆ øØ €we€ åÅ æÆ øØ !"; //ok

            transferPath = File.ReadAllText(@"f:\wfg.txt");
            transferPath = ForbidCharFilter.Purify(transferPath);
            for (int i = 0; i <= transferPath.Length; i++)
            {
                //transferPath = transferPath.Replace("+", "%2b");
                // transferPath = transferPath.Replace(" ", "%20");
                //transferPath = transferPath.Replace(" ", "%20");

                String path = "20223/" + transferPath;

                path = Base64Helper.Base64Encode(path);

                //String out1 = System.Web.HttpUtility.UrlEncode(path,Encoding.UTF8);
                String out1 = path;

                String decode = Base64Helper.Base64Decode(out1);
                Console.WriteLine(String.Format("{0}\t{1}", path, out1));

                var url = "http://hive.sobey.com:9023/CMApi/api/entity/object/transferclipoanonotify?usertoken=3e7ffd7be3d768753f20e9d08d8d458c&sourceguid=a5639694b356444dbf1d4f65812b044d&targetguid=&targetmosid=sony.studioDev.mos&broadnotify=0&mpcnotify=0&relativepath=" + out1 + "&isbase64=true";
                WebClient client = new WebClient();

                String abc = client.DownloadString(url);

            }

            Console.ReadLine();
            /*

             FileInfo fileInfo = new FileInfo(@"\\172.16.134.2\x\wfg\2.txt");

            Console.WriteLine(fileInfo.FullName);

            Console.WriteLine(Path.GetFullPath(@"\\172.16.134.2\x\wfg\2.txt"));

            
            String []dir =  Directory.GetDirectories(@"\\172.16.134.2\x","wfg");
             * 
    RestClient client = new RestClient("http://hive.sobey.com:9023/CMApi/api/entity/object/getobjectinfo?usertoken=323a7ade135775909248d8402759215b&contentid=0fc3b11ec3324e1fbdda2f5e0348cb16&objecttype=32&pathtype=unc");

    RestRequest request = new RestRequest(Method.GET);

          

         

    var response = client.Get(request);

    Console.WriteLine(JsonHelper.ToJson(response));

    
    String str1 = "\\netapp.sobey.com";
    String str2 = "file://storage.sobey.com/u-p4m0iu701r57low5/hv_res/2018-03-14/ingest_test_20180314120533_0_150_2719__002__high.mp4";
    String str3 = @"\\netapp.sobey.com\a\b\1.mxf";

    Console.WriteLine(MatchNameConfigByRegex(str1));
    Console.WriteLine(MatchNameByRegex(str2));
    */


            Console.Read();

        }

        public static string MatchNameByRegex(string source)
        {

            //file://storage.sobey.com/u-p4m0iu701r57low5/hv_res/2018-03-14/ingest_test_20180314120533_0_150_2719__002__high.mp4
            var pattern = @"file://(.*?)/";

            var ipMatch = Regex.Match(source, pattern);

            if (ipMatch != null)
            {
                return ipMatch.Groups[1].Value;
            }

            return null;

        }


        public string MatchNameConfigByRegex1(string source)
        {
            //\\netapp.sobey.com
            var pattern = @"\\\\(.*)?\\";

            var ipMatch = Regex.Match(source, pattern);

            if (ipMatch != null)
            {
                return ipMatch.Groups[1].Value;
            }

            return null;

        }

        public static string MatchNameConfigByRegex(string source)
        {
            //\\netapp.sobey.com
            var pattern = "\\\\(.*?)";

            var ipMatch = Regex.Match(source, pattern);

            if (ipMatch != null)
            {
                return ipMatch.Groups[1].Value;
            }

            return null;

        }


        public String GetRealPath(String path)
        {
            path = @"V:\RAID\hv\ABC123\Archive_1573V2103519232Archive_1573w2103519232søndok_karl_marx_20121218151738_053_346168__002__high.mxf";




            String[] level = path.Split(new char[] { '\\' });





            return "";

        }



        static void Main2(string[] args)
        {

            String time = "2018-04-04T12:12:11";
            //time = "20180404121211";
            DateTime dt = DateTime.MinValue; ;
            //dt = DateTime.ParseExact(propertyValue.ToString(), "yyyyMMddHHmmss", CultureInfo.InvariantCulture);
            try
            {
                dt = DateTime.ParseExact(time, "yyyyMMddHHmmss", CultureInfo.InvariantCulture);
            }
            catch (Exception)
            {
                DateTime.TryParse(time, out dt);
            }
            if (dt == DateTime.MinValue)
            {
                try
                {
                    dt = DateTime.ParseExact(time, "yyyy-MM-ddTHH:mm:ss", CultureInfo.InvariantCulture);
                }
                catch (Exception)
                {
                    DateTime.TryParse(time, out dt);
                }
            }

            Console.WriteLine(dt.ToString());

            /*
            Dictionary<String, int> dict = new Dictionary<string, int>();
            dict["wfg"] = 1;
            using (var sw = new StreamWriter(Path.Combine(Environment.GetEnvironmentVariable("USERPROFILE"), "Desktop\\Migration Tool Statistic.json")))
            {
                var data = new
                {
                    ClipSource = dict,
                    ClipSubType = dict,
                    SignalSourceType = dict,
                };

                var json = JsonConvert.SerializeObject(data);
                sw.Write(json);
            }
             


            Console.WriteLine(Convert100NSToFrame(1208400000,"25.00").ToString());
            Console.WriteLine((((Convert.ToInt64(1208400000)* Convert.ToInt32(50)/ 10000000)  )).ToString());
             * * */

            Console.Read();
        }

        public static long Convert100NSToFrame(double inNS, string FrameRate)
        {
            long nFrameNum = 0;
            if (FrameRate == "25.00")
            {
                nFrameNum = Convert.ToInt64(((inNS / Math.Pow(10, 7)) * (double)25));
            }
            else if (FrameRate == "30.00")
            {
                nFrameNum = Convert.ToInt64(((inNS / Math.Pow(10, 7)) * (double)30));
            }
            else if (FrameRate == "60.00")
            {
                nFrameNum = Convert.ToInt64(((inNS / Math.Pow(10, 7)) * (double)60));
            }
            else if (FrameRate == "50.00")
            {
                nFrameNum = Convert.ToInt64(((inNS / Math.Pow(10, 7)) * (double)50));
            }
            else if (FrameRate == "29.97")
            {
                nFrameNum = Convert.ToInt64(((inNS / Math.Pow(10, 7)) * (double)29.97));
            }
            else if (FrameRate == "23.98")
            {
                nFrameNum = Convert.ToInt64(((inNS / Math.Pow(10, 7)) * (double)23.98));
            }
            else if (FrameRate == "59.94")
            {
                nFrameNum = Convert.ToInt64(((inNS / Math.Pow(10, 7)) * (double)59.94));
            }

            return nFrameNum;
        }

    }


    class ForbidCharFilter
    {
        const string REPLACE_STRING = "_";
        //兼容iNews创建Place Holder（&amp;gt;）
        static readonly string[] ForbidCharList = new string[] { "*", "?", "/", @"\", "&lt:", "<", ">", "|", ":", "\"", "&amp;gt;", ".", "%", "`", "\'" };

        //static readonly string[] ForbidCharList = new string[] { "*", "?", "/", @"\", "&lt:", "<", ">", "|", ":", "\"" };
        static readonly string[] ForbidCharListForPlanning = new string[] { "*", "?", "/", "&lt:", "<", ">", "|", ":", "\"", "." };

        public static string Purify(string originalString)
        {
            if (originalString == null)
            {
                return string.Empty;
            }
            //TODO: 实现替换originalString中包含的forbid char为REPLACE_STRING
            foreach (string str in ForbidCharList)
            {
                originalString = originalString.Replace(str, REPLACE_STRING);
            }
            return originalString;
        }

        public static String PurifyForPlanningGroup(string originalString)
        {
            if (originalString == null)
            {
                return string.Empty;
            }
            foreach (string str in ForbidCharListForPlanning)
            {
                originalString = originalString.Replace(str, REPLACE_STRING);
            }
            return originalString;
        }
    }
}
