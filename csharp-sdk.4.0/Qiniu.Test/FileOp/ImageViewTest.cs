using System;
using Qiniu.FileOp;
using Qiniu.RS;
using NUnit.Framework;

namespace Qiniu.Test.FileOp
{
    
    
    /// <summary>
    ///这是 ImageViewTest 的测试类，旨在
    ///包含所有 ImageViewTest 单元测试
    ///</summary>
    [TestFixture]
    public class ImageViewTest:QiniuTestBase
    {
        /// <summary>
        ///MakeRequest 的测试
        ///</summary>
        [Test]
        public void MakeRequestTest()
        {
            ImageView target = new ImageView { Mode = 0, Width = 200, Height = 200, Quality = 90, Format = "gif" }; // TODO: 初始化为适当的值
            string url = FileOpUrl; // TODO: 初始化为适当的值
            string actual;
            actual = target.MakeRequest(url);
            //System.Diagnostics.Process.Start(actual);
            Assert.IsTrue(!string.IsNullOrEmpty(actual), "ImageViewTest MakeRequestTest Failure");
           
        }
        [Test]
        public void MakeImagePreview()
        {
            ImageView target = new ImageView { Mode = 0, Width = 200, Height = 200, Quality = 90, Format = "gif" }; // TODO: 初始化为适当的值
            string url = FileOpUrl; // TODO: 初始化为适当的值
            string actual;
            actual = target.MakeRequest("http://7xko1a.media1.z0.glb.clouddn.com/IMG_20151212_102038.jpg");

            //http://7xko1a.media1.z0.glb.clouddn.com/IMG_20151212_102038.jpg?attname=&e=1450241115&token=5zICAtLUtlGbbMfDB2ucQ9OxyO3zwQTG6I5do11P:2KUXvCVuYFyTkKyhFEGQdEid1fU

            String imageUrl = GetPolicy.MakeRequest(actual);
            System.Diagnostics.Process.Start(imageUrl);
            Assert.IsTrue(!string.IsNullOrEmpty(actual), "ImageViewTest MakeRequestTest Failure");

        }
        [Test]
        public void MakeVideoInfo()
        {
            Video target = new Video();
            String url = "http://7xko1a.media1.z0.glb.clouddn.com/orignal.mp4";
            String url1 = target.MakeRequest(url);
            String url2 = GetPolicy.MakeRequest(url1);
            System.Diagnostics.Process.Start(url2);
            Assert.IsTrue(!String.IsNullOrEmpty(url2), "video test failed");
        }
    }
}
