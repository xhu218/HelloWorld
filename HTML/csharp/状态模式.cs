using System.IO;
using System;
namespace Name1
{
	public class A
{
	public static void Main()
	{
		Console.WriteLine("Hello");	
		Work em = new Work();
		em.Hour = 13;
		em.WriteProgram();
	
		Console.ReadLine();
		
	}	
}

public abstract class State
{
	public abstract void WriteProgram(Work work);
}


public class ForenoonState: State
{
	public override void WriteProgram(Work work)
	{
		if(work.Hour<12)
		{
			Console.WriteLine("当前时间 ：{0}点，上午工作，精神百倍",work.Hour);
		}
		else 
		{
			//Console.WriteLine("we should do something");
			work.SetState(new NoonState());
			work.WriteProgram();			
		}
	}
}

public class NoonState:State
{
	public override void WriteProgram(Work work)
	{
		if(work.Hour<13)
		{
			Console.WriteLine("现在是中午，可以休息一下");
		}
		else {
			Console.WriteLine("1111111111");
			//work.SetState("")
		}
	}
}

public class Work
{
	private State current;
	public Work()
	{
		current = new ForenoonState();
	}

	private double hour;

	public double Hour
	{
		get{
			return hour;
		}
		set{
			hour = value;
		}
	}

	public void SetState(State s)
	{
		current = s ;
	}

	public void WriteProgram()
	{
		current.WriteProgram(this);
	}
}
}
