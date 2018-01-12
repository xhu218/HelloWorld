
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;
using Sobey.Sonaps.SearchService;

namespace Transfer.Flow.Core.Process
{
    class GetArchiveMaterialInfoStep:StepBase
    {

        private static Sobey.Sonaps.SearchService.SearchServiceSoap client = null;

        public GetArchiveMaterialInfoStep() { }
        public GetArchiveMaterialInfoStep(TaskInfo taskInfo) : base(taskInfo) {
            this.StepName = "Get Material Info";
        }
        public static DCMLoginInfo SearchServiceLoginInfo()
        {
            DCMLoginInfo li = new DCMLoginInfo();
            li.SystemID = "Material List";
            li.UserToken = "15";
            return li;

        }

        public static Sobey.Sonaps.SearchService.SearchServiceSoap SearchServiceSoapClient()
        {
            if (client == null)
            {
                string EndpointAddress = "http://192.168.30.155/WebService/";
                EndpointAddress = EndpointAddress + (EndpointAddress.EndsWith("/") ? "" : "/") + "searchservice.asmx";
                client = ChannelFactory<Sobey.Sonaps.SearchService.SearchServiceSoap>.CreateChannel(GetBasicHttpBindingWithoutCredential(), new EndpointAddress(EndpointAddress));
            }
            return client;
        }

        private static System.ServiceModel.Channels.Binding GetBasicHttpBindingWithoutCredential()
        {
            BasicHttpBinding binding = new BasicHttpBinding();
            binding.MaxReceivedMessageSize = int.MaxValue;
            binding.ReaderQuotas.MaxStringContentLength = int.MaxValue;
            binding.ReaderQuotas.MaxBytesPerRead = int.MaxValue;
            binding.ReaderQuotas.MaxArrayLength = int.MaxValue;
            binding.ReaderQuotas.MaxNameTableCharCount = int.MaxValue;
            return binding;
        }

        public override bool Execute()
        {
            base.Execute();
            try
            {

                  DCMLoginInfo info = SearchServiceLoginInfo();


                  DCMContentDefine content = SearchServiceSoapClient().GetDCMContentDefineByID(info, new DCMEntityIndentifier()
                  {
                      EntityID = "100102",
                      EntityTypeID = "ClipEntity"
                  });

                  this.TaskInfo.ClipContent = content;
                  Trace.TraceInformation(util.ToXml(content));
                  System.IO.File.WriteAllText(String.Format("{0}/data/{1}.xml", AppDomain.CurrentDomain.BaseDirectory, this.TaskInfo.EntityId),util.ToXml(content));

                
            }
            catch (Exception ex)
            {
                //throw ex;
                //TODO:MYQ 暂时从文件里取一个元数据出来跑后面流程
                DCMContentDefine content = util.FromXml(null);
                this.TaskInfo.ClipContent = content;
                Trace.TraceInformation(util.ToXml(content));
                System.IO.File.WriteAllText(String.Format("{0}/data/{1}.xml", AppDomain.CurrentDomain.BaseDirectory, this.TaskInfo.EntityId), util.ToXml(content));
   
            }
 
         
            //TODO: MYQ 根据entityid调用ws获取素材详细信息
            //并且设置到TaskInfo.TaskProtocol


            return true;
            
        }

        public override bool Revoke()
        {
           base.Revoke();
            //不用做任何事情

           return true;
        }
       
    }
}
