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
        public GetArhiveMaterialIdStep(TaskInfo taskInfo)
            : base(taskInfo)
        {
            /*
             * 记录素材的GUID
             */
            this.InputArgs = taskInfo.ClipGuid;
        }

        public override bool Execute()
        {            
            return base.Execute();
            if (String.IsNullOrEmpty(this.InputArgs.ToString()))
            {
                //如果为空，那么从SQLLITE当中获取到素材的的ENTITYID,CLIPGUI,FOLDERPATH,CLIP NAME

                //TODO: MYQ
                this.TaskInfo.ClipGuid = "";
                this.TaskInfo.EntityId = 0;
                this.TaskInfo.TaskName = "wfg" + "clip name";
                this.TaskInfo.LogicalPath = "";

            }
            else 
            {

            }
        }

        public override bool Revoke()
        {
            return base.Revoke();
        }
       
    }
}
