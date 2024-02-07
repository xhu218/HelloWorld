
using System;
public class A{
    public static void Main(){
        Console.WriteLine("start...");

        SchoolGirl mm = new SchoolGirl();
        mm.Name = "李娇妖";
        Proxy proxy = new Proxy(mm);

        proxy.GiveDolls();
        proxy.GiveFlowers();
        proxy.GiveChocolate();

        Console.WriteLine("end...");

        Console.ReadKey();
    }
}
interface IGiveGift{
    void GiveDolls();
    void GiveFlowers();
    void GiveChocolate();
}

class Pursuit:IGiveGift{
    SchoolGirl mm;
    public Pursuit(SchoolGirl mm){
        this.mm = mm;
    }

    public void GiveDolls(){
        Console.WriteLine(mm.Name + "送你洋娃娃");
    }

    public void GiveFlowers(){
        Console.WriteLine(mm.Name+"送您花");
    }

    public void GiveChocolate(){
        Console.WriteLine(mm.Name + "送你巧克力");
    }
}

public class Proxy:IGiveGift{
    Pursuit gg;

    public Proxy(SchoolGirl mm){
        gg = new Pursuit(mm);
    }

    public void GiveDolls(){
        gg.GiveDolls();
    }

    public void GiveFlowers(){
        gg.GiveFlowers();
    }

    public void GiveChocolate(){
        gg.GiveChocolate();
    }
}

public class SchoolGirl{
    public String Name{
        get;
        set;
    }
}
