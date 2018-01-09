using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestConsole
{
    class LogerTraceListener : TraceListener
    {
        private string m_fileName;
        public LogerTraceListener()
        {
            string basePath = AppDomain.CurrentDomain.BaseDirectory + "\\Logs\\";
            if (!Directory.Exists(basePath))
                Directory.CreateDirectory(basePath);
            this.m_fileName = basePath +
                string.Format("Log-{0}.txt", DateTime.Now.ToString("yyyyMMdd"));
        }
        public override void Write(string message)
        {
            message = Format(message);
            File.AppendAllText(m_fileName, message);
            Console.Write(message);
        }

        public override void WriteLine(string message)
        {
            message = Format(message);
            File.AppendAllText(m_fileName, message);
            Console.Write(message);
        }

        private string Format(string category)
        {
            string info = null;
           
            StackTrace st = new StackTrace(true);
          
            StackFrame[] sf = st.GetFrames();
            for (int i = 0; i < sf.Length; ++i)
            {
                info = info + "\r\n" + " FileName=" + sf[i].GetFileName() + " fullname=" + sf[i].GetMethod().DeclaringType.FullName + " function=" + sf[i].GetMethod().Name + " FileLineNumber=" + sf[i].GetFileLineNumber();
            } 




            StringBuilder builder = new StringBuilder();
            builder.AppendFormat("{0}\t{1}\t{2}\t{3}\r\n", 
                DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"), 
                System.Threading.Thread.CurrentThread.ManagedThreadId,
                sf[4].GetMethod().Name,
                category);


            return builder.ToString();
        }
    }
}
