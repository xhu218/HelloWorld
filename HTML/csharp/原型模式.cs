using System;
public class A{
    public static void Main(){

        Console.WriteLine("start...");

        Resume a = new Resume("大鸟");
        a.SetPersonInfo("男","29");
        a.SetWorkExperience("1998-2000","xxx公司");

        Resume b = (Resume)a.Clone();
        b.SetWorkExperience("1998-2006","yy企业");

        Resume c = (Resume)a.Clone();
        c.SetPersonInfo("男","24");

        a.Display();

        b.Display();

        c.Display();

        Console.WriteLine("end...");
        Console.ReadKey();
    }
}

class WorkExperience:ICloneable
{   
    private String workDate;
    public String WorkDate{
        get{
            return workDate;
        }
        set{
            workDate = value;
        }
    }

    private String company;
    public String Company{
        get{
            return company;
        }
        set{
            company = value;
        }
    }

    public Object Clone(){
        return (Object)this.MemberwiseClone();
    }
    
}


class Resume:ICloneable{
    private String name;
    private String sex;
    private String age;
    private WorkExperience work;

    public Resume(String name){
        this.name = name;
        this.work = new WorkExperience();
    }

    private Resume(WorkExperience work){
        this.work = (WorkExperience)work.Clone();
    }

    public void SetPersonInfo(String sex, String age){
        this.sex = sex;
        this.age = age;
    }

    public void SetWorkExperience(String workDate,String company){
        work.WorkDate = workDate;
        work.Company = company;
    }

    public void Display(){
        Console.WriteLine("{0}{1}{2}",name,sex,age);
        Console.WriteLine("工作经历{0}{1}",work.WorkDate,work.Company);
    }

    public Object Clone(){
        Resume obj = new Resume(this.work);
        obj.name = this.name;
        obj.sex = this.sex;
        obj.age = this.age;
        return obj;
    }

}