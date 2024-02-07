using System;
public class A{
    public static void Main(){
        Console.WriteLine("start...");

        AbstractClass a = new ConcreteClassA();
        AbstractClass b = new ConcreteClassB();

        a.TemplateMethod();
        b.TemplateMethod();

        Console.WriteLine("end...");
        Console.ReadKey();
    }
}



abstract class AbstractClass{
    public abstract void PrimitiveOperation1();
    public abstract void PrimitiveOperation2();

    public void TemplateMethod(){
        PrimitiveOperation1();
        PrimitiveOperation2();
        Console.WriteLine("");
    }
}

 class ConcreteClassA:AbstractClass{
    public override void  PrimitiveOperation1(){
        Console.WriteLine("具体类A实现方法1");
    }

    public override void  PrimitiveOperation2(){
        Console.WriteLine("具体类A实现方法2");
    }
}

 class ConcreteClassB:AbstractClass{
    public override void  PrimitiveOperation1(){
        Console.WriteLine("具体类B实现方法1");
    }

    public override void  PrimitiveOperation2(){
        Console.WriteLine("具体类B实现方法2");
    }
}