using System.IO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Timers;
using System.Web.Script.Serialization;



namespace ConsoleApplication29
{
    class Program
    {
        static void Main(string[] args)
        {
            //异步线程的异常处理
            //3，在Task的ContinueWith方法中读取Task的Exception属性
            Task.Factory.StartNew(() =>
            {
                throw new Exception("异步线和发生异常了!");
            }).ContinueWith(t => 
            {
                if (t.IsFaulted)
                {
                    Console.WriteLine(t.Exception.InnerException);
                }
            }, TaskContinuationOptions.OnlyOnFaulted);

            Console.ReadKey();
        }

        #region 使用Task实现
        static void TestByTask()
        {
            Console.WriteLine("main thread start,current thread id:" + Thread.CurrentThread.ManagedThreadId);
            var task = Task.Factory.StartNew<string>(() =>
            {
                return GetNameByTask();
            });
            Console.WriteLine("get another thread result,result:" + task.Result);
            Console.WriteLine("main thread completed!");
        }

        static string GetNameByTask()
        {
            Console.WriteLine("another thread start,current thread id:" + Thread.CurrentThread.ManagedThreadId);
            return "mcgrady";
        } 
        #endregion
    }
}