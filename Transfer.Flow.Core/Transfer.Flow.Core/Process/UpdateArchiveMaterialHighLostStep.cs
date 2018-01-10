using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transfer.Flow.Core.Process
{
    public class UpdateArchiveMaterialHighLostStep:StepBase
    {
        public UpdateArchiveMaterialHighLostStep(TaskInfo taskInfo) : base(taskInfo) 
        {

        }

        public override bool Execute()
        {
            return base.Execute();
        }

        public override bool Revoke()
        {
            return base.Revoke();
        }
    }
}
