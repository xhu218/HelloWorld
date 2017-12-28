using Microsoft.Practices.EnterpriseLibrary.Data;
using Newtonsoft.Json;
using Sobey.Data.DataMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NhostDB
{
    public class CMApi_IngestWF
    {
        public string SRCOBJID { get; set; }
        public string DSTOBJID { get; set; }
        public string TARGETMOSID { get; set; }
        public DateTime CREATETIME { get; set; }
        public string USERTOKEN { get; set; }
    }

    public class CMApi_MPD
    {
        public int ID { get; set; }
        public string OBJID { get; set; }
        public string MPDPATH { get; set; }
        public DateTime CREATETIME { get; set; }
        public DateTime FINISHTIME { get; set; }
    }
    public class CMApi_IngestWFTable : TableRepositoryBase<CMApi_IngestWF>
    {
        //rotected ILogger loger = LoggerManager.GetLogger("CMAPIIngestTable");

        public CMApi_IngestWFTable(Database db)
            : base(db, "CMAPI_INGESTWF")
        {

        }

        protected override IDataRowMapContext<CMApi_IngestWF> MappingColumn()
        {
            return MapAllProperties().PrimaryKey(x => x.SRCOBJID).PrimaryKey(x => x.DSTOBJID).PrimaryKey(x => x.TARGETMOSID);
        }

        public ResponseMessage AddIngestWF(CMApi_IngestWF ingestwf)
        {
            ResponseMessage ret = new ResponseMessage();

            try
            {
                if (ingestwf != null)
                {
                    if (this.Add(ingestwf) < 0)
                    {
                        ret.Code = "1";
                        ret.Message = "AddIngestWF Failed";
                    }
                }
            }

            catch (Exception ex)
            {
              
                ret.Code = "1";
                ret.Message = String.Format("AddIngestWF throw exception:{0}", ex.ToString());
            }

            return ret;
        }

        public ResponseMessage<List<CMApi_IngestWF>> GetIngestWF(string srcObjid)
        {
            

            ResponseMessage<List<CMApi_IngestWF>> res = new ResponseMessage<List<CMApi_IngestWF>>();

            try
            {
                var query = from u in this.AsQueryable()
                            where u.SRCOBJID == srcObjid
                            select u;
                res.Extension = query.ToList();
            }

            catch (Exception ex)
            {
              
                res.Code = "1";
                res.Message = String.Format("GetIngestWF throw exception:{0}", ex.ToString());
            }

            return res;
        }

        public ResponseMessage DeleteIngestWF(string srcObjID)
        {
           

            ResponseMessage ret = new ResponseMessage();
            try
            {

                int c = this.Delete(m => m.SRCOBJID == srcObjID);
                if (c <= 0)
                {
                    ret.Code = "1";
                    ret.Message = "the delete IngestWF by srcobjid does not exist";
                }
                else
                {
                    ret.Code = "0";
                    ret.Message = "the delete is sucess";
                }

            }
            catch (Exception ex)
            {
                ret.Code = "1";
                ret.Message = String.Format("DeleteIngestWF is exception：{0}" + ex.Message);
            }
            return ret;
        }


    }

    /// <summary>
    /// 应答消息基类
    /// </summary>
    public class ResponseMessage
    {

        [JsonProperty(PropertyName = "code", Order = 0)]
        public string Code { get; set; }
        [JsonProperty(PropertyName = "msg", Order = 1)]
        public string Message { get; set; }



        public ResponseMessage()
        {
            Code = "0";
        }
    }

    public class ResponseMessage<TEx> : ResponseMessage
    {
        [JsonProperty(PropertyName = "ext", Order = 2)]
        public TEx Extension { get; set; }
    }

    
}
