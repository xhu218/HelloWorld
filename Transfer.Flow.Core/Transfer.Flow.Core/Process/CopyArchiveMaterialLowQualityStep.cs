using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transfer.Flow.Core.Process
{
    class CopyArchiveMaterialLowQualityStep:IStep
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
            get { return "CopyArchiveMaterialLowQualityStep"; }
        }

        public int SetpId
        {
            get { throw new NotImplementedException(); }
        }

        public TaskInfo CurrentStatus
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

        public bool Execute(TaskInfo taskInfo)
        {
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
