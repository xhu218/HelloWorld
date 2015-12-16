using Newtonsoft.Json;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Qiniu.Test.Xhu218
{
    	[TestFixture]
    public class QiniuVideo
    {
        [Test]
        public void  Test1()
        {
            String line = "{ 	\"id\": \"z0.5670e3e07823de68da45e9dd\", 	\"pipeline\": \"1380484779.sobeymps\", 	\"code\": 0, 	\"desc\": \"The fop was completed successfully\", 	\"reqid\": \"WTEAAEHFZTSjSCAU\", 	\"inputBucket\": \"xhu218\", 	\"inputKey\": \"orignal.mp4\", 	\"items\": [{ 		\"cmd\": \"avthumb/flv|saveas/eGh1MjE4OmEuZmx2\", 		\"code\": 0, 		\"desc\": \"The fop was completed successfully\", 		\"hash\": \"Ft4JCo-dzbu7x15k9LrAvQwZurjd\", 		\"key\": \"a.flv\", 		\"returnOld\": 0 	}, 	{ 		\"cmd\": \"vframe/png/offset/1/w/200/h/100|saveas/eGh1MjE4OndmZy5wbmc=\", 		\"code\": 0, 		\"desc\": \"The fop was completed successfully\", 		\"hash\": \"FjPHWcXHE4tpqR4ZFnnM-AnQCDcd\", 		\"key\": \"wfg.png\", 		\"returnOld\": 0 	}] }";
            persistent p =  JsonConvert.DeserializeObject<persistent>(line);
            Assert.IsNotNull(p);
        }
    }

        public class persistent
        {
            public String id;
            public String pipeline;
            public int code;
            public String desc;
            public String reqid;
            public String inputBucket;
            public String inputKey;
            public Item[] Items;

        }
        public class Item
        {
            public String cmd;
            public int code;
            public String desc;
            public string hash;
            public string key;
            public int returnOld;
        }
}
/*
 
 {
	"id": "z0.5670e3e07823de68da45e9dd",
	"pipeline": "1380484779.sobeymps",
	"code": 0,
	"desc": "The fop was completed successfully",
	"reqid": "WTEAAEHFZTSjSCAU",
	"inputBucket": "xhu218",
	"inputKey": "orignal.mp4",
	"items": [{
		"cmd": "avthumb/flv|saveas/eGh1MjE4OmEuZmx2",
		"code": 0,
		"desc": "The fop was completed successfully",
		"hash": "Ft4JCo-dzbu7x15k9LrAvQwZurjd",
		"key": "a.flv",
		"returnOld": 0
	},
	{
		"cmd": "vframe/png/offset/1/w/200/h/100|saveas/eGh1MjE4OndmZy5wbmc=",
		"code": 0,
		"desc": "The fop was completed successfully",
		"hash": "FjPHWcXHE4tpqR4ZFnnM-AnQCDcd",
		"key": "wfg.png",
		"returnOld": 0
	}]
}

 */