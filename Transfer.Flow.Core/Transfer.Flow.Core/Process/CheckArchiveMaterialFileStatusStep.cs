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
        public CheckArchiveMaterialFileStatusStep(TaskInfo taskInfo) : base(taskInfo) {

            this.StepName = "check material file status";
        }
        public override bool Execute()
        {
            
            //TODO:MYQ
            this.TaskInfo.FileStatus = FileStatus.CLIP_WITH_NO_RES;
            switch (this.TaskInfo.FileStatus)
            {
                case FileStatus.CLIP_WITH_NO_RES:
                    
                    throw new Exception("both H & L lost");                    
                
                case FileStatus.CLIP_WITH_ONLY_LOW_RES:

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
            return base.Execute();
        }

        public override bool Revoke()
        {
            //不做任何事情
            return base.Revoke();
        }
        
    }
}
