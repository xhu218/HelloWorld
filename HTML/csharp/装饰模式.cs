using System;
using System.IO;

public class A{
    public static void Main(){
        Console.WriteLine("start...");

        Person wfg = new Person();
        wfg.Name = "wfg";

        TShirts tshirt = new TShirts();
        BigTrouser bigTrouser = new BigTrouser();

        tshirt.Decorate(wfg);
        bigTrouser.Decorate(tshirt);

        bigTrouser.Show();
        
      

        Console.WriteLine("end...");
        Console.ReadKey();
    }
}

public class Person
{
    public Person(){

    }

    private String name;
    public String Name{
        get{
            return name;
        }
        set{
            name = value;
        }
    }

    public virtual void Show(){
        Console.WriteLine(this.Name +" 穿衣服了");
    }
    
}

public class Finery : Person
{
    private Person commpont;
    /*
    public Finery(Person person){
        commpont = person;
    }
    */

    public void Decorate(Person commpont){
        this.commpont = commpont;
    }

    public override void Show()
    {
        if(commpont!=null)
        commpont.Show();
    }
}

public class TShirts : Finery{
    public override void Show(){
        Console.WriteLine("我穿的tshirt");
        base.Show();
    }
}

public class BigTrouser : Finery{
    public override void Show(){
        Console.WriteLine("我穿的垮裤");
        base.Show();
    }
}
