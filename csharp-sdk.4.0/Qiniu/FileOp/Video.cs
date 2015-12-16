using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Qiniu.FileOp
{
    public class Video
    {
        public string MakeRequest(string url)
        {
            string spec = url + "?avinfo";
           
            return spec;
        }
    }
}
