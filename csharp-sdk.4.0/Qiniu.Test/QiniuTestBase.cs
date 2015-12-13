using System;
using Qiniu.Conf;
using System.Collections;

namespace Qiniu.Test
{
	public class QiniuTestBase
	{

		protected static string Bucket = "";
		protected static  string LocalKey = "gogopher.jpg";
		protected static string DOMAIN = "qiniuphotos.qiniudn.com";
		protected static string BigFile = @"";
		protected static string FileOpUrl = "http://qiniuphotos.qiniudn.com/gogopher.jpg";
		protected static string NewKey
		{
			get { return Guid.NewGuid().ToString(); }
		}
		private static bool init = false;
		private void Init()
		{
			if (init)
				return;
				
			//for make test

            Config.ACCESS_KEY = "5zICAtLUtlGbbMfDB2ucQ9OxyO3zwQTG6I5do11P";// System.Environment.GetEnvironmentVariable("QINIU_ACCESS_KEY");  
            Config.SECRET_KEY = "c2mM0jRfxm9hYDdsbeFqBR4akbMqG8n6TpIl4mE7";// System.Environment.GetEnvironmentVariable("QINIU_SECRET_KEY");  
            Bucket = "xhu218";// System.Environment.GetEnvironmentVariable("QINIU_TEST_BUCKET");   
            DOMAIN = "http://7xko1a.media1.z0.glb.clouddn.com";// System.Environment.GetEnvironmentVariable("QINIU_TEST_DOMAIN"); 

			init = true;
		}

		public QiniuTestBase()
		{
			Init();
		}
		protected void PrintLn(string str)
		{
			Console.WriteLine(str);
		}
	}
}

