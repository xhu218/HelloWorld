using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transfer.Flow.Core.Process
{
    class GetArchiveMaterialInfoStep:StepBase
    {
        public GetArchiveMaterialInfoStep() { }
        public GetArchiveMaterialInfoStep(TaskInfo taskInfo) : base(taskInfo) {
            this.StepName = "Get Material Info";
        }

        public override bool Execute()
        {
            base.Execute();
            //TODO: MYQ 根据entityid调用ws获取素材详细信息
            //并且设置到TaskInfo.TaskProtocol


            return true;
            
        }

        public override bool Revoke()
        {
           base.Revoke();
            //不用做任何事情

           return true;
        }
       
    }
}
