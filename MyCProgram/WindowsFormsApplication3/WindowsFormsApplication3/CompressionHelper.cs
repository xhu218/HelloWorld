using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.IO.Packaging;
using System.Diagnostics;

namespace WindowsFormsApplication3
{
    public class CompressionHelper
    {
        private String TargetFile = null;
        private string source = null;
        public event NotifyCompressProgress NotifyCompressProgress;

        private static Object objFile = new Object();


        /// <summary>
        /// 参数提供压缩文件名
        /// </summary>
        public CompressionHelper(string targetFile)
        {
            this.TargetFile = targetFile;
        }

        public CompressionHelper(string targetFile, string source)
        {
            this.TargetFile = targetFile;
            this.source = source;
        }

        /// <summary>
        /// 根目录 和 要压缩的文件  
        /// 这个方法用于：sonaps日志和sony日志。因为这两类日志很可能检查
        /// </summary>
        public void CompressFile(string sourcFile)
        {
            lock (objFile)
            {
                Package package = null;
                try
                {
                    //防止此文件线程同步
                    package = Package.Open(TargetFile, System.IO.FileMode.OpenOrCreate);
                    if (System.IO.File.Exists(sourcFile))
                    {
                        Compress(null,new FileInfo(sourcFile), package);
                    }
                }
                catch (Exception ex)
                {
                    Trace.TraceError(ex.ToString());
                }
                finally
                {
                    try
                    {
                        if (package != null)
                            package.Close();
                    }
                    catch
                    { }
                }
            }
        }

        /// <summary>
        /// 压缩字符流
        /// </summary>
        public void CompressStream(Stream stream, string fileName)
        {
            lock (TargetFile)
            {
                Package package = null;
                try
                {
                    //防止此文件线程同步
                    package = Package.Open(TargetFile, System.IO.FileMode.OpenOrCreate);
                    PackagePart part = package.CreatePart(PackUriHelper.CreatePartUri(new Uri(fileName, UriKind.Relative)), System.Net.Mime.MediaTypeNames.Application.Zip);
                    Stream zipStream = part.GetStream();
                    CopyStream(stream, stream);
                    zipStream.Close();
                }
                catch (Exception ex)
                {
                    Trace.TraceError(ex.ToString());
                }
                finally
                {
                    try
                    {
                        if (package != null)
                            package.Close();
                    }
                    catch
                    { }
                }
            }
        }

        /// <summary>
        /// 根目录 和 要压缩的文件
        /// </summary>
        public void CompressFile(string[] sourcFiles)
        {
            lock (TargetFile)
            {
                Package package = null;
                try
                {
                    package = Package.Open(TargetFile, System.IO.FileMode.OpenOrCreate);
                    foreach (string str in sourcFiles)
                    {
                        if (System.IO.File.Exists(str))
                            Compress(null,new FileInfo(str), package);
                    }
                }
                catch (Exception ex)
                {
                    Trace.TraceError(ex.ToString());
                }
                finally
                {
                    try
                    {
                        if (package != null)
                            package.Close();
                    }
                    catch
                    { }
                }
            }
        }

