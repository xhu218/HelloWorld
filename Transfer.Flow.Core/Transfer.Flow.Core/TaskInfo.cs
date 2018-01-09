using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Transfer.Flow.Core.Process;
namespace Transfer.Flow.Core
{
    public class TaskInfo
    {
        public event EventHandler<TaskInfo> TaskChanged;

        /// <summary>
        /// 
        /// </summary>
        public string TaskId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string TaskName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public TaskStatus TaskStatus { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public object TaskProtocol { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int CurrentStepIndex { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public List<IStep> Steps { get; set; }

        public TaskInfo() 
        {
            Steps = new List<IStep>();

            Steps.Add(new GetArhiveMaterialIdStep());
            Steps.Add(new GetArchiveMaterialInfoStep());
            Steps.Add(new CheckArchiveMaterialFileStatusStep());

        }

        public bool Start() 
        {
            this.TaskStatus = TaskStatus.Excuting;

            while (CurrentStepIndex < this.Steps.Count)
            {
                try
                {
                    if (this.Steps[CurrentStepIndex].Execute(this) == true)
                    {
                        CurrentStepIndex++;
                    }
                    else
                    {
                        for (var i = CurrentStepIndex; i >= 0; i--)
                        {
                            this.Steps[i].Revoke();
                        }
                        break;
                    }
                }
                catch (Exception ex)
                {
                    if (ex is StepException)
                    {

                    }
                    else
                    {

                    }
                    break;
                }

            }



            if (this.TaskChanged != null) {
                this.TaskStatus = Core.TaskStatus.Successed;
                this.TaskChanged(this, this);
            }
           
            return true;
        }
         
    }

    /// <summary>
    /// 
    /// </summary>
    public enum TaskStatus
    {
        Wait = 0,
        Excuting = 1,
        Successed =2,
        Failed =  3
    }


}
