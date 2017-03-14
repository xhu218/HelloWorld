using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace S3
{
    class S3Service:IS3
    {

        public bool PutObject(string srcPath, string ossPath)
        {
            if (String.IsNullOrEmpty(srcPath) || String.IsNullOrEmpty(ossPath))
                throw new ArgumentException("参数为空");

            if (!File.Exists(srcPath))
                throw new IOException("源文件不存在" + srcPath);



        }

        public bool DeleteObject(string ossPath)
        {
            throw new NotImplementedException();
        }

        public byte[] GetObject(string ossPath)
        {
            throw new NotImplementedException();
        }

        public string GetSignURL(string ossPath)
        {
            throw new NotImplementedException();
        }
    }
}
