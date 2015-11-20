using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;
using System.Net;

namespace ServerManagement
{
    class Program
    {
        static void Main(string[] args)
        {
            Process proc = new Process();

            proc.StartInfo.FileName = "cmd.exe";
            proc.StartInfo.Arguments = "/c test1.vbs";
            proc.StartInfo.CreateNoWindow = false;
            proc.Start();
            Console.Read();

        }
    }
}
