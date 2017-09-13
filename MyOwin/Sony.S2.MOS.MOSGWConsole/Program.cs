using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
namespace Sony.S2.MOS.MOSGWConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            
            for (var x = 0; x<int.MaxValue; x++)
            {
                //Console.WriteLine(x);
                System.IO.File.WriteAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, x.ToString() + ".txt"), x.ToString());
                System.Threading.Thread.Sleep(1000);
                
            }
            Console.Read();
            
        }
    }
}
