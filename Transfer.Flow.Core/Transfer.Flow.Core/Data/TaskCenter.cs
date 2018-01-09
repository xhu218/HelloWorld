using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transfer.Flow.Core.Data
{
    public class TaskCenter
    {

        public event EventHandler<TaskInfo> TaskChanged;

        List<TaskInfo> tasklist = new List<TaskInfo>();

        private static object locker = new object();

        private int MaxTaskCount { get; set; }

        public TaskCenter(int taskcount)
        {
            this.MaxTaskCount = taskcount;
            for (var index = 0; index < MaxTaskCount; index++)
            {
                this.AddTask(new Transfer.Flow.Core.TaskInfo());
            }
        }

        public virtual void TaskExecute()
        {
            Task monitor = new Task(() => {            
                         
            while (true)
            {
                var excutingCount = this.tasklist.Count(i=>i.TaskStatus == TaskStatus.Excuting);               
                if(excutingCount <MaxTaskCount)
                {
                    for(var index=excutingCount;index<=MaxTaskCount;index++)
                    {
                        TaskInfo taskInfo =  this.tasklist.Find(i => i.TaskStatus == TaskStatus.Wait);
                        if (taskInfo != null)
                        {
                            Task task = new Task(() => { taskInfo.Start(); });
                            task.Start();
                         
                        }
                    }
                }             
                System.Threading.Thread.Sleep(10);
            
            }
            });

            
            
            monitor.Start();

        }

        public virtual bool AddTask(TaskInfo task)
        {

            tasklist.Add(task);

            return true;
        }

        public virtual bool Remove(TaskInfo task)
        {
            tasklist.RemoveAll(x => x.TaskId == task.TaskId);
            return true;
        }



    }
}
