using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ConsoleApplication2
{
    class Program
    {
        static void Main(string[] args)
        {
            //Impersonation.Impersonate("Administrator", "", "S2qa2010");
            //Impersonation.Impersonate("Administrator", "", "Pass2word");
            //Process process = new Process();
          
            //process.StartInfo = new ProcessStartInfo(@"C:\sony\CommonModule\bin\_MOS ActiveX CCC Install.bat",null);
            //process.StartInfo = new ProcessStartInfo(@"C:\sony\CommonModule\bin\Sony.S2.MOS.ActiveXInstallerForNRCS.exe", null);
            //process.StartInfo.CreateNoWindow = false;
           // process.Start();

            Console.WriteLine("input key to read");
            Console.ReadLine();

            FileStream fs = new FileStream(@"C:\Users\WangFugui\Desktop\002_20180524052042_1_122_2637__000__high.mp4", FileMode.Open, FileAccess.Read);
            while (true)
            {
                byte[] data = new byte[100];
                fs.Read(data, 0, 100);
                Console.WriteLine("input key to read");
                Console.ReadLine();
            }



            Console.ReadLine();
        }

        public static bool TryConvertLocalPathToUnc(string localPath, string serverPath, out string uncPath)
        {
            var success = false;
            uncPath = String.Empty;

            try
            {
                var pattern = @"(^[a-zA-Z]:(?:\\?))";
                var match = Regex.Match(localPath, pattern);
                var oldValue = match.Groups[1].Value;
                var newValue = String.Format(@"\\{0}\", serverPath.Trim(new[] { '\\' }));

                uncPath = localPath.Replace(oldValue, newValue);
                success = true;
            }
            catch (Exception ex)
            {

            }

            return success;
        }
    }
}
