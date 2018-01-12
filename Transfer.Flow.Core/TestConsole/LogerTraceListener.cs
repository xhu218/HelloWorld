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

        private const long m_maxfileszie = 1024 * 1024 * 1024;
        //private const long m_maxfileszie = 1024;
        private StreamWriter streamWriter;

        private static object locker = new object();

        public LogerTraceListener()
        {
            logsQueue = new Queue<string>();
            GeneratFileName();
        }

        private void GeneratFileName()
        {
            string basePath = AppDomain.CurrentDomain.BaseDirectory + "\\Logs\\";
            if (!Directory.Exists(basePath))
                Directory.CreateDirectory(basePath);
            this.m_fileName = basePath +
                string.Format("Log-{0}.txt", DateTime.Now.ToString("yyyyMMddHHmmss"));
            if (streamWriter != null)
            {
                this.streamWriter.Flush();
                this.streamWriter.Close();
            }
            this.streamWriter = new StreamWriter(this.m_fileName, true, Encoding.UTF8);

            Task task = new Task(() =>
            {
                while (true)
                {
                    CheckFileSize();
                    List<String> logs = new List<string>();
                    //File.AppendAllText(m_fileName, message);
                    lock (locker)
                    {
                        while (logsQueue.Count > 0)
                        {
                            logs.Add(logsQueue.Dequeue());
                        }
                    }
                    foreach (var log in logs)
                    {
                        streamWriter.Write(log);
                       
                       
                    }
                    streamWriter.Flush();




                    System.Threading.Thread.Sleep(1000);
                }
            });
            task.Start();
        }

        public override void Write(string message)
        {
            WriteMessage(message);
        }

        public override void WriteLine(string message)
        {
            WriteMessage(message);
        }

        private Queue<String> logsQueue = new Queue<string>();

        private void WriteMessage(string message)
        {
            message = Format(message);

            lock (locker)
                logsQueue.Enqueue(message);

        }


        private void CheckFileSize()
        {

            FileInfo fileInfo = new FileInfo(this.m_fileName);
            if (fileInfo.Length > m_maxfileszie)
            {
                GeneratFileName();
            }

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
                sf[6].GetMethod().Name,
                category);


            return builder.ToString();
        }
    }
}
