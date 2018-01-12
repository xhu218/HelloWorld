using Sobey.Sonaps.SearchService;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;

namespace Transfer.Flow.Core
{
    class util
    {
        public static string ToXml(object obj)
        {
            try
            {
                XmlSerializer xs = new XmlSerializer(obj.GetType());

                StringWriter sw = new StringWriter();
                XmlWriter xmlWriter = XmlWriter.Create(sw, new XmlWriterSettings { Indent = true, OmitXmlDeclaration = true, Encoding = new System.Text.UTF8Encoding(false) });

                XmlSerializerNamespaces xmlns = new XmlSerializerNamespaces();
                xmlns.Add(String.Empty, String.Empty);

                xs.Serialize(xmlWriter, obj, xmlns);

                xmlWriter.Close();
                sw.Close();

                string xml = sw.ToString();
                return xml;
            }
            catch (Exception ex)
            {
                return ex.ToString();

            }

        }

        public static DCMContentDefine FromXml(String file)
        {
            String xml = File.ReadAllText(String.Format(@"{0}\data\{1}.xml", AppDomain.CurrentDomain.BaseDirectory, "636513771333560365"));
            XmlSerializer xs = new XmlSerializer(typeof(DCMContentDefine));
            DCMContentDefine root = (DCMContentDefine)xs.Deserialize(new StringReader(xml));
            return root;

        }

    }
}
