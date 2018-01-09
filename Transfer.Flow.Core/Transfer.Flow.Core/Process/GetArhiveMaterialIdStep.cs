using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transfer.Flow.Core.Process
{
    /// <summary>
    /// 
    /// </summary>
    class GetArhiveMaterialIdStep:IStep
    {
        private String stepGuid;
        public string StepGuid
        {
            get { return stepGuid; }
            set { stepGuid = value; }
        }



        public string StepName
        {
            get { return "GetArhiveMaterialIdStep"; }
        }

        private int stepId;
        public int SetpId
        {
            get {return stepId; }
            set { stepId = value; }
        }

        private TaskInfo currentStatus;

        public TaskInfo CurrentStatus
        {
            get 
           {
               return currentStatus;
            }
            set 
            {
                currentStatus = value;
            }
        }

        public bool Execute(TaskInfo taskInfo)
        {

            if (taskInfo.TaskProtocol == null)
            {
                //从数据库里获取ID
                taskInfo.TaskProtocol = "123";
                this.CurrentStatus.TaskProtocol = "123";
            }
            else if (taskInfo.TaskProtocol is string) {

                //保存当前状态
                this.CurrentStatus.TaskProtocol = taskInfo.TaskProtocol;
            }

            Trace.WriteLine(this.StepName);
            return true;
        }

        public bool Revoke()
        {
            Trace.WriteLine(this.StepName);
            return true;
        }
    }
}
