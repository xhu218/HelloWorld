using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.OracleClient;

namespace OracleClientTest
{
    class Program
    {
        static void Main(string[] args)
        {

            OracleConnection conn = null;

            try
            {
                String connStr = Properties.Settings.Default.ConnStr;
                String cmdText = Properties.Settings.Default.cmdText;

                Console.WriteLine(String.Format("ConnStr : {0}", connStr));
                Console.WriteLine(String.Format("cmdText : {0}", cmdText));

                conn = new OracleConnection(connStr);
                OracleCommand cmd = new OracleCommand(cmdText, conn);

                conn.Open();

                Console.WriteLine(String.Format("data count : {0}", cmd.ExecuteScalar()));
            }
            catch (Exception EX)
            {
                Console.WriteLine(EX.ToString());
            }
            finally
            {
                if(conn!=null)
                conn.Dispose();
            }

            Console.Read();

        }
    }
}
