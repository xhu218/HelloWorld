using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace ClassLibrary1
{
    public class Values2Controller : ApiController
    {
        [HttpGet]
        [Route("Values2/Hello")]
        public String Hello()
        {
            return "hello...222";
        }


     
    }
}
