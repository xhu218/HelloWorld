using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using System.IO;


namespace XmlParer
{
    class Program
    {
        static void Main(string[] args)
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(@"C:\Users\WangFugui\Desktop\mem.xml");

            File.WriteAllText(@"C:\Users\WangFugui\Desktop\mem1.xml", doc.OuterXml);

        }
    }
}
