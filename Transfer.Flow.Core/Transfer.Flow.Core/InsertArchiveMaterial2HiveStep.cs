using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transfer.Flow.Core.Process
{
    class InsertArchiveMaterial2HiveStep:StepBase
    {
        public InsertArchiveMaterial2HiveStep() { }
        public InsertArchiveMaterial2HiveStep(TaskInfo taskInfo)
            : base(taskInfo)
        {
            this.StepName = "Save Clip";
        }

        public override bool Execute()
        {
            base.Execute();
            //TODO:请根据TaskInfo.FileStatus 的状态构造入库协议
            switch (this.TaskInfo.FileStatus)
            {
                case FileStatus.CLIP_WITH_NO_RES:
                    //逻辑都到这里了，不存在这种情况
                    break;
                case FileStatus.CLIP_WITH_ONLY_LOW_RES:
                    //只入低质量
                    break;
                case FileStatus.TRANSCODING_LOW_RES:
                   //只入高质量
                    break;
                case FileStatus.MIGRATING_DRIECTLY:
                    //高低质量都入
                    break;
                default:
                    break;
            }
            return true;
        }

        public override bool Revoke()
        {
            base.Revoke();
            //不干任何事情

            return true;
        }
    }
}
