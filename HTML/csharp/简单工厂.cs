using System.IO;
using System;
public class A{
    public static void Main()
    {
        Console.WriteLine("start....");

        Operation add = new OperationAdd();
        add.NumberA = 100;
        add.NumberB = 200;
        Console.WriteLine(add.GetResult());

        Operation sub = new OperationSubstract();
        sub.NumberA = 200;
        sub.NumberB = 100;
        Console.WriteLine(sub.GetResult());

        Operation op1 = OperationFactory.createOperation("+");
        Operation op2 = OperationFactory.createOperation("-");

        op1.NumberA = 1;
        op1.NumberB = 2;

        op2.NumberA = 1;
        op2.NumberB = 2;

        Console.WriteLine(op1.GetResult());
        Console.WriteLine(op2.GetResult());

        Console.WriteLine("end....");


        Console.ReadLine();
    }
}

public class OperationFactory
{
    public static Operation createOperation(String operate)
    {
        
        switch (operate)
        {
            case "+":
                return new OperationAdd();
                break;
            case "-":
                return new OperationSubstract();
                break;
            default:
                return null;
        }
    }
}

public abstract class Operation
{
    private int numberA;
    public int NumberA{
        get{
            return numberA;
        }
        set{
            numberA = value;
        }
    }

    private int numberB;
    public int NumberB{
        get{
            return numberB;
        }
        set{
            numberB = value;
        }
    }

    public abstract int GetResult();
}

public class OperationAdd : Operation
{
    public override  int GetResult()
    {
        return this.NumberA + this.NumberB;
    }
}

public class OperationSubstract : Operation
{
    public override int GetResult()
    {
        return this.NumberA - this.NumberB;
    }
}