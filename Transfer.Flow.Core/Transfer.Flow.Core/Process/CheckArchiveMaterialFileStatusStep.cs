using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transfer.Flow.Core.Process
{
    class CheckArchiveMaterialFileStatusStep:IStep
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
            get { return "CheckArchiveMaterialFileStatusStep"; }
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
            Random ran = new Random();
            var r = ran.Next(1, 3);
            r=2;
            if (r == 1) {
                taskInfo.Steps.Add(new UpdateArchiveMaterialHighLostStep());
            }
            else if (r == 2)
            {
                taskInfo.Steps.Add(new InsertArchiveMaterial2HiveStep());
                taskInfo.Steps.Add(new GenerateArhiveMaterialLowQualityStep());
            }
            else {
                taskInfo.Steps.Add(new CopyArchiveMaterialLowQualityStep());
                taskInfo.Steps.Add(new InsertArchiveMaterial2HiveStep());
            }
            return true;
        }

        public bool Revoke()
        {
            Trace.WriteLine(this.StepName);
            return true;
        }
    }
}
