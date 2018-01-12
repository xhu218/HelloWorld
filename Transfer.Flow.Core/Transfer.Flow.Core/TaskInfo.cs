using Sobey.Sonaps.SearchService;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;
using Transfer.Flow.Core.Process;
namespace Transfer.Flow.Core
{
    public class TaskInfo
    {


        public event EventHandler<TaskInfo> TaskChanged;

        private ulong entityId;
        public ulong EntityId
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

        [XmlIgnore]
        private DCMContentDefine clipContent;
        public DCMContentDefine ClipContent
        {

            get { return clipContent; }
            set { this.clipContent = value; }
        }

        private FileStatus fileStatus;
        public FileStatus FileStatus
        {
            get { return fileStatus; }
            set { this.fileStatus = value; }
        }

        public string TaskGuid { get; set; }

        public string TaskName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public TaskStatus TaskStatus { get; set; }

        public int CurrentStepIndex { get; set; }

        public String ClipName { get; set; }
        /// <summary>
        /// 
        /// </summary>

        [XmlIgnore]
        public List<StepBase> Steps { get; set; }

        public TaskInfo()
        {


            Steps = new List<StepBase>();

           // Steps.Add(new GetArhiveMaterialIdStep(this));
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
            try
            {
                StringBuilder sb = new StringBuilder();
                sb.AppendLine(String.Format("\r\nTask Guid : \t\t {0}", this.TaskGuid));
                sb.AppendLine(String.Format("Task Name : \t\t {0}", this.TaskName));
                sb.AppendLine(String.Format("Task Status : \t\t {0}", this.TaskStatus));
                sb.AppendLine(String.Format("File Status : \t\t {0}", this.FileStatus));

                sb.AppendLine(String.Format("Current Step : \t\t {0} / {1}\t{2} ", this.CurrentStepIndex, this.Steps.Count, this.Steps[this.CurrentStepIndex].StepName));

                if (!String.IsNullOrEmpty(this.ErrorMessage))
                    sb.AppendLine(String.Format("Error Message : \t\t {0}", this.ErrorMessage));

                sb.AppendLine(String.Format("Clip Guid : \t\t {0}", this.clipGuid));
                sb.AppendLine(String.Format("Entity id : \t\t {0}", this.EntityId));
                sb.AppendLine(String.Format("Clip Name : \t\t {0}", this.ClipName));
                sb.AppendLine(String.Format("Logic Path : \t\t {0}", this.logicalPath));

                sb.AppendLine(String.Format("STEP ID \t STEP GUID \t\t\t\t STEP NAME"));
                sb.AppendLine("------------------------------------------------------------------------");
                var index = 0;
                foreach (var step in this.Steps)
                {
                    sb.AppendLine(String.Format("{0} \t\t {1} \t {2}", index++, step.StepGuid, step.StepName));
                }



                return sb.ToString();
            }
            catch (Exception ex)
            {
                Trace.TraceError(ex.ToString());
                return ex.ToString();

            }
        }

        private void Notify()
        {
            //做成功了，只用通知上界面层
            if (this.TaskChanged != null)
            {
                Trace.TraceInformation("Notify ; " + this.ToString());
                this.TaskChanged(this, this);
            }
        }

        public bool Start()
        {
            this.TaskStatus = TaskStatus.Excuting;
            Trace.TraceInformation(String.Format("start new task  \r\n{0}", this.ToString()));


            do
            {
                try
                {
                    if (this.Steps[CurrentStepIndex].Execute() == true)
                    {

                        Notify();

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
            } while (CurrentStepIndex++ < this.Steps.Count);
            if (this.TaskStatus != Core.TaskStatus.Failed)
            {
                this.TaskStatus = Core.TaskStatus.Successed;
            }
            Notify();
           
                //TODO:MYQ UPDATE TO DB ,
                //this.FileStatus,  this.TaskStatus,this.ErrorMessage,  this.CompleteTime
          

            return true;
        }

        private void HandleErrorStep(Exception ex)
        {

            this.TaskStatus = Core.TaskStatus.Failed;
            this.ErrorMessage = String.Format("Step {0} failed :{1}", this.Steps[CurrentStepIndex].StepName, ex.ToString());
            for (var i = CurrentStepIndex; i >= 0; i--)
            {
                this.Steps[i].Revoke();
            }
            Notify();
        }

    }

    /// <summary>
    /// 
    /// </summary>
    public enum TaskStatus
    {
        Wait = 0,
        Excuting = 1,
        Successed = 2,
        Failed = 3
    }

    public enum FileStatus
    {
        UNKOWN = 0,
        CLIP_WITH_NO_RES = 1,
        CLIP_WITH_ONLY_LOW_RES = 2,
        TRANSCODING_LOW_RES = 3,
        MIGRATING_DRIECTLY = 4,
    }


}
