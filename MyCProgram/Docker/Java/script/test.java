package script;
import java.util.Random;
public class test
{
    public static void main(String []args)
    {
		int max=1000;
		int min=1;
		Random random = new Random();

		int lessthan500 = 0;
		int morethan500 = 0;
		
		for(int index = 0;index<Integer.MAX_VALUE;index++)
		{
			int s = random.nextInt(max)%(max-min+1) + min;
			if(s<500)
			{
				lessthan500++;
			}
			else
			{
				morethan500++;
			}
			//System.out.println(s);
			if(index % 1000 == 0 )
				System.out.println(index / 1000);
			
		}
		System.out.println("lessthan500:   " +lessthan500 + "    morethan500:   "+morethan500);
		
    }
}

