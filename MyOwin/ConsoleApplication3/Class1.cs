using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication3
{
    public class JsonHelper
    {
        public static string ToJson(object obj)
        {
            if (obj == null)
            {
                return string.Empty;
            }

            return JsonConvert.SerializeObject(obj);
        }

        public static object ToObject(string json, Type type)
        {
            if (string.IsNullOrEmpty(json))
            {
                return null;
            }

            return JsonConvert.DeserializeObject(json, type);
        }

        public static TObject ToObject<TObject>(string json)
        {
            return (TObject)ToObject(json, typeof(TObject));
        }
    }
}
