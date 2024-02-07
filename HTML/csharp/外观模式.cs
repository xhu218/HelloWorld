using System.IO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Timers;
using System.Web.Script.Serialization;



namespace ConsoleApplication29
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("start....");

            Facade facade = new Facade();
            
            facade.MethodA();
            facade.MethodB();

            Console.WriteLine("end.....");

            Console.ReadKey();
        }
    }
}

class SubSystemOne{
    public void MethodOne(){
        Console.WriteLine("子系统方法一");
    }
}

class SubSystemTwo{
    public void MethodTwo(){
        Console.WriteLine("子系统方法二");
    }
}

class SubSystemThree{
    public void MethodThree(){
        Console.WriteLine("子系统方法三");
    }
}

class SubSystemFour{
    public void MethodFour(){
        Console.WriteLine("子系统方法四");
    }
}

class Facade{
    SubSystemOne one;
    SubSystemTwo two;
    SubSystemThree three;
    SubSystemFour four;

    public Facade(){
        this.one = new SubSystemOne();
        this.two = new SubSystemTwo();
        this.three = new SubSystemThree();
        this.four = new SubSystemFour();
    }

    public void MethodA(){
        Console.WriteLine("\n方法组A()-----------");
        one.MethodOne();
        two.MethodTwo();
        four.MethodFour();
    }

    public void MethodB(){
        Console.WriteLine("方法组b()-----------------");
        two.MethodTwo();
        three.MethodThree();
    }
}