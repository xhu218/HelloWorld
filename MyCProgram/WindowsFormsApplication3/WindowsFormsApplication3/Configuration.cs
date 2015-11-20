using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Serialization;
using System.IO;

namespace WindowsFormsApplication3
{
    public class Configuration
    {
        public Configuration()
        {

        }

        public List<KeyValue> KeyValuePairs = new List<KeyValue>();

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

        public static Configuration FromXml(string xml)
        {
            XmlSerializer xs = new XmlSerializer(typeof(Configuration));
            Configuration root = (Configuration)xs.Deserialize(new StringReader(xml));
            return root;
        }

        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("[KeyValue]");
            foreach (var keyValue in KeyValuePairs)
            {
              
                sb.AppendLine(String.Format("{0}={1}", keyValue.Key,keyValue.Value));
               
            }
            return sb.ToString();
        }

        internal void Save()
        {
            File.WriteAllText(String.Format(@"{0}\Script\Configuration.xml", AppDomain.CurrentDomain.BaseDirectory), ToXml());
            File.WriteAllText(String.Format(@"{0}\Script\Configuration.ini", AppDomain.CurrentDomain.BaseDirectory), ToString());
        }

        internal static Configuration Open()
        {
            Configuration config = null;
            try
            {
                config = Configuration.FromXml(File.ReadAllText(String.Format(@"{0}\Script\Configuration.xml", AppDomain.CurrentDomain.BaseDirectory)));
            }
            catch (System.Exception ex)
            {
                String sample = "<Configuration> <KeyValuePairs> <KeyValue> <Key>SONAPS DB SID</Key> <Value>SONAPSDB</Value> </KeyValue> <KeyValue> <Key>SONAPS DB User Name</Key> <Value>TeleDB</Value> </KeyValue> <KeyValue> <Key>SONAPS DB Password</Key> <Value>TeleDB</Value> </KeyValue> <KeyValue> <Key>Archive DB SID</Key> <Value>SONAPSDB</Value> </KeyValue> <KeyValue> <Key>Archive DB User Name</Key> <Value>TeleDB</Value> </KeyValue> <KeyValue> <Key>Archive DB Password</Key> <Value>TeleDB</Value> </KeyValue> <KeyValue> <Key>Windows User Name</Key> <Value>Administrator</Value> </KeyValue> <KeyValue> <Key>Windows Password</Key> <Value>S2test123</Value> </KeyValue> <KeyValue> <Key>Ingest Management Server</Key> <Value>1.1.1.1</Value> </KeyValue> <KeyValue> <Key>MOS Gateway Server</Key> <Value>1.1.1.1</Value> </KeyValue> <KeyValue> <Key>MPC Task Console</Key> <Value>1.1.1.1</Value> </KeyValue> <KeyValue> <Key>MPC Task Console-Backup</Key> <Value>1.1.1.1</Value> </KeyValue> <KeyValue> <Key>Background Server</Key> <Value>1.1.1.1</Value> </KeyValue> <KeyValue> <Key>Background Server-Backup</Key> <Value>1.1.1.1</Value> </KeyValue> <KeyValue> <Key>Material List Server</Key> <Value>1.1.1.1</Value> </KeyValue> <KeyValue> <Key>Playout Background Server</Key> <Value>1.1.1.1</Value> </KeyValue> <KeyValue> <Key>Archive Management Server</Key> <Value>1.1.1.1</Value> </KeyValue> <KeyValue> <Key>Ingest Device</Key> <Value>1.1.1.1;1.1.1.2</Value> </KeyValue> <KeyValue> <Key>MPC Transform</Key> <Value>1.1.1.1;1.1.1.2</Value> </KeyValue> <KeyValue> <Key>MPC EDL-Executor</Key> <Value>1.1.1.1;1.1.1.2</Value> </KeyValue> </KeyValuePairs> </Configuration>";
                config = Configuration.FromXml(sample);
            }
            return config;

        }
    }

    public class KeyValue
    {
        public String Key { get; set; }
        public String Value { get; set; }
    }


    public class Drives
    {
        public List<Drive> list { get; set; }
        public Drives()
        {
            list = new List<Drive>();
        }

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

        public static Drives FromXml(string xml)
        {
            XmlSerializer xs = new XmlSerializer(typeof(Drives));
            Drives root = (Drives)xs.Deserialize(new StringReader(xml));
            return root;
        }

        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine("[Drives]");
            foreach (var keyValue in list)
            {

                sb.AppendLine(String.Format("{0}={1}", keyValue.DriveName, keyValue.Selected));
            }
            return sb.ToString();
        }

        internal static Drives Open()
        {
            return FromXml(File.ReadAllText(String.Format(@"{0}\Script\Drives.xml", AppDomain.CurrentDomain.BaseDirectory)));
        }

        internal void Save()
        {
            File.WriteAllText(String.Format(@"{0}\Script\Drives.xml", AppDomain.CurrentDomain.BaseDirectory), ToXml());
            File.WriteAllText(String.Format(@"{0}\Script\Drives.ini", AppDomain.CurrentDomain.BaseDirectory), ToString());
        }
    }

    public class Drive
    {
        public String DriveName { get; set; }
        public bool Selected { get; set; }
    }
}
