using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.InteropServices;

namespace MyCSharpProgram
{

    class Program
    {
        [DllImport(@"E:\Projects\MyCProgram\Debug\MyCProgram.dll",CharSet = CharSet.Unicode, CallingConvention= CallingConvention.StdCall)]
        public static extern void Say(IntPtr ptr, int nLen);


        [DllImport(@"E:\Projects\MyCProgram\Debug\MyCProgram.dll", CharSet = CharSet.Unicode, CallingConvention = CallingConvention.StdCall)]
        public static extern float Sum(float fNum1, float fNum2);

        [DllImport(@"E:\Projects\MyCProgram\Debug\MyCProgram.dll", CharSet = CharSet.Unicode, CallingConvention = CallingConvention.StdCall)]
        public static extern bool Test1(int a, IntPtr b, String c,int length);


        static void Main(string[] args)
        {
            String name = new String('a', 100);

            IntPtr p1 = Marshal.StringToHGlobalAnsi(name);
            Console.ReadLine();
            Say(p1, 3);

            float c = Sum(1.1F, 2.2F);

            OBJECT_SUMMARY dd = new OBJECT_SUMMARY
            {
                strInstanceID = "1",
                strObjectCategory = "2",
                strObjectName = "3",
                strSrcAKGroup = "4",
                nFileNumber = 0,
            };
            OBJECT_SUMMARY dd1 = new OBJECT_SUMMARY
            {
                strInstanceID = "1",
                strObjectCategory = "2",
                strObjectName = "3",
                strSrcAKGroup = "4",
                nFileNumber = 0,
            };

            OBJECT_SUMMARY[] dd2 = new OBJECT_SUMMARY[] { dd, dd1 };


            IntPtr input = Marshal.AllocHGlobal(Marshal.SizeOf(typeof(OBJECT_SUMMARY))*2);
            Marshal.StructureToPtr(dd, input, false);
            Marshal.StructureToPtr(dd1, (IntPtr)( (long)input + Marshal.SizeOf(typeof(OBJECT_SUMMARY))), false);
         

            Test1(100, input, "wfg",2);

            Console.ReadLine();
        }
    }

    public struct OBJECT_SUMMARY
    {
        public String strSrcAKGroup;
        public String strObjectName;
        public String strObjectCategory;
        public String strInstanceID;
        public int nFileNumber;

      
    }
}
