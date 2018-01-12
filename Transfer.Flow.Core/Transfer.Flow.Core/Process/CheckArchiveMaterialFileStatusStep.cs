using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transfer.Flow.Core.Process
{
    class CheckArchiveMaterialFileStatusStep:StepBase
    {
        public CheckArchiveMaterialFileStatusStep() { }
        public CheckArchiveMaterialFileStatusStep(TaskInfo taskInfo) : base(taskInfo) {

            this.StepName = "check material file status";
        }
        public override bool Execute()
        {
            base.Execute();
            //TODO:MYQ,
            /*根据文件列表,给文件状态赋值
             FileState = FileState_Online  QualityType = 0 表示Cache低质量
             FileState = FileState_Archived  QualityType = 1 代表Raid上面的高质量
             注意文件列表里是有重复的，判断的时候不用每个都判断
             */

           // this.TaskInfo.FileStatus = FileStatus.CLIP_WITH_NO_RES;//TODO:MYQ请给它赋值

            Random random = new Random();

            this.TaskInfo.FileStatus = (FileStatus)random.Next(1, 4);

            switch (this.TaskInfo.FileStatus)
            {
                case FileStatus.CLIP_WITH_NO_RES:
                    
                    throw new Exception("both H & L lost");                    
                
                case FileStatus.CLIP_WITH_ONLY_LOW_RES:
                    this.TaskInfo.Steps.Add(new CopyArchiveMaterialLowQualityStep(this.TaskInfo));
                    this.TaskInfo.Steps.Add(new InsertArchiveMaterial2HiveStep(this.TaskInfo));
                    break;

                case FileStatus.TRANSCODING_LOW_RES:

                    this.TaskInfo.Steps.Add(new InsertArchiveMaterial2HiveStep(this.TaskInfo));
                    this.TaskInfo.Steps.Add(new GenerateArhiveMaterialLowQualityStep(this.TaskInfo));
                    break;

                case FileStatus.MIGRATING_DRIECTLY:

                    this.TaskInfo.Steps.Add(new CopyArchiveMaterialLowQualityStep(this.TaskInfo));
                    this.TaskInfo.Steps.Add(new InsertArchiveMaterial2HiveStep(this.TaskInfo));

                    break;
                default:
                    break;
            }
            return true;
        }

        public override bool Revoke()
        {
            //不做任何事情
            base.Revoke();

            return true;
        }
        
    }
}
