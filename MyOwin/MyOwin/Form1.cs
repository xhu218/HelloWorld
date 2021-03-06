﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Windows.Forms;
using Microsoft.Owin;
using Microsoft.Owin.Hosting;
using Owin;
using Newtonsoft.Json;

namespace MyOwin
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();

            var url = "http://localhost:8080/";
            var startOpts = new StartOptions(url)
            {
            };
            using (WebApp.Start<Startup>(startOpts))
            {
                Trace.WriteLine("Server run at " + url + " , press Enter to exit.");
               
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {

        }
    }

    public class Values1Controller : ApiController
    {



        // GET api/values 
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

         //GET api/values 
        //[Route("Values/Get1")]
        //public IEnumerable<string> Get1()
        //{
        //    return new string[] { "value1", "value2" };
        //}

    }

    public class ValuesController : ApiController
    {
        // GET api/values 
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/values/5 
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/values 
        //public void Post([FromBody]string value)
        //{
        //}


        [Route("Values/GetStu1")]
        public Stu GetStu1()
        {
            String stu = "{\"Name\":\"wfg\",\"Age\":11,\"obj\":{\"name1\":\"sss\"}}";
            Stu stu1 = JsonConvert.DeserializeObject<Stu>(stu);
            return stu1;
        }


        // PUT api/values/5 
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5 
        public void Delete(int id)
        {
        }


    public class ETObject
    {
        public String ObjType{get;set;}
        public Object Item{get;set;}

        public override string ToString()
        {
 	        return String.Format("{0}:{1}",ObjType,Item.ToString());
        }
    }

    public class A
    {
        public String Name{get;set;}

        public override string ToString()
        {
 	         return "Name:"+Name;
        }
    }
    public class B
    {
        public int Age{get;set;}

        public override string ToString()
{
 	 return "Age:"+Age;
}
    }



    }
    public class Stu
    {
        public String Name;
        public int Age;
        public Object obj;
    }


     public class Startup 
    { 
        // This code configures Web API. The Startup class is specified as a type
        // parameter in the WebApp.Start method.
        public void Configuration(IAppBuilder appBuilder) 
        { 
            // Configure Web API for self-host. 
            HttpConfiguration config = new HttpConfiguration(); 
            config.Routes.MapHttpRoute( 
                name: "DefaultApi", 
                routeTemplate: "api/{controller}/{id}", 
                defaults: new { id = RouteParameter.Optional } 
            ); 

            appBuilder.UseWebApi(config); 
        } 
    } 
}
