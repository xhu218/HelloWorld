using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;


namespace PlayoutDb
{
    class Program
    {
        static void Main(string[] args)
        {
            var lines = File.ReadAllLines(@"E:\分析日志\2017\2017-12\2017-12-16\CSN\CSN 系统再次出现播出事故 MYSQL20171216\PlayoutTerminal\playout__dbc__airlogin.2017.12.16.01.15.51.log");
            var String = "\d{4}-\d{2}-\d{2} (.*?) .*?    select ";

            foreach (var line in lines)
            {
                Console.WriteLine(line);
                
            }
        }
    }
}
