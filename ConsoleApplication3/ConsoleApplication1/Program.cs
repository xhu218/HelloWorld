using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Diagnostics;
using System.Net;
using System.Security.Cryptography;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
         

            //刚才分析了，可以没有中间文件目录，下拉创建子目录
            /*
            string mydir = String.Format("/ext_file_root/bucket-z/Sobey/Clip/{0}",Guid.NewGuid().ToString("n"));
            DirectoryInfo dir = new DirectoryInfo(mydir);
            //dir.Create(security);
            dir.Create();

            //string filename = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "mosgatewayd");
            ProcessStartInfo pi = new ProcessStartInfo("chmod");
            pi.Arguments = String.Format("777 {0}",mydir);
            System.Diagnostics.Process.Start(pi);
             * */

            //String s = "5.00";
           // int x = int.Parse(s);

           
            //double y = 1 / 3;
            //Console.WriteLine(double.MaxValue);
            //Console.WriteLine(double.MinValue);

            //float d = 1 / 3;
            //Console.WriteLine(float.MaxValue);
            //Console.WriteLine(float.MinValue);

            //String z = "0.3333333333333333";
            //float t = float.Parse(z);
            //double t1 = Double.Parse(z);

            //long x;
            //long.TryParse("1.17773443",out x);


           // HMACSHA1 sha1 = HMACSHA1.Create() as HMACSHA1;
           // Encoding encode = System.Text.Encoding.UTF8;
           // sha1.Key = encode.GetBytes("sobey_storage_key");//这样用secretkey不对

           // byte[] encodedPutPolicy = sha1.ComputeHash(encode.GetBytes("abc"));
           //string sign ="";//= BitConverter.ToString(encodedPutPolicy).Replace("-", "").ToLower();
           //sign = Convert.ToBase64String(encodedPutPolicy);
           // Console.WriteLine(sign);

            var hmacSHA1 = HMACSHA1.Create();
            hmacSHA1.Key = Encoding.UTF8.GetBytes("sobey_storage_key");
            var computHash = hmacSHA1.ComputeHash(Encoding.UTF8.GetBytes("abc"));
            var base64 = Convert.ToBase64String(computHash);
            Console.WriteLine(base64);

            

            Console.ReadKey();
        }
    }
}
