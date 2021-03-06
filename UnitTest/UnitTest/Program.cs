﻿using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace UnitTest
{
    static class Program
    {
        /// <summary>
        /// 应用程序的主入口点。
        /// </summary>
        [STAThread]
        static void Main()
        {
            //Application.EnableVisualStyles();
            //Application.SetCompatibleTextRenderingDefault(false);
            //Application.Run(new Form1());
            Console.Write("hello");
            Class1 cls = new Class1();
            Console.Write(cls.sum(1, 2));


            var client = new RestClient("http://hive.sobey.com:9023/CMApi/api/basic/account/login");
            var request = new RestRequest(Method.POST);
            request.AddHeader("postman-token", "07af69b3-9ac1-bc08-5ef1-3946b6161dba");
            request.AddHeader("cache-control", "no-cache");
            request.AddHeader("sobeyhive-http-tool", "MLWEB");
            request.AddHeader("sobeyhive-http-site", "S1");
            request.AddHeader("sobeyhive-http-system", "MBH");
            request.AddHeader("content-type", "application/json");
            request.AddParameter("application/json", "{LOGINNAME:\"admin\",LOGINPWD:\"21232f297a57a5a743894a0e4a801fc3\",LOGINSUBSYSTEM:\"sys1\",LOGINIP:\"127.0.0.1\"}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);

            Console.Read();
        }
    }
}
