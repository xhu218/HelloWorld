using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transfer.Flow.Core.Process
{
    class CopyArchiveMaterialLowQualityStep:StepBase
    {
        public CopyArchiveMaterialLowQualityStep() { }
        public CopyArchiveMaterialLowQualityStep(TaskInfo taskInfo) : base(taskInfo) {

            this.StepName = "Copy Low";
        }

        public override bool Execute()
        {
            base.Execute();
            //TODO:获取POOL路径
            /*
             * 不能把文件直接COPY到POOL目录下面，需要COPY之前的父级目录到POOL
             * 请同时更新低质量文件路径到this.TaskInfo.TaskProtocol
             */

            return true;
        }

        public override bool Revoke()
        {
            //TODO:MYQ如果产生了文件COPY，那么就要把产生的垃圾文件干掉,请在自己内存存储COPY的目标位置
            base.Revoke();

            return true;
        }
    }
}
