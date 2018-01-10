using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transfer.Flow.Core
{
    public class StepBase
    {

        public StepBase(TaskInfo taskInfo) 
        {
            this.TaskInfo = taskInfo;
            this.StepGuid = Guid.NewGuid().ToString("N").ToUpper();
        }
        /// <summary>
        /// 
        /// </summary>
        public string StepGuid { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public String StepName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int SetpId { get; set; }//步骤id
        /// <summary>
        /// 
        /// </summary>
        public TaskInfo TaskInfo { get; set; }
        
        /// <summary>
        /// 请直接使用当前线程操作，做不了就抛异常出来
        /// </summary>
        /// <returns></returns>
        public virtual bool Execute() 
        {
            Trace.Write(String.Format("start...{0}", this.StepName));
            return true;
        }
        
        /// <summary>
        /// 请直接使用当前线程操作，做不了就抛异常出来
        /// </summary>
        /// <returns></returns>
        public virtual bool Revoke()
        {
            Trace.Write(String.Format("revoke...{0}", this.StepName));
            return true;
        }

        protected object InputArgs { get; set; }


    }


}
