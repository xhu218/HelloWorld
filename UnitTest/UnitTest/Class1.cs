using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTest
{
    public class Class1
    {
        public int sum(int x, int y)
        {
            return x + y;
        }
        public int substruct(int x, int y)
        {
            return x - y - 1;
        }

        public String test3()
        {
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

            return "";
        }
    }
}
