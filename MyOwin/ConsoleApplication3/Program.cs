using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ConsoleApplication3
{
    class Program
    {
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

        static void Main(String[] args) {


         
            



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

        static void Main1(string[] args)
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
}
