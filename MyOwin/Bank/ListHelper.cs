using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bank
{
    class ListHelper
    {
        public String _Input { get; set; }

        private String _Input1 { get; set; }

        public List<List<char>> _List { get; set; }

        public List<List<char>> _List1 { get; set; }

        public ListHelper()
        {
            _List = new List<List<char>>();
            _List1 = new List<List<char>>();
        }

        public void Process(String input, List<List<char>> list)
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

        public void Process1(List<List<char>>list, List<List<char>> list1)
        {
            //1是绿色
            //2是红色
            StringBuilder sb = new StringBuilder();
            if (list.Count < 2)
                return;
            for (int i = 0; i < list.Count; i++)
            {
                if (i == 1)
                {
                    if (list[i].Count == list[i - 1].Count)
                    {
                        //因为第一个数据不比较
                        sb.Append('2', list[i].Count - 1);
                    }
                    else
                    {
                        int min = Math.Min(list[i].Count, list[i - 1].Count);
                        sb.Append('2', min - 1);

                        int v = list[i].Count - list[i - 1].Count;
                        if (v > 0)
                        {
                            for (int j = 0; j < v; j++)
                            {
                                if (i == 0)
                                    sb.Append('1');
                                else
                                    sb.Append('2');
                            }
                            
                        }
                    }
                }
                else if(i>1)
                {
                    if (list[i - 1].Count == list[i - 2].Count)
                    {
                        //齐脚跳
                        sb.Append('2');
                    }
                    else
                    {
                        //突脚跳
                        sb.Append('1');
                    }


                    int min = Math.Min(list[i].Count, list[i - 1].Count);
                    sb.Append('2', min - 1);

                    int v = list[i].Count - list[i - 1].Count;
                    if (v > 0)
                    {
                        for (int j = 0; j < v; j++)
                        {
                            if (i == 0)
                                sb.Append('1');
                            else
                                sb.Append('2');
                        }
                    }

                }
            }

            _Input1 = sb.ToString();
            Process(_Input1, this._List1);


           
        }

       
    }
}
/*
 
    this.panel2.Controls.Clear();

                for (int i = 0; i < list.Count; i++)
                {
                    Panel p = new Panel();

                    for (int j = 0; j < list[i].Count; j++)
                    {
                        Button btn = new Button();
                        btn.Width = 20;
                        btn.Height = 20;
                        btn.Location = new Point(p.Location.X, p.Location.Y + 20 * j);
                    btn.Text = list[i][j].ToString();

                    if ( (i == 1 && j>0 ) || i>1)
                    {
                        if (j < list[i - 1].Count)
                        {
                            if (list[i][j] != list[i - 1][j])
                            {
                                btn.BackColor = Color.Red;
                            }
                        }
                    }
                        //btn.BackColor = color[((int)list[i][j]) % 2];

                        p.Controls.Add(btn);
                    }
                    p.Width = 20;
                    p.Height = 400;
                    p.Location = new Point(this.panel2.Location.X + i * 20, this.panel2.Location.Y);
                    this.panel2.Controls.Add(p);
                }
 
 
 */