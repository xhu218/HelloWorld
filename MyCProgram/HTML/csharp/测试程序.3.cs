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

            List<String> list = new List<string>();
            list.Add("111");
            list.Add("222");
           
            list.ForEach(a=>{ a = a+"A";});

            foreach (var item in list)
            {
                Console.WriteLine(item);
            }
            //异步线程的异常处理
            //2，调用Task的Wait方法
            try
            {
                var task = Task.Factory.StartNew(() =>
                {
                    System.Threading.Thread.Sleep(3000);
                    throw new Exception("异步线和发生异常了!");
                });
                task.Wait();
                Console.WriteLine("this is main method...");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            Console.ReadKey();
        }
    }
}