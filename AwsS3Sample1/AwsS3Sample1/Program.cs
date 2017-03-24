/*******************************************************************************
* Copyright 2009-2013 Amazon.com, Inc. or its affiliates. All Rights Reserved.
* 
* Licensed under the Apache License, Version 2.0 (the "License"). You may
* not use this file except in compliance with the License. A copy of the
* License is located at
* 
* http://aws.amazon.com/apache2.0/
* 
* or in the "license" file accompanying this file. This file is
* distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the specific
* language governing permissions and limitations under the License.
*******************************************************************************/

using System;
using System.Collections.Specialized;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;

using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using System.Text;
using System.Security.Cryptography;
using System.Collections.Generic;

namespace GettingStartedGuide
{
    class S3Sample
    {
        // Change the AWSProfileName to the profile you want to use in the App.config file.
        // See http://aws.amazon.com/credentials  for more details.
        // You must also sign up for an Amazon S3 account for this to work
        // See http://aws.amazon.com/s3/ for details on creating an Amazon S3 account
        // Change the bucketName and keyName fields to values that match your bucketname and keyname
        static string bucketName = "infinityfs";
        static string keyName = "1.txt";
        static IAmazonS3 client;

        static string strAccessKey = "AKIAPP3Y4VFTXZK66NZA";
        static string strSecretKey = "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";

        public static void Main(string[] args)
        {
            if (checkRequiredFields())
            {
                using (client = new AmazonS3Client("AKIAPP3Y4VFTXZK66NZA", "yvwt1aVEipUt41qiNROw6GNnxU+6CAU0xNE3MNZl", RegionEndpoint.CNNorth1))
                {
                    Console.WriteLine("Listing buckets");
                  //  ListingBuckets();

                    Console.WriteLine("Creating a bucket");
                    //CreateABucket();

                    Console.WriteLine("Writing an object");
                    WritingAnObject();

                    Console.WriteLine("Reading an object");
                    ReadingAnObject();

                    //Console.WriteLine("Deleting an object");
                    //DeletingAnObject();

                    Console.WriteLine("Listing objects");
                    ListingObjects();

                    String url = client.GeneratePreSignedURL(bucketName, keyName, DateTime.Now.AddDays(1), null);

                    String url1 = SignURL(bucketName, keyName, null, TimeSpan.FromDays(1));


                    Console.WriteLine(url);
                    Console.WriteLine(url1); 

                }
            }

            Console.WriteLine("Press any key to continue...");
            Console.ReadLine();
        }

        static bool checkRequiredFields()
        {
            NameValueCollection appConfig = ConfigurationManager.AppSettings;

            if (string.IsNullOrEmpty(appConfig["AWSProfileName"]))
            {
                Console.WriteLine("AWSProfileName was not set in the App.config file.");
                return false;
            }
            if (string.IsNullOrEmpty(bucketName))
            {
                Console.WriteLine("The variable bucketName is not set.");
                return false;
            }
            if (string.IsNullOrEmpty(keyName))
            {
                Console.WriteLine("The variable keyName is not set.");
                return false;
            }

            return true;
        }

        static void ListingBuckets()
        {
            try
            {
                ListBucketsResponse response = client.ListBuckets();
                foreach (S3Bucket bucket in response.Buckets)
                {
                    Console.WriteLine("You own Bucket with name: {0}", bucket.BucketName);
                }
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null &&
                    (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") ||
                    amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    Console.WriteLine("Please check the provided AWS Credentials.");
                    Console.WriteLine("If you haven't signed up for Amazon S3, please visit http://aws.amazon.com/s3");
                }
                else
                {
                    Console.WriteLine("An Error, number {0}, occurred when listing buckets with the message '{1}", amazonS3Exception.ErrorCode, amazonS3Exception.Message);
                }
            }
        }

        static void CreateABucket()
        {
            try
            {
                PutBucketRequest request = new PutBucketRequest();
                request.BucketName = bucketName;
                client.PutBucket(request);
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null && (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") || amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    Console.WriteLine("Please check the provided AWS Credentials.");
                    Console.WriteLine("If you haven't signed up for Amazon S3, please visit http://aws.amazon.com/s3");
                }
                else
                {
                    Console.WriteLine("An Error, number {0}, occurred when creating a bucket with the message '{1}", amazonS3Exception.ErrorCode, amazonS3Exception.Message);
                }
            }
        }

