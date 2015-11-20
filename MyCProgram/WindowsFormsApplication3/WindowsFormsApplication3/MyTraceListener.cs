using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;
using System.IO;
using System.Threading;
using System.Reflection;

namespace WindowsFormsApplication3
{
    public delegate void PostMessage(string msg);

    public class MyTraceListener : TraceListener
    {
        protected const int KeepDays = 3;
        protected const int MaxLength = 1024 * 1024 * 10;
        private string moduleName;
        protected string Path;
        StreamWriter fs;
        FileInfo info;
        private Queue<String> queue = new Queue<String>();
        private AutoResetEvent auto = new AutoResetEvent(false);


        public event PostMessage MessageArrived;

        public MyTraceListener(string moduleName)
        {
            this.moduleName = moduleName;
            string path = string.Format(@"{0}\nmlog", AppDomain.CurrentDomain.BaseDirectory);
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            this.GetPath(moduleName);


            this.DeleteExpiredLog();
            System.Threading.Thread thread = new System.Threading.Thread(ScanQueue);
            thread.IsBackground = true;
            thread.Priority = ThreadPriority.Lowest;
            thread.Start();
        }

        private void ScanQueue()
        {
            // Monitor.Enter(listener = this);
            while (true)
            {
                String msg = String.Empty;
                lock (queue)
                {
                    if (queue.Count > 0)
                    {
                        msg = queue.Dequeue();

                    }
                }

                if (!String.IsNullOrEmpty(msg))
                {
                    try
                    {
                        if (File.Exists(this.Path))
                        {
                            info = new FileInfo(this.Path);
                            if (info.Length > MaxLength)
                            {
                                this.DeleteExpiredLog();
                                this.GetPath(this.moduleName);
                            }
                        }
                        //File.AppendAllText(this.Path, message, Encoding.Unicode);
                        fs.Write(msg);
                        fs.Flush();
                    }
                    catch (Exception)
                    {
                    }
                    finally
                    {
                        // Monitor.Exit(listener);
                    }
                    //if (this.MessageArrived != null)
                    //{
                    //    this.MessageArrived(msg);
                    //}

                    //System.Threading.Thread.Sleep(5);

                }
                else
                {
                    auto.WaitOne(1000, false);
                }
            }

        }


        private void DeleteExpiredLog()
        {
            string[] files = Directory.GetFiles(string.Format(@"{0}\{1}", AppDomain.CurrentDomain.BaseDirectory, "nmlog"));
            if (files != null)
            {
                foreach (string str in files)
                {
                    try
                    {
                        if (str.CompareTo(this.Path) != 0)
                        {
                            FileInfo info = new FileInfo(str);
                            if (DateTime.Now.Subtract(info.LastWriteTime).TotalDays > KeepDays)
                            {
                                File.Delete(str);
                            }
                        }
                    }
                    catch
                    {
                    }
                }
            }
        }

        private void GetPath(string moduleName)
        {
            this.Path = string.Format(@"{0}\nmlog\{1}_{2}.log", AppDomain.CurrentDomain.BaseDirectory, moduleName, DateTime.Now.ToString("yyyyMMddHHmmss"));
            if (fs != null)
            {
                fs.Flush();
                fs.Close();
            }
            fs = new StreamWriter(this.Path, true, Encoding.Unicode);
            info = new FileInfo(this.Path);
        }

        public override void Write(string message)
        {
        }

        public override void WriteLine(string message)
        {

            MyTraceListener listener;
            MethodBase method = new StackFrame(4).GetMethod();
            if (method == null)
            {
                method = new StackFrame(1).GetMethod();
            }
            string str = string.Format("[{0}::{1}]", method.DeclaringType.Name, method.Name).PadRight(40);
            message = string.Format("{0}\t{1}{2}\t{3}\t{4}", new object[] { DateTime.Now.ToString("yyyyMMdd HH:mm:ss.fff"), str, Thread.CurrentThread.ManagedThreadId, message, Environment.NewLine });
            lock (queue)
                queue.Enqueue(message);
            auto.Set();

        }
    }
}
