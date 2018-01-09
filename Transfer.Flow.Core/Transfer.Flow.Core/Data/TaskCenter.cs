using System;
using System.Collections.Generic;
using System.Diagnostics;
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
                TaskInfo taskInfo = new Transfer.Flow.Core.TaskInfo();
                taskInfo.TaskChanged += taskInfo_TaskChanged;
                this.AddTask(taskInfo);
                Trace.Write(String.Format("Add new task {0}", taskInfo.ToString()));

            }
        }

        void taskInfo_TaskChanged(object sender, TaskInfo e)
        {
            Trace.Write(String.Format("Task Guid = {0} task status = {1}", e.TaskGuid, e.TaskStatus));
            if (e.TaskStatus == TaskStatus.Successed || e.TaskStatus == TaskStatus.Failed)
            {
                try
                {
                    this.tasklist.RemoveAll(task => task.TaskGuid == e.TaskGuid);
                }
                catch { }
            }
        }

        public virtual void TaskExecute()
        {
            Task monitor = new Task(() =>
            {

                while (true)
                {
                    try
                    {

                        var excutingCount = this.tasklist.Count(i => i.TaskStatus == TaskStatus.Excuting);
                        var waitCount = this.tasklist.Count(i => i.TaskStatus == TaskStatus.Wait);

                        Trace.WriteLine(String.Format("Excuting task count = {0}, wait task count = {1}, task queue count = {2} max task count ={3}", excutingCount, waitCount, this.tasklist.Count, this.MaxTaskCount));
                        if (excutingCount < MaxTaskCount)
                        {
                            for (var index = excutingCount; index <= MaxTaskCount; index++)
                            {
                                TaskInfo taskInfo = this.tasklist.Find(i => i.TaskStatus == TaskStatus.Wait);
                                if (taskInfo != null)
                                {
                                    taskInfo.TaskStatus = TaskStatus.Excuting;
                                    Task task = new Task(() =>
                                    {
                                      
                                        taskInfo.Start();
                                        Trace.Write(String.Format("start new task {0}", taskInfo.ToString()));

                                    });
                                    task.Start();

                                }
                                else
                                {
                                    TaskInfo t = new Transfer.Flow.Core.TaskInfo();
                                    t.TaskChanged += taskInfo_TaskChanged;

                                    this.AddTask(t);
                                    Trace.Write(String.Format("Add new task {0}", t.ToString()));
                                }
                            }
                        }
                        System.Threading.Thread.Sleep(5000);
                    }
                    catch (Exception ex)
                    {
                        Trace.TraceError(ex.ToString());
                    }

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
            tasklist.RemoveAll(x => x.TaskGuid == task.TaskGuid);
            return true;
        }



    }
}