        /// <summary>
        /// 根目录 和 要压缩的目录
        /// </summary>
        public void CompressSubDirectory(string[] dirs)
        {
            this.source = dirs[0].ToString();
            lock (TargetFile)
            {
                Package package = null;
                try
                {
                    ulong fileTotalLength = 0;
                    foreach (string dir in dirs)
                    {
                        String[] files = System.IO.Directory.GetFiles(dir, "*.*", SearchOption.AllDirectories);
                        if (files != null && files.Length > 0)
                        {
                            foreach (var file in files)
                            {
                                FileInfo fileInfo = new FileInfo(file);
                                fileTotalLength += (ulong)fileInfo.Length;
                            }
                        }

                    }
                    package = Package.Open(TargetFile, System.IO.FileMode.OpenOrCreate);
                    if (package != null)
                    {
                        ulong compressesSumCounter = 0;
                        foreach (string dir in dirs)
                        {
                            System.IO.DirectoryInfo di = new DirectoryInfo(dir);
                            CompressDir(ref compressesSumCounter, fileTotalLength, di, package);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Trace.TraceError(ex.ToString());
                }
                finally
                {
                    try
                    {
                        if (package != null)
                            package.Close();
                    }
                    catch
                    { }
                }
            }
        }

        /// <summary>
        /// 压缩目录
        /// </summary>
        /// <param name="compressesCounter">已经压缩的文件个数</param>
        /// <param name="fileSumCounter">总共要压缩的文件个数</param>
        /// <param name="di">要压缩的目录</param>
        private void CompressDir(ref ulong compressFileLength, ulong totalFileLength, System.IO.DirectoryInfo di, Package package)
        {
            int courrentProgress = 0;
            int tempProcess = 0;
            foreach (FileInfo fileInfo in di.GetFiles("*.*", SearchOption.AllDirectories))
            {
                Compress(di,fileInfo, package);

                if (this.NotifyCompressProgress != null)
                {

                    compressFileLength += (ulong)fileInfo.Length;

                    tempProcess = Convert.ToInt32(Math.Floor(((decimal)compressFileLength / (decimal)totalFileLength) * 100));

                    if ((totalFileLength - compressFileLength) == 0)
                    {
                        this.NotifyCompressProgress(tempProcess, String.Format("{0}.zip",this.source), CompressStatus.Finished);
                    }
                    else
                    {
                        if (tempProcess != courrentProgress)
                        {
                            courrentProgress = tempProcess;
                            this.NotifyCompressProgress(courrentProgress, String.Format("{0}.zip", this.source), CompressStatus.Compressing);
                        }
                    }
                }
            }
        }

        private void Compress(System.IO.DirectoryInfo di,FileInfo fi, Package package)
        {
            Stream stream = null;
            FileStream fs = null;
            try
            {
                string fileFullName = fi.FullName;
                String relativePath = GetRelativePath( di, fileFullName);
                if (!string.IsNullOrEmpty(relativePath))
                {
                    //HttpUtility.UrlEncode(

                    Uri uri = PackUriHelper.CreatePartUri(new Uri(relativePath, UriKind.Relative));
                    PackagePart part = package.CreatePart(uri, System.Net.Mime.MediaTypeNames.Application.Zip, CompressionOption.Maximum);
                    stream = part.GetStream();
                    fs = fi.Open(FileMode.Open, FileAccess.Read, FileShare.Read);
                    CopyStream(fs, stream);
                    stream.Close();
                }
            }
            catch (Exception ex)
            {
                Trace.TraceError(ex.ToString());
            }
            finally
            {
                try
                {
                    if (fs != null)
                        fs.Dispose();

                    if (stream != null)
                        stream.Dispose();
                }
                catch
                { }
            }
        }

        private String GetRelativePath(System.IO.DirectoryInfo di,string fileFullName)
        {
            String relativePath = string.Empty;
            if (!string.IsNullOrEmpty(fileFullName))
            {
               
                //if (fileFullName.StartsWith(AppDomain.CurrentDomain.BaseDirectory))
                //{
                //    if (fileName.Contains(":"))
                //    {
                //        fileName = fileName.Substring(fileName.IndexOf(':') + 2, fileName.Length - fileName.IndexOf(':') - 2);
                //    }
                //    relativePath = fileName;
                //}
                //else
                //{
                //    if (fileFullName.Contains(":"))
                //    {
                //        fileFullName = fileFullName.Substring(fileFullName.IndexOf(':') + 2, fileFullName.Length - fileFullName.IndexOf(':') - 2);
                //    }
                //    relativePath = fileFullName;
                //}
                if (di != null)
                {
                    relativePath = fileFullName.Replace(di.FullName, "");
                }
                else
                {
                    FileInfo fileInfo = new FileInfo(fileFullName);
                    string fileName = fileInfo.Name;

                    relativePath = fileName;
                }


                relativePath = relativePath.Replace("\\", "/");
                if (relativePath.StartsWith("/"))
                    relativePath = relativePath.Remove(0, 1);

            }
            return relativePath;
        }

        private void CopyStream(Stream source, Stream target)
        {
            try
            {
                const int bufSize = 0x1000;
                byte[] buf = new byte[bufSize];
                int bytesRead = 0;
                while ((bytesRead = source.Read(buf, 0, bufSize)) > 0)
                {
                    target.Write(buf, 0, bytesRead);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

    public delegate void NotifyCompressProgress(int progress, string source, CompressStatus uploadStatus);
    public enum CompressStatus
    {
        Compressing, Finished
    }
}
