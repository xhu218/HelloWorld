
namespace name1
{
    using System;
    using System.IO;

    public class A{

    public static void Main(){
        Console.WriteLine("start...");

        Context context;

        context = new Context(new ConcreteStrategyA());
        context.ContextInterface();

        context = new Context(new ConcreteStrategyB());
        context.ContextInterface();

        Console.WriteLine("end...");
        Console.ReadLine();
    }
}


    public class Context{

        private Strategy strategy;
        public Context(Strategy strategy){
            this.strategy = strategy;
        }

        public void ContextInterface(){
            strategy.AlgorithmInterface();
        }
    }

    public abstract class Strategy
    {
        public abstract void AlgorithmInterface();
    }

    public class ConcreteStrategyA:Strategy{
        public override void AlgorithmInterface(){
            Console.WriteLine("算法A实现");
        }
    }


    public class ConcreteStrategyB:Strategy{
        public override void AlgorithmInterface(){
            Console.WriteLine("算法B实现");
        }
    }

}

