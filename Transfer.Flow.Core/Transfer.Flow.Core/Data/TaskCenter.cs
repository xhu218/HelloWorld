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

        //通过此开关控制是否运行
        private bool Running { get; set; }



        public TaskCenter(int taskcount)
        {
            Running = true;
            this.MaxTaskCount = taskcount;
            for (var index = 0; index < MaxTaskCount; index++)
            {
                TaskInfo taskInfo = GetTaskFromDB();
                this.AddTask(taskInfo);
                Trace.TraceInformation(String.Format("Add new task {0}", taskInfo.ToString()));

            }
        }

        void taskInfo_TaskChanged(object sender, TaskInfo e)
        {
            Trace.TraceInformation(e.ToString());
            if (e.TaskStatus == TaskStatus.Successed || e.TaskStatus == TaskStatus.Failed)
            {
                try
                {                  
                    this.Remove(e);
                }
                catch (Exception ex)
                {
                    Trace.TraceError(ex.ToString());
                }
            }
        }

        public virtual void TaskExecute()
        {
            Task monitor = new Task(() =>
            {
                while (true)
                {
                    if (Running)
                    {
                        try
                        {
                            var excutingCount = this.tasklist.Count(i => i.TaskStatus == TaskStatus.Excuting);
                            var waitCount = this.tasklist.Count(i => i.TaskStatus == TaskStatus.Wait);

                            Trace.TraceInformation(String.Format("Excuting task count = {0}, wait task count = {1}, task queue count = {2} max task count ={3}", excutingCount, waitCount, this.tasklist.Count, this.MaxTaskCount));
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

                                        });
                                        task.Start();

                                    }
                                    else
                                    {

                                        TaskInfo t = GetTaskFromDB();
                                        this.AddTask(t);
                                        Trace.TraceInformation(String.Format("Add new task {0}", t.ToString()));
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
                }
            });



            monitor.Start();

        }

        private TaskInfo GetTaskFromDB()
        {
            //从SQLLITE当中获取到素材的的ENTITYID,CLIPGUI,FOLDERPATH,CLIP NAME

            //TODO: MYQ
            TaskInfo taskInfo = new TaskInfo();
            taskInfo.EntityId = (ulong)DateTime.Now.Ticks;
            taskInfo.ClipGuid = Guid.NewGuid().ToString("n").ToUpper();
            taskInfo.ClipName = "wfg test clip" + DateTime.Now.Ticks;

            taskInfo.TaskGuid = taskInfo.ClipGuid;
            taskInfo.TaskName = "tv2 lorry migration task" + taskInfo.ClipName;
            taskInfo.LogicalPath = @"public material\ingest material\";

            return taskInfo;

          
        }

        public virtual bool AddTask(TaskInfo task)
        {
            task.TaskChanged += taskInfo_TaskChanged;
            lock (locker)
            {
                tasklist.Add(task);
            }
            return true;
        }

        public virtual bool Remove(TaskInfo task)
        {
            task.TaskChanged -= taskInfo_TaskChanged;
            lock (locker)
            {
                tasklist.RemoveAll(x => x.TaskGuid == task.TaskGuid);
              

            }
            return true;
        }



    }
}
