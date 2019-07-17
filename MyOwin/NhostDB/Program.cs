using Microsoft.Practices.EnterpriseLibrary.Data;
using MySql.Data.MySqlClient;
using Sobey.Data;
using Sobey.Data.DataMapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhostDB
{
    class Studen {

        public String name;
        public int Age;
    }
    class Program
    {

        static DatabaseConfiguration config = new DatabaseConfiguration
        {
            DatabaseType = DatabaseType.MySql,
            Encoding = "utf8",
            DatabaseName = "mldb",
            Username = "mldba",
            Password = "sobeydba",
            DatabaseServer = "172.16.168.205",
            Pooling = true,
            MaximumPoolSize = 5


        };




        static Database db = DatabaseHelper.CreateDatabase(config);

        static void Main(string[] args)
        {

            TestSelfTab1Info();
            //try
            //{
            //    //var connStr = "server=172.16.168.205;user id=sdba;password=sdba;database=nwfm;pooling=False;allowzerodatetime=True;allowuservariables=True;cacheserverproperties=True;minpoolsize=10;characterset=utf8";
            //    var connStr = "server=172.16.168.202:3306;user id=sdba;password=sdba;database=mldb;";
            //    //var connStr = "server=10.0.100.11;user id=mldba;password=mldba;database=mldb;pooling=True";
            //    //connStr = Properties.Settings.Default.connStr;
            //    MySqlConnection conn = new MySqlConnection(connStr);
            //    conn.Open();
            //    Console.WriteLine("OK");
            //    conn.Dispose();
            //}
            //catch (Exception EX)
            //{

            //    Console.WriteLine(EX.ToString());
            //}




            //List<Studen> stus = new List<Studen>();

            //var path = @"C:\Users\WangFugui\Documents\Visual Studio 2012\Projects\MyOwin\MyOwin\ConsoleApplication1\bin\Debug\ConsoleApplication1.exe";
            //Process process = new Process();
            //process.StartInfo = new ProcessStartInfo(path,"\"hello world\"");
            //process.StartInfo.UseShellExecute = false;
            //process.StartInfo.RedirectStandardOutput = true;
            //process.StartInfo.RedirectStandardError = true;
            //process.StartInfo.CreateNoWindow = false;
           
            //process.Start();
            //StreamReader reader = process.StandardOutput;
            //Console.WriteLine(reader.ReadToEnd());
            //process.WaitForExit();


            //stus.First(s => s.Age == 100);


            //CMApi_IngestWFTable ingest = new CMApi_IngestWFTable(db);
            //ingest.AddIngestWF(new CMApi_IngestWF { CREATETIME = DateTime.Now, DSTOBJID = "wfg", SRCOBJID = "wfg", TARGETMOSID = "wfg", USERTOKEN = "wfg" });


            //TestSelfTab1Info();
            //TestGen2SmmUserLoginInfo();
          //  Console.WriteLine(db.ConnectionString);


            
            //while (true)
            //{
            //    String s = Console.ReadLine();
            //    try
            //    {
            //        Ado ado = new Ado();
            //        ado.doTest1(s);
            //    }
            //    catch (Exception ex)
            //    {
            //        Console.Write(ex.ToString());
            //    }

               
            //}
             
            /*
            
            for (var index = 0; index < 80; index++)
            {
                int j = index;
                Task task = new Task(delegate()
                {


                    Ado ado = new Ado();
                    ado.doTest(j);
                });
                task.Start();


            }
            */


            Console.Read();


        }



        private static void TestSelfTab1Info()
        {
          

                DatabaseConfiguration config = new DatabaseConfiguration
                {
                    DatabaseType = DatabaseType.MySql,
                    Encoding = "ascii",
                    DatabaseName = "hivedb",
                    Username = "mysql",
                    Password = "mysql",
                    DatabaseServer = "172.16.128.41:3307",
                    
                    Pooling = false,
                    MaximumPoolSize = 10,



                };

              
              
              
                 

                   tab1Table user = new tab1Table(db);

                   while(true)
                   {
                       try
                       {

                           Database db = DatabaseHelper.CreateDatabase(config);

                           var x = user.Login();
                       }
                       catch (Exception ex)
                       {

                           Console.Write(ex.ToString());
                       }
                       //System.Threading.Thread.Sleep(1500);

                     

                       //Console.WriteLine(String.Format("{0} {1}   {2} {3}", j, x.ToString(), user.Add(), user.Login()));

                       //Console.WriteLine(String.Format("Current Date Count is :{0} ", x.ToString()));

                       //Console.WriteLine(String.Format("the add fun result is :{0}", user.Add()));

                       //Console.WriteLine(String.Format("Current Date Count is :{0} ", user.Login().ToString()));
                   }

             


            
        }

        private static void  TestGen2SmmUserLoginInfo()
        {



            for (var index = 0; index < 80; index++)
            {

              

         

                Task task = new Task(delegate()
                {
                   

                    for (var i = 0; i < 1000; i++)
                    {

                        SmmUserlogininfoTable user = new SmmUserlogininfoTable(db);

                        var db1 = db;
                        var user1 = user;

                        var x = user1.Login();

                        Console.WriteLine(String.Format("{0} {1}   {2} {3}", i, x.ToString(), user1.Add(), user1.Login()));

                        //Console.WriteLine(String.Format("Current Date Count is :{0} ", x.ToString()));

                        //Console.WriteLine(String.Format("the add fun result is :{0}", user.Add()));

                        //Console.WriteLine(String.Format("Current Date Count is :{0} ", user.Login().ToString()));
                    }

                });
                task.Start();
            }
        }
    }




    public class Ado
    {
        static int count = 0;
        private object _locker = new object();
        public void doTest(int index)
        {
           // for (var i = 0; i < 1000; i++)
            {
                //var connStr = String.Format("server={0};user id={1};password={2};database={3};pooling=True;allowzerodatetime=True;allowuservariables=True;minpoolsize=10;characterset=utf8",
                //   "10.0.100.10", "sdba", "sdba", "mldb");

                var connStr = "server=172.16.168.205;user id=sdba;password=sdba;database=mldb;pooling=True;minpoolsize=0;maxpoolsize=5;allowzerodatetime=True;allowuservariables=True;characterset=utf8";
                //var connStr = "server=10.0.100.11;user id=mldba;password=mldba;database=mldb;pooling=True";
                //connStr = Properties.Settings.Default.connStr;
                MySqlConnection conn = new MySqlConnection(connStr);
                conn.Open();
               // Console.WriteLine("ADO OPEN");
                var strsql = "select count(*) from cmapi_ding where usercode='" + Guid.NewGuid().ToString("N") + "'";
                MySqlCommand mycmd = new MySqlCommand(strsql, conn);

                var c = mycmd.ExecuteScalar();
                //System.Threading.Thread.Sleep(5000);
                conn.Dispose();
                //System.Threading.Thread.Sleep(1);
                //lock (_locker)
                //    count++;
                Console.WriteLine(String.Format("{0}   {1}   {2}   {3}    *{4}", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff"), index, 0, c, count));



            }


        }

        public void doTest1(String s)
        {
            //var connStr = "server=172.16.168.205;user id=sdba;password=sdba;database=mldb;pooling=True;minpoolsize=0;maxpoolsize=5;allowzerodatetime=True;allowuservariables=True;characterset=utf8";
            var connStr = "server=hiveqa-db.cgmmflntckek.ap-northeast-1.rds.amazonaws.com;user id=sdba;password=sdba;database=mldb;pooling=True;minpoolsize=0;maxpoolsize=5;allowzerodatetime=True;allowuservariables=True;characterset=utf8";
            MySqlConnection conn = new MySqlConnection(connStr);

            MySqlCommand cmd = new MySqlCommand("PC_MATERIALID", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            MySqlParameter parOutput = cmd.Parameters.Add("ID", MySqlDbType.Int32, 10);
            parOutput.Direction = ParameterDirection.Output;　　//参数类型为Output

            MySqlParameter parInput = cmd.Parameters.Add("POLICY", MySqlDbType.VarChar, 255);
            parInput.Direction = ParameterDirection.Input;
            parInput.Value = s;


            conn.Open();
            cmd.ExecuteNonQuery();
          
            Console.WriteLine(parOutput.Value.ToString());   //显示输出参数的值
            conn.Dispose();


        }

      


    }

    public class tab1
    {
        public int id { get; set; }
        public DateTime dt { get; set; }
        public String t2 { get; set; }

    }

    public class tab1Table : TableRepositoryBase<tab1>
    {
        public tab1Table(Database db) :
            base(db, "tab1")
        {

        }

        protected override IDataRowMapContext<tab1> MappingColumn()
        {
            return MapAllProperties().PrimaryKey(x => x.id);

        }

        public int Add()
        {
            return this.Add(new tab1
            {
                dt = DateTime.Now,
                t2 = "hello1"
            });

        }




        public long Login()
        {

          
                var loginObjs = from l in this.AsQueryable()

                                select l;
                return loginObjs.ToList().LongCount();




          

            return 11;
        }


    }





    public class SmmUserlogininfo
    {
        public int userid { get; set; }
        public string usercode { get; set; }
        /// <summary>
        /// 序列ID，登录成功后分配的ID
        /// </summary>
        public int logininfoid { get; set; }
        /// <summary>
        /// 登录的系统
        /// </summary>
        public string loginsubsystem { get; set; }
        /// <summary>
        /// 登录的时间
        /// </summary>
        public DateTime logintime { get; set; }
        /// <summary>
        /// 登录终端的IP
        /// </summary>
        public string loginip { get; set; }
        /// <summary>
        /// 刷新时间
        /// </summary>
        public DateTime newrefreshtime { get; set; }
        /// <summary>
        /// 登录终端机器名
        /// </summary>
        public string windowname { get; set; }
        /// <summary>
        /// hive认证成功后返回的Token
        /// </summary>
        public string usertoken { get; set; }
        /// <summary>
        /// 用户登录名
        /// </summary>
        public string loginname { get; set; }
        /// <summary>
        /// 登录密码（应该需要MD5加密）
        /// </summary>
        public string loginpwd { get; set; }
        /// <summary>
        /// 密码修改时间
        /// </summary>
        public string pwdchangetime { get; set; }
        /// <summary>
        /// 用户部门信息
        /// </summary>

    }
    public class SmmUserlogininfoTable : TableRepositoryBase<SmmUserlogininfo>
    {
        public SmmUserlogininfoTable(Database db) :
            base(db, "smm_userlogininfo")
        {

        }

        protected override IDataRowMapContext<SmmUserlogininfo> MappingColumn()
        {
            return MapAllProperties()
                .DoNotMap(x => x.loginpwd)
                .PrimaryKey(x => x.logininfoid)
                .DoNotMap(x => x.pwdchangetime);

        }

        public int Add()
        {
            return this.Add(new SmmUserlogininfo
            {
                loginip = "127.0.0.1",
                loginname = "wfg",
                loginpwd = "wfg",
                loginsubsystem = "ML",
                logintime = DateTime.Now,
                newrefreshtime = DateTime.Now,
                pwdchangetime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss fff"),
                usercode = "WFG",
                userid = 111,
                windowname = "localhost",
                usertoken = Guid.NewGuid().ToString("n")
            });

        }



        public long  Login()
        {

            try
            {
                var loginObjs = from l in this.AsQueryable()
                                where l.loginip == Guid.NewGuid().ToString("N")
                                select l;
                                 
                return loginObjs.ToList().LongCount();




            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



    }

}