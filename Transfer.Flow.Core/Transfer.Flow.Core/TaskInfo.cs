using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Transfer.Flow.Core.Process;
namespace Transfer.Flow.Core
{
    public class TaskInfo
    {
        public event EventHandler<TaskInfo> TaskChanged;

        private int entityId;
        public int EntityId
        {
            get
            {
                return entityId;
            }
            set
            {
                entityId = value;
            }
        }

        private String clipGuid;
        public String ClipGuid
        {
            get { return clipGuid; }
            set
            {
                clipGuid = value;
            }
        }

        private string logicalPath;
        public String LogicalPath
        {
            get
            {

                return this.logicalPath;
            }
            set
            {
                this.logicalPath = value;
            }
        }


        public string TaskGuid { get; set; }

        public string TaskName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public TaskStatus TaskStatus { get; set; }

        public int CurrentStepIndex { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public List<StepBase> Steps { get; set; }

        public TaskInfo()
        {
            System.Threading.Thread.Sleep(2);
            this.TaskGuid = Guid.NewGuid().ToString("n");

            Steps = new List<StepBase>();

            Steps.Add(new GetArhiveMaterialIdStep(this));
            Steps.Add(new GetArchiveMaterialInfoStep(this));
            Steps.Add(new CheckArchiveMaterialFileStatusStep(this));

        }

        private String errorMessage;
        public String ErrorMessage
        {
            get { return errorMessage; }
            set { errorMessage = value; }
        }

        public override string ToString()
        {
            return String.Format("Task Guid = {0} task status = {1}", this.TaskGuid, this.TaskStatus);
        }

        public bool Start()
        {
            this.TaskStatus = TaskStatus.Migrating;
            Trace.Write(String.Format("start new task {0}", this.ToString()));

            while (CurrentStepIndex < this.Steps.Count)
            {
                try
                {
                    if (this.Steps[CurrentStepIndex].Execute() == true)
                    {
                        CurrentStepIndex++;
                        if (this.TaskChanged != null)
                        {
                            this.TaskChanged(this, this);
                        }
                    }
                    else
                    {
                        HandleErrorStep(null);
                        break;
                    }
                }
                catch (Exception ex)
                {
                    HandleErrorStep(ex);
                    break;
                }
            }
            if (this.TaskChanged != null)
            {
                this.TaskChanged(this, this);
            }

            return true;
        }

        private void HandleErrorStep(Exception ex)
        {
            //当前这步做失败了，需要通知上去，并且入库
            this.TaskStatus = Core.TaskStatus.Failed;
            this.ErrorMessage = String.Format("Step {0} failed :{1}", this.Steps[i].StepName, ex.Message);
            for (var i = CurrentStepIndex; i >= 0; i--)
            {
                this.Steps[i].Revoke();
            }
            //TODO: 更新记录到任务表里，
            //状态设置为FAILED,并且附带详细信息，哪一步失败了，错误的详细信息是什么

        }

    }

    /// <summary>
    /// 
    /// </summary>
    public enum TaskStatus
    {
        Wait = 0,
        Migrating = 1,
        Successed = 2,
        Failed = 3
    }

    public enum TaskType
    {
        CLIP_WITH_NO_RES = 1,
        CLIP_WITH_ONLY_LOW_RES = 2,
        TRANSCODING_LOW_RES = 3,
        MIGRATING_DRIECTLY = 4,
    }


}
