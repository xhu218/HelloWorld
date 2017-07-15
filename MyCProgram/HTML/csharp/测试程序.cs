using System.IO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Timers;
using System.Web.Script.Serialization;



namespace name1
{
    
    public class classA
    {   
        public static void Main()
        {
            Console.WriteLine("dddd");
            
            //创建线程
            var thread = new Thread(() => Console.WriteLine("fff"));

            //启动
            thread.Start();

            //终止
            try 
            {
                 //thread.Abort();
                
            }
            catch (Exception ex) 
            {

                Console.WriteLine("error");
            } 
            finally 
            {
                
            }
           

            #region 方法已过时

            //挂起
            //thread.Suspend();

            //恢复挂起的线程
            //thread.Resume();

            #endregion 方法已过时

            Console.ReadLine();
        }           

        
    }
    
}
