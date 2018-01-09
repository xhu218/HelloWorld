using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transfer.Flow.Core.Process
{
    class InsertArchiveMaterial2HiveStep:IStep
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
            get { return "InsertArchiveMaterial2HiveStep"; }
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
