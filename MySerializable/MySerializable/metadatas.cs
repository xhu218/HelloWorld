using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MySerializable
{
    public class metadatas
    {

        public List<metadata> metadata { get; set; }

    }
    public class metadata
    {
        public string type { get; set; }
        public string name { get; set; }

        public List<object> meta { get; set; }


    }

    //public class markpoint
    //{

    //}

    //public class techcensor
    //{

    //}

}
