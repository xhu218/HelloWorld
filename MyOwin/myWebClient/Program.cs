using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace myWebClient
{
    class Program
    {
        static void Main(string[] args)
        {
            var client = new RestClient("https://pf.hive.sobey.com:9123/CMApi/api/basic/account/login");
            var request = new RestRequest(Method.POST);
            request.AddHeader("postman-token", "eedac3b1-eb78-602a-9e37-470afa463600");
            request.AddHeader("cache-control", "no-cache");
            request.AddHeader("sobeyhive-http-tool", "MLWEB");
            request.AddHeader("sobeyhive-http-site", "S1");
            request.AddHeader("sobeyhive-http-system", "MBH");
            request.AddHeader("content-type", "application/json");
            request.AddParameter("application/json", "{LOGINNAME:\"admin\",LOGINPWD:\"21232f297a57a5a743894a0e4a801fc3\",LOGINSUBSYSTEM:\"sys1\",LOGINIP:\"127.0.0.1\"}", ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            Console.Write(response.Content);

            Console.ReadLine();
        }
    }
}
