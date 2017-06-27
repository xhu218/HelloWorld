using Microsoft.Practices.EnterpriseLibrary.Data;
using Sobey.Data;
using Sobey.Data.DataMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhostDB
{
    class Program
    {
        static void Main(string[] args)
        {
            DatabaseConfiguration config = new DatabaseConfiguration
            {
                 DatabaseType = DatabaseType.MySql,
                    Encoding = "utf8",
                     DatabaseName = "mldb",
                      Username = "mldba",
                       Password = "sobeydba",
                        DatabaseServer = "172.16.168.205",
                        Pooling=true,
                 MaximumPoolSize = 10

               
            };

       
            Database  db = DatabaseHelper.CreateDatabase(config);

            SmmUserlogininfoTable user = new SmmUserlogininfoTable(db);
            var x = user.Login();
            Console.WriteLine(x.ToString());
            Console.Read();


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



        public long  Login()
        {

            try
            {
                var loginObjs = from l in this.AsQueryable()
                                
                                select l;
                return  loginObjs.ToList().LongCount();


            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
      

       
    }
   
}