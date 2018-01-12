using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Transfer.Flow.Core.Data;

namespace TestConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            System.Diagnostics.Trace.Listeners.Clear();
            System.Diagnostics.Trace.Listeners.Add(
             new LogerTraceListener());

           System.Diagnostics.Trace.Listeners.Add(new System.Diagnostics.TextWriterTraceListener(Console.Out));


           
            TaskCenter taskCenter = new TaskCenter(10);
            taskCenter.TaskChanged += taskCenter_TaskChanged;
            //taskCenter.AddTask(new Transfer.Flow.Core.TaskInfo { TaskProtocol = "111" });
          
            taskCenter.TaskExecute();
           


            

            System.Console.ReadLine();
        }

        static void taskCenter_TaskChanged(object sender, Transfer.Flow.Core.TaskInfo e)
        {
            throw new NotImplementedException();
        }
    }
}
