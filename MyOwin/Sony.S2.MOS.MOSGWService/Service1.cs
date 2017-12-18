using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;

namespace Sony.S2.MOS.MOSGWService
{
    public partial class Service1 : ServiceBase
    {
        public Service1()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            /*
            System.Collections.Generic.List<String> list = new List<string>();
            for (var x = 0; x < int.MaxValue; x++)
            {
                //Console.WriteLine(x);
                //System.IO.File.WriteAllText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, x.ToString() + ".txt"), x.ToString());
                list.Add(new String('a', 102400000));
                System.Threading.Thread.Sleep(1000);

            }
             * */


            
            for (int j = 0; j < 20; j++)
            {


                Task task = new Task(() =>
                {

                    ulong sum = 0;
                    for (ulong i = 0; i < ulong.MaxValue; i++)
                    {
                        sum += i;
                        //Console.WriteLine(sum);
                    }


                });
                task.Start();
            }
             

        }

        protected override void OnStop()
        {
        }
    }
}
