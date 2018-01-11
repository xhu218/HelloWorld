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
    public class GetArhiveMaterialIdStep:StepBase
    {

        public GetArhiveMaterialIdStep() { }
        public GetArhiveMaterialIdStep(TaskInfo taskInfo)
            : base(taskInfo)
        {
            this.StepName = "Get Material ID";
        }

        public override bool Execute()
        {
            base.Execute();



            if (String.IsNullOrEmpty(TaskInfo.ClipGuid))
            {
              

                //如果从数据库里没有找到待做的任务，那到
                //throw new Exception("not find data to do");


            }
            else 
            {
                //通过界面REDO触发的，因此不用做任何处理
            }

            return true;
            
        }

        public override bool Revoke()
        {
            //不用做任何处理
            base.Revoke();

            return true;

        }
       
    }
}
