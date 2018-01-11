using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transfer.Flow.Core.Process
{
    class GenerateArhiveMaterialLowQualityStep:StepBase
    {
        public GenerateArhiveMaterialLowQualityStep() { }
        public GenerateArhiveMaterialLowQualityStep(TaskInfo taskInfo) : base(taskInfo) {
            this.StepName = "Create Low";
        }

        public override bool Execute()
        {
            //TODO:YRF 构造MPC协议，产生生成低质量任务
            base.Execute();

            return true;
        }

        public override bool Revoke()
        {
            //不需要干任何事情
            return base.Revoke();
        }

    }
}
