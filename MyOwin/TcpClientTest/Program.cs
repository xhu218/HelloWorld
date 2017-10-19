using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace TcpClientTest
{
    class Program
    {
        static void Main(string[] args)
        {
            Trace.Listeners.Add(new ConsoleTraceListener());

            TCPSessionDealer dealer = new TCPSessionDealer("172.16.148.51", 4001);

            for (int i = 0; i < 1000; i++)
            {
                dealer.SendMosMessage("hello : " + i.ToString());
                System.Threading.Thread.Sleep(500);
                
            }

            Console.Read();


        }
     
    }
}
