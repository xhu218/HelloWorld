using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Diagnostics;

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

            String s = "abc";
            String s1 = "abc中";
            byte[] b1 = System.Text.Encoding.UTF8.GetBytes(s);
            byte[] b2 = System.Text.Encoding.UTF8.GetBytes(s1);
        }
    }
}
