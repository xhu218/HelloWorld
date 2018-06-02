using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Windows.Forms;
using System.IO;
using System.Diagnostics;
namespace Bank
{
    class UpgradeHelper
    {
        public static bool update()
        {
            try
            {

                String dir = System.AppDomain.CurrentDomain.BaseDirectory;


                String path = System.Diagnostics.Process.GetCurrentProcess().MainModule.FileName;

                String appName = path.Substring(path.LastIndexOf("\\") + 1);
                appName = appName.Replace(".exe", "");
                appName = appName.Replace(".vshost", "");
                String url = String.Format("http://91sc.top/process/u.php?tool={0}", appName);

                WebClient client = new WebClient();
                client.Encoding = System.Text.Encoding.UTF8;
                String result = client.DownloadString(url);

                File.Delete(String.Format("{0}{1}", dir, appName + "_old.exe"));

                if (!String.IsNullOrEmpty(result))
                {
                    String[] arr = result.Split('_');
                    String LastVer = arr[1];
                    String appurl = arr[2] + "?t=" + DateTime.Now.ToString("yyyyMMddHHmmssfff");

                    Version ApplicationVersion = new Version(Application.ProductVersion);
                    string localVer = ApplicationVersion.ToString();
                    if (LastVer != localVer)
                    {
                        //先下载文件，并且命名为_update.exe
                        client.DownloadFile(appurl, String.Format("{0}{1}", dir, appName + "_update.exe"));

                        //重命名之前的文件为old
                        FileInfo fileInfoOld = new FileInfo(path);
                        fileInfoOld.MoveTo(String.Format("{0}{1}", dir, appName + "_old.exe"));

                        //重命名下下文件为正式文件
                        FileInfo fileInfoNew = new FileInfo(String.Format("{0}{1}", dir, appName + "_update.exe"));
                        fileInfoNew.MoveTo(String.Format("{0}{1}", dir, appName + ".exe"));


                        Application.Exit();

                        Process process = new Process();
                        process.StartInfo = new ProcessStartInfo(path);
                        process.Start();
                        return true;

                    }
                }
                else
                {
                    return false;
                }
            }
   
            catch (System.Net.Sockets.SocketException ex1)
            {
                return false;
            }
            return false;


        }
    }
}
