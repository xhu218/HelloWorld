using System;
public class A{
    public static void Main(){

        Console.WriteLine("start...");
        UnderGraduateFactory uFactory = new UnderGraduateFactory();
        VolunteerFactory vFactory = new VolunteerFactory();
        LeiFeng lei1 = uFactory.CreateLeiFeng();
        LeiFeng lei2 = vFactory.CreateLeiFeng();

        lei1.Sweep();
        lei1.Wash();
        lei1.BuyRice();
        
        lei2.Sweep();
        lei2.Wash();
        lei2.BuyRice();

        Console.WriteLine("end...");
        Console.ReadKey();



    }
}

class LeiFeng{
    
    public void Sweep(){
        Console.WriteLine("扫地");
    }

    public void Wash(){
        Console.WriteLine("洗碗");
    }

    public void BuyRice(){
        Console.WriteLine("买米");
    }

}

class UnderGraduate:LeiFeng{

}

class Volunteer:LeiFeng{

}

interface IFactory
{
    LeiFeng CreateLeiFeng();
}

 class UnderGraduateFactory:IFactory{
    public LeiFeng CreateLeiFeng(){
        return new UnderGraduate();
    }
}

 class VolunteerFactory:IFactory{
    public LeiFeng CreateLeiFeng(){
        return new Volunteer();
    }
}