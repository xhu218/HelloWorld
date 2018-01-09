using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Transfer.Flow.Core
{
    public interface IStep
    {
        /// <summary>
        /// 
        /// </summary>
        string StepGuid { get; set; }

        /// <summary>
        /// 
        /// </summary>
        string StepName { get; }
        /// <summary>
        /// 
        /// </summary>
        int SetpId { get; }//步骤id
        /// <summary>
        /// 
        /// </summary>
        TaskInfo CurrentStatus { get; set; }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="taskInfo"></param>
        /// <returns></returns>
        bool Execute(TaskInfo taskInfo);
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        bool Revoke();//回滚
    }

    public class StepException : Exception,IStep
    {



        public string StepGuid
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        public int StepIndex
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        public string StepName
        {
            get { throw new NotImplementedException(); }
        }

        public int SetpId
        {
            get { throw new NotImplementedException(); }
        }

        public TaskInfo CurrentStatus
        {
            get
            {
                throw new NotImplementedException();
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        public bool Execute(TaskInfo taskInfo)
        {
            throw new NotImplementedException();
        }

        public bool Revoke()
        {
            throw new NotImplementedException();
        }
    }

}
