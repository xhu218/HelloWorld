
using System;
using System.Collections.Generic;
using System.Text;
using System.ServiceModel;
using System.ServiceModel.Description;

namespace Host
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                using (ServiceHost host = new ServiceHost(typeof(Sonaps.ESB.WebService.Playout.PlayoutService)))
                {
                    //ServiceDebugBehavior debugBehavior = host.Description.Behaviors.Find<ServiceDebugBehavior>();
                    //if (debugBehavior == null)
                    //{
                    //    debugBehavior = new ServiceDebugBehavior();
                    //    host.Description.Behaviors.Add(debugBehavior);
                    //}

                    //debugBehavior.HttpHelpPageEnabled = false;
                    //debugBehavior.HttpHelpPageUrl = new Uri("http://www.microsoft.com");
                    //debugBehavior.IncludeExceptionDetailInFaults = true;

                    host.Open();

                    Console.WriteLine();
                    Console.WriteLine("Press <ENTER> to terminate Host");
                    Console.ReadLine();

                }
            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString());
            }
            
        }
    }
}
