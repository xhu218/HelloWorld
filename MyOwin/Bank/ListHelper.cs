using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bank
{
    class ListHelper
    {
        public String Input { get; set; }

        public List<List<char>> list { get; set; }

        public ListHelper()
        {
            list = new List<List<char>>();
        }

        public void  Process(String input)
        {
           
            if (String.IsNullOrEmpty(input))
                return;

            char current = 'a';
            for (var index = 0; index < input.Length; index++)
            {
                if (index == 0)
                {
                    List<char> lst = new List<char>();
                    lst.Add(input[index]);
                    list.Add(lst);
                }
                else
                {
                    if (input[index] == current)
                    {
                        list[list.Count - 1].Add(input[index]);
                    }
                    else
                    {
                        List<char> lst = new List<char>();
                        lst.Add(input[index]);
                        list.Add(lst); 
                    }
                }
                current = input[index];
            }         

        }

        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < list.Count; i++)
            {
                for (int j = 0; j < list[i].Count; j++)
                {
                    sb.AppendFormat("{0} \t", list[i][j]);
                }
                sb.AppendLine();

            }
            return sb.ToString();
        }
    }
}