        static void WritingAnObject()
        {
            try
            {
                // simple object put
                PutObjectRequest request = new PutObjectRequest()
                {
                    ContentBody = "this is a test",
                    BucketName = bucketName,
                    Key = keyName
                };

                PutObjectResponse response = client.PutObject(request);

                // put a more complex object with some metadata and http headers.
                PutObjectRequest titledRequest = new PutObjectRequest()
                {
                    BucketName = bucketName,
                    Key = keyName,
                      ContentBody = "this is a test",
  
                };
                titledRequest.Metadata.Add("title", "the title");

                client.PutObject(titledRequest);
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null &&
                    (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") ||
                    amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    Console.WriteLine("Please check the provided AWS Credentials.");
                    Console.WriteLine("If you haven't signed up for Amazon S3, please visit http://aws.amazon.com/s3");
                }
                else
                {
                    Console.WriteLine("An error occurred with the message '{0}' when writing an object", amazonS3Exception.Message);
                }
            }
        }

        static void ReadingAnObject()
        {
            try
            {
                GetObjectRequest request = new GetObjectRequest()
                {
                    BucketName = bucketName,
                    Key = keyName
                };

                using (GetObjectResponse response = client.GetObject(request))
                {
                    string title = response.Metadata["x-amz-meta-title"];
                    Console.WriteLine("The object's title is {0}", title);
                    string dest = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), keyName);
                    if (!File.Exists(dest))
                    {
                        response.WriteResponseStreamToFile(dest);
                    }
                }
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null &&
                    (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") ||
                    amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    Console.WriteLine("Please check the provided AWS Credentials.");
                    Console.WriteLine("If you haven't signed up for Amazon S3, please visit http://aws.amazon.com/s3");
                }
                else
                {
                    Console.WriteLine("An error occurred with the message '{0}' when reading an object", amazonS3Exception.Message);
                }
            }
        }

        static void DeletingAnObject()
        {
            try
            {
                DeleteObjectRequest request = new DeleteObjectRequest()
                {
                    BucketName = bucketName,
                    Key = keyName
                };

                client.DeleteObject(request);
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null &&
                    (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") ||
                    amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    Console.WriteLine("Please check the provided AWS Credentials.");
                    Console.WriteLine("If you haven't signed up for Amazon S3, please visit http://aws.amazon.com/s3");
                }
                else
                {
                    Console.WriteLine("An error occurred with the message '{0}' when deleting an object", amazonS3Exception.Message);
                }
            }
        }

        static void ListingObjects()
        {
            try
            {
                ListObjectsRequest request = new ListObjectsRequest();
                request.BucketName = bucketName;
                ListObjectsResponse response = client.ListObjects(request);
                foreach (S3Object entry in response.S3Objects)
                {
                    Console.WriteLine("key = {0} size = {1}", entry.Key, entry.Size);
                }

                // list only things starting with "foo"
                request.Prefix = "foo";
                response = client.ListObjects(request);
                foreach (S3Object entry in response.S3Objects)
                {
                    Console.WriteLine("key = {0} size = {1}", entry.Key, entry.Size);
                }

                // list only things that come after "bar" alphabetically
                request.Prefix = null;
                request.Marker = "bar";
                response = client.ListObjects(request);
                foreach (S3Object entry in response.S3Objects)
                {
                    Console.WriteLine("key = {0} size = {1}", entry.Key, entry.Size);
                }

                // only list 3 things
                request.Prefix = null;
                request.Marker = null;
                request.MaxKeys = 3;
                response = client.ListObjects(request);
                foreach (S3Object entry in response.S3Objects)
                {
                    Console.WriteLine("key = {0} size = {1}", entry.Key, entry.Size);
                }
            }
            catch (AmazonS3Exception amazonS3Exception)
            {
                if (amazonS3Exception.ErrorCode != null && (amazonS3Exception.ErrorCode.Equals("InvalidAccessKeyId") || amazonS3Exception.ErrorCode.Equals("InvalidSecurity")))
                {
                    Console.WriteLine("Please check the provided AWS Credentials.");
                    Console.WriteLine("If you haven't signed up for Amazon S3, please visit http://aws.amazon.com/s3");
                }
                else
                {
                    Console.WriteLine("An error occurred with the message '{0}' when listing objects", amazonS3Exception.Message);
                }
            }
        }

        /// <summary>
        /// 生成签名（带自定义查询字符串）
        /// @wHaibo
        /// </summary>
        /// <param name="bucketName"></param>
        /// <param name="fileKey"></param>
        /// <param name="qs"></param>
        /// <param name="expires"></param>
        /// <returns></returns>
        static string SignURL(string bucketName, string fileKey, NameValueCollection qs, TimeSpan expires)
        {
            Amazon.Runtime.BasicAWSCredentials cred = new Amazon.Runtime.BasicAWSCredentials(strAccessKey, strSecretKey);
            Amazon.RegionEndpoint endpoint = Amazon.RegionEndpoint.CNNorth1;
            //Amazon.RegionEndpoint endpoint = Amazon.RegionEndpoint.APNortheast1;
            string host = endpoint.GetEndpointForService(bucketName + ".s3").Hostname;

            string method = "GET";
            string fk = fileKey.Replace("/", "_XXXX_");
            string uri = "/" + System.Uri.EscapeDataString(fk);
            uri = uri.Replace("_XXXX_", "/");
            Console.WriteLine(uri);

            DateTime dt = DateTime.Now.ToUniversalTime();
            string algorithm = "AWS4-HMAC-SHA256";
            string amz_date = dt.ToString("yyyyMMddTHHmmss") + "Z";
            string datestamp = dt.ToString("yyyyMMdd");
            string credential_scope = datestamp + "/" + endpoint.SystemName + "/s3/" + "aws4_request";

            NameValueCollection queryString = new NameValueCollection();
            if (qs != null && qs.Count > 0)
            {
                queryString.Add(qs);
            }
            queryString.Add("X-Amz-Algorithm", algorithm);
            queryString.Add("X-Amz-Credential", String.Format("{0}/{1}",
                strAccessKey, credential_scope));
            queryString.Add("X-Amz-Date", amz_date);
            queryString.Add("X-Amz-Expires", Math.Round(expires.TotalSeconds, 0).ToString());
            queryString.Add("X-Amz-SignedHeaders", "host");

            List<String> kl = queryString.AllKeys.OrderBy(x => new StringAsciiCompare(WebUtility.UrlEncode(x))).ToList();
            StringBuilder sb = new StringBuilder();
            foreach (string k in kl)
            {
                if (sb.Length > 0)
                {
                    sb.Append("&");
                }
                sb.Append(WebUtility.UrlEncode(k)).Append("=");
                if (!String.IsNullOrEmpty(queryString[k]))
                {
                    sb.Append(WebUtility.UrlEncode(queryString[k]));
                }
            }


            string canonical_headers = "host:" + host + '\n';
            string signed_headers = "host";
            string canonical_request = method + '\n' + uri + '\n' + sb.ToString() + '\n' + canonical_headers + '\n' + signed_headers + '\n' + "UNSIGNED-PAYLOAD";
            Console.WriteLine(canonical_request);
            string string_to_sign = algorithm + '\n' + amz_date + '\n' + credential_scope + '\n' + sha256(canonical_request);



            byte[] signing_key = getSignatureKey(strSecretKey, datestamp, endpoint.SystemName, "s3");

            string signature = BitConverter.ToString(HmacSHA256(string_to_sign, signing_key)).Replace("-", "").ToLower();


            string url = "http://" + host + uri + "?" + sb.ToString() + "&X-Amz-Signature=" + signature;

            return url;
        }


        class StringAsciiCompare : IComparable
        {
            byte[] strBytes = null;
            public StringAsciiCompare(string str)
            {
                strBytes = Encoding.ASCII.GetBytes(str);
            }

            #region IComparable 成员

            public int CompareTo(object obj)
            {
                StringAsciiCompare b = obj as StringAsciiCompare;
                for (int i = 0; i < strBytes.Length; i++)
                {
                    if (i >= b.strBytes.Length)
                    {
                        return 1;
                    }
                    else
                    {
                        if (strBytes[i] == b.strBytes[i])
                        {
                            continue;
                        }
                        else
                        {
                            return strBytes[i] - b.strBytes[i];
                        }
                    }
                }
                return 0;
            }

            #endregion
        }

        static string sha256(string str)
        {
            SHA256 sha256 = new SHA256CryptoServiceProvider();

            byte[] source = Encoding.UTF8.GetBytes(str);

            byte[] crypto = sha256.ComputeHash(source);

            return BitConverter.ToString(crypto).Replace("-", "").ToLower();

        }

        static byte[] HmacSHA256(String data, byte[] key)
        {
            String algorithm = "HmacSHA256";
            KeyedHashAlgorithm kha = KeyedHashAlgorithm.Create(algorithm);
            kha.Key = key;

            return kha.ComputeHash(Encoding.UTF8.GetBytes(data));
        }

        static byte[] getSignatureKey(String key, String dateStamp, String regionName, String serviceName)
        {
            byte[] kSecret = Encoding.UTF8.GetBytes(("AWS4" + key).ToCharArray());
            byte[] kDate = HmacSHA256(dateStamp, kSecret);
            byte[] kRegion = HmacSHA256(regionName, kDate);
            byte[] kService = HmacSHA256(serviceName, kRegion);
            byte[] kSigning = HmacSHA256("aws4_request", kService);

            return kSigning;
        }
    }
}