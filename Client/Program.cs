using Client.Playout;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Client
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {

                Playout.PlayoutClient client = new Playout.PlayoutClient();

                StudioType[] st;
                ErrorType[] etError = client.GetStudioList(new FilterGroupType
                {
                    Operator = FilterGroupTypeOperator.AND,
                    Items = new object[]{
                    new AttributeConditionType{ 
                        Condition= ConditionType.NOT_EQUALS, 
                        Attribute=new AttributeType{ 
                            Name="StudioName",
                            Value=Guid.NewGuid().ToString()
                        }
                    }
                }
                }, out st);

                foreach (var s in st)
                {
                    Console.WriteLine(String.Format("{0}\t{1}\t{2}", s.StudioID, s.StudioMosID, s.Name));
                }

                Console.WriteLine("please input a key to close the program");
                Console.ReadLine();

            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString());
            }

        }
    }
}
