using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace S3
{
    interface IS3
    {
        bool PutObject(String srcPath, String ossPath);

        bool DeleteObject(String ossPath);

        Byte[] GetObject(String ossPath);
        
        String GetSignURL(String ossPath);        

    }
}
