using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Reflection;
namespace Transfer.Flow.Core.Data
{
    public class FactoryBase
    {
        public static FactoryBase PluginInstance{get;set;}
        public List<StepBase> GetPlugins()
        {
            List<StepBase> FlowList = new List<StepBase>();
            string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory,"Plugin");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            var Files = Directory.GetFiles(path+@"\","*.dll");
            foreach(var file in Files)
            {
                Assembly assemlys = Assembly.LoadFrom(file);
                Type type = assemlys.GetTypes().FirstOrDefault(x => x.GetInterfaces().FirstOrDefault(t=>t.Name == typeof(StepBase).Name) !=null);
                var obj = Activator.CreateInstance(type) as StepBase;
                FlowList.Add(obj);
            }
            FlowList = FlowList.OrderBy(x => x.SetpId).ToList();
            return FlowList;
        }
        static FactoryBase()
        {
            PluginInstance= new FactoryBase();
        }

    }
}
