using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;
using System.IO;
using System.Xml;

namespace WindowsFormsApplication3
{
    public class SysProcess
    {
        public String ProcessName;
        public String DisplayName;
        public String ExcutePath;
        public bool Selected;
    }

    public class ProcessList
    {
        [XmlElement]
        public List<SysProcess> Process;

        public string ToXml()
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


        public static ProcessList FromXml(string xml)
        {
            XmlSerializer xs = new XmlSerializer(typeof(ProcessList));
            ProcessList root = (ProcessList)xs.Deserialize(new StringReader(xml));
            return root;
        }

        public static ProcessList Open()
        {
            ProcessList processList = ProcessList.FromXml(File.ReadAllText(String.Format(@"{0}\Script\ProcessList.xml", AppDomain.CurrentDomain.BaseDirectory)));
            return processList;

        }

        public  void Save()
        {
            File.WriteAllText(String.Format(@"{0}\Script\ProcessList.xml", AppDomain.CurrentDomain.BaseDirectory), ToXml());
        }
    }
}
