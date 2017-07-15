using System.IO;
using System;
using System.Collections.Generic;
using System.Collections;
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

            Director director = new Director();

            Builder b1 = new ConcreteBuilder1();
            Builder b2 = new ConcreteBuilder2();

            director.Construct(b1);
            Product p1 = b1.GetResult();
            p1.Show();

            director.Construct(b2);
            Product p2 = b2.GetResult();
            p2.Show();

            Console.WriteLine("end.....");

            Console.ReadKey();
        }
    }
}

class Director{
    public void Construct(Builder builder){
        builder.BuildPartA();
        builder.BuildPartB();
    }
}

abstract class Builder{
    public abstract void BuildPartA();
    public abstract void BuildPartB();
    public abstract Product GetResult();
}

class ConcreteBuilder1:Builder{
    private Product product = new Product();

    public override void BuildPartA(){
        product.Add("部件A");
    }

    public override void BuildPartB(){
        product.Add("部件B");
    }

    public override Product GetResult(){
        return product;
    }
}

class ConcreteBuilder2:Builder{
    private Product product = new Product();

    public override void BuildPartA(){
        product.Add("部件X");

    }

    public override void BuildPartB(){
        product.Add("部件Y");
    }

    public override Product GetResult(){
        return product;
    }
}

class Product{
    IList<String> parts = new List<String>();
    
    public void Add(String part){
        parts.Add(part);

    }

    public void Show(){
        Console.WriteLine("\n产品创建------");
        foreach (var part in parts)
        {
            Console.WriteLine(part);
        }
    }
}