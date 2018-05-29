using System;
using System.Collections.Generic;
using System.Text;

namespace Bank
{
    class ListHelper
    {
        public String _Input { get; set; }


        public List<List<char>> _ListOrg { get; set; }

        public List<List<char>> _List21 { get; set; }

        public List<List<char>> _List32 { get; set; }

        public List<List<char>> _List43 { get; set; }

        private List<List<char>> _ListText { get; set; }

        public String _Last3Word { get; set; }

        public ListHelper() { }

        public ListHelper(String input)
        {

            _Input = input;
            _ListOrg = new List<List<char>>();
            _List21 = new List<List<char>>();
            _List32 = new List<List<char>>();
            _List43 = new List<List<char>>();

            _ListText = new List<List<char>>();
        }

        public void ProcessMain()
        {
            Process(this._Input, _ListOrg);
            Process1(this._List21, 1, 1);
            Process1(this._List32, 2, 2);
            Process1(this._List43, 3, 3);
            ProcessText();
            ProcessFeature();

        }

        private void ProcessFeature()
        {
            if(  ((_Input.Length-1) % 4 == 0) && _Input.Length>1 )
            {
                int length = _Input.Length;
                _Last3Word = _Input[length - 4].ToString() + _Input[length - 3].ToString() + _Input[length - 2].ToString();
            }
        }

        private void ProcessText()
        {
            if (String.IsNullOrEmpty(_Input))
                return;

            for (int i = 0; i < Math.Ceiling(_Input.Length / 4d); i++)
            {
                _ListText.Add(new List<char>());
            }

            for (int i = 0; i < _Input.Length; i++)
            {
                _ListText[(i / 4)].Add(_Input[i]);

            }

        }

        private void Process(String inputString, List<List<char>> outList)
        {
            if (String.IsNullOrEmpty(inputString))
                return;

            char current = 'a';
            for (var index = 0; index < inputString.Length; index++)
            {
                if (index == 0)
                {
                    List<char> lst = new List<char>();
                    lst.Add(inputString[index]);
                    outList.Add(lst);
                }
                else
                {
                    if (inputString[index] == current)
                    {
                        outList[outList.Count - 1].Add(inputString[index]);
                    }
                    else
                    {
                        List<char> lst = new List<char>();
                        lst.Add(inputString[index]);
                        outList.Add(lst);
                    }
                }
                current = inputString[index];
            }
        }

        private void Process1(List<List<char>> list1, int start, int interval)
        {

            //start = 1   interval = 1
            //start = 2   interval = 2
            //start = 3   interval = 3

            //1是绿色
            //2是红色
            StringBuilder sb = new StringBuilder();

            if (start <= _ListOrg.Count - 1)
                for (int i = start; i < _ListOrg.Count; i++)
                {
                    if (i == start)
                    {
                        if (_ListOrg[i].Count == _ListOrg[i - interval].Count)
                        {
                            //因为第一个数据不比较
                            sb.Append('2', _ListOrg[i].Count - 1);
                        }
                        else
                        {
                            int min = Math.Min(_ListOrg[i].Count, _ListOrg[i - interval].Count);
                            sb.Append('2', min - 1);

                            int v = _ListOrg[i].Count - _ListOrg[i - interval].Count;
                            if (v > 0)
                            {
                                for (int j = 0; j < v; j++)
                                {
                                    if (j == 0)
                                        sb.Append('1');
                                    else
                                        sb.Append('2');
                                }

                            }
                        }
                    }
                    else if (i > start)
                    {
                        if (_ListOrg[i - 1].Count == _ListOrg[i - interval - 1].Count)
                        {
                            //齐脚跳
                            sb.Append('2');
                        }
                        else
                        {
                            //突脚跳
                            sb.Append('1');
                        }


                        int min = Math.Min(_ListOrg[i].Count, _ListOrg[i - interval].Count);
                        sb.Append('2', min - 1);

                        int v = _ListOrg[i].Count - _ListOrg[i - interval].Count;
                        if (v > 0)
                        {
                            for (int j = 0; j < v; j++)
                            {
                                if (j == 0)
                                    sb.Append('1');
                                else
                                    sb.Append('2');
                            }
                        }

                    }
                }


            Process(sb.ToString(), list1);



        }


        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < _ListText.Count; i++)
            {
                sb.AppendFormat("第 {0} 行 \t", i + 1);
                for (int j = 0; j < _ListText[i].Count; j++)
                {
                    sb.AppendFormat("{0} ", _ListText[i][j]);
                }
                var same = 0;
                if (i != 0)
                {
                   
                    for (int j = 0; j < _ListText[i].Count; j++)
                    {
                        if (_ListText[i][j] == _ListText[i - 1][j])
                        {
                            same++;
                        }
                    }
                    sb.AppendFormat("\t 共 {0}  个相同", same);

                }
                sb.AppendLine();


            }
            return sb.ToString();
        }


    }
}