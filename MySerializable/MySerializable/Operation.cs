using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Serialization;

namespace MySerializable
{
    public class Operation
    {
        public String Name { get; set; }
        public int Age { get; set; }
        public String Note { get; set; }


        public virtual string ToXml()
        {
            try
            {
                XmlSerializer xs = new XmlSerializer(this.GetType());

                StringWriter sw = new StringWriter();
                XmlWriter xmlWriter = XmlWriter.Create(sw, new XmlWriterSettings { Indent = true, OmitXmlDeclaration = true, Encoding = new System.Text.UTF8Encoding(false) });

                XmlSerializerNamespaces xmlns = new XmlSerializerNamespaces();
                xmlns.Add(String.Empty, String.Empty);

                xs.Serialize(xmlWriter, this, xmlns);

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


        public static Operation FromXml(string xml)
        {
            XmlSerializer xs = new XmlSerializer(typeof(Operation));
            Operation root = (Operation)xs.Deserialize(new StringReader(xml));
            return root;
        }
    }


}
