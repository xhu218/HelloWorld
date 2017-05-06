using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using UnitTest;

namespace UnitTestProject1
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            Class1 cls = new Class1();
            Assert.IsTrue(cls.sum(1, 2)==3,"不正确哟");
        }

        [TestMethod]
        public void TestMethod2()
        {
            Class1 cls = new Class1();
            Assert.IsTrue(cls.substruct(3, 1) == 2, "不正确");
        }

    }
}
