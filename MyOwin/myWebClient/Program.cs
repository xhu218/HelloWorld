using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace myWebClient
{
    class Program
    {
        static void Main(string[] args)
        {
            /*
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
            */
            try
            {
                
                Console.WriteLine("start");


                IPHostEntry ip =  System.Net.Dns.GetHostEntry("internal-hive-alb-1092977074.eu-central-1.elb.amazonaws.com");
                Console.WriteLine(ip.AddressList[0]);


                var client = new RestClient("http://internal-hive-alb-1092977074.eu-central-1.elb.amazonaws.com:88/sobeyhive-bp/v1/user/spaces");
                client.Proxy = null;
                var request = new RestRequest(Method.GET);
               
                request.AddHeader("postman-token", "0e9e0fa9-38dc-ef2a-fc54-6d2c954eabc7");
                request.AddHeader("cache-control", "no-cache");
                request.AddHeader("sobeyhive-http-site", "S1");
                request.AddHeader("content-type", "application/json; charset=utf-8");
                request.AddHeader("sobeyhive-http-token", "c5f9ba38948f6155e05a867ebe1a5ffe");
                request.AddHeader("sobeyhive-http-tool", "WEBCM");
                request.AddHeader("sobeyhive-http-system", "WEBCM");
                IRestResponse response = client.Execute(request);
                Console.WriteLine("status = " + response.Content.ToString());
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
           

           
            Console.ReadLine();
        }
    }
}
