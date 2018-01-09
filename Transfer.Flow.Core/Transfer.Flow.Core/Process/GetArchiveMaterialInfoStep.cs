using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transfer.Flow.Core.Process
{
    class GetArchiveMaterialInfoStep:IStep
    {

        public string StepGuid
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        public int StepIndex
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        public string StepName
        {
            get { return "GetArchiveMaterialInfoStep"; }
        }

        public int SetpId
        {
            get { throw new NotImplementedException(); }
        }

        private TaskInfo currentStatus;

        public TaskInfo CurrentStatus
        {
            get
            {
                return currentStatus;
            }
            set {
                currentStatus = value;
            }
        }

        public bool Execute(TaskInfo taskInfo)
        {

            if (!(taskInfo.TaskProtocol is  string)) 
            {
                return false;
            }

            Trace.WriteLine(this.StepName);
            System.Threading.Thread.Sleep(3000);
            return true;
        }

        public bool Revoke()
        {
            Trace.WriteLine(this.StepName);
            return true;
        }
    }
}
