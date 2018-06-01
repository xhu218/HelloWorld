using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Threading;
using System.Windows.Forms;

namespace Bank
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();

        }


        private void textBox1_TextChanged(object sender, EventArgs e)
        {
            Method(this.textBox1.Text);
        }

        private void Method(String msg)
        {
            ListHelper helper = new ListHelper(msg);

            helper.ProcessMain();

            Draw(this.panel1, helper._ListOrg, 0, "_ListOrg");

            var length21 = ListHelper.GetListLength(helper._List21);
            Draw(this.panel2, helper._List21, helper._Input.Length - length21, "_List21");

            int length32 = ListHelper.GetListLength(helper._List32);
            Draw(this.panel3, helper._List32, helper._Input.Length - length32, "_List32");

            int length43 = ListHelper.GetListLength(helper._List43);
            Draw(this.panel4, helper._List43, helper._Input.Length - length43, "_List43");

            DrawRighText(helper._ListText);

            DrawText(helper._Last3Word);

        }

        private void DrawRighText(List<List<char>> _ListText)
        {
            this.panel5.Controls.Clear();
            var index = 0;
            for (int i = 0; i < _ListText.Count; i++)
            {
                //sb.AppendFormat("第 {0} 行 \t", i + 1);
                Label lab = new Label();
                lab.Text = String.Format("第{0}行", i + 1);
                lab.Font = new System.Drawing.Font("宋体", 16);
                lab.Location =new Point( this.panel5.Location.X,this.panel5.Location.Y + 50 * i);
                this.panel5.Controls.Add(lab);


                for (int j =0 ; j < _ListText[i].Count; j++)
                {
                    //sb.AppendFormat("{0} ", _ListText[i][j]);
                    Label l = new Label();
                    l.Location = new Point( this.panel5.Location.X +100+ j * 50,this.panel5.Location.Y + i * 50);
                    l.Font = new System.Drawing.Font("宋体", 16);
                    l.Width = 30;
                    l.Text = _ListText[i][j].ToString() ;
                    l.Name = String.Format("lbl_{0}", index++);
                    this.panel5.Controls.Add(l);

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
                   // sb.AppendFormat("\t 共 {0}  个相同", same);
                    Label l = new Label();
                    //l.Location.X = this.panel5.Location.X + j * 20;
                    l.Location = new Point(this.panel5.Location.X + 300, this.panel5.Location.Y + i * 50);
                    l.Text = String.Format("共 {0} 个相同", same);
                    l.Font = new System.Drawing.Font("宋体", 16);
                    this.panel5.Controls.Add(l);

                }
                //sb.AppendLine();


            }
        }

        private void DrawText(string p)
        {
            if (String.IsNullOrEmpty(p))
            {

                for (int i = 1; i <= 8; i++)
                {
                    Label lbl = (Label)this.Controls.Find("label" + (i + 1).ToString(), true)[0];
                    lbl.Text = "0";
                }
                return;
            }

            for (int i = 1; i <= 8; i++)
            {
                Button btn = (Button)this.Controls.Find("button" + i.ToString(), true)[0];
                String txt = btn.Text;
                Label lbl = (Label)this.Controls.Find("label" + (i + 1).ToString(), true)[0];

                var same = 0;
                for (int j = 0; j < 3; j++)
                {
                    if (p[j] == txt[j])
                    {
                        same++;
                    }
                }

                lbl.Text = same.ToString();
            }
        }


        private void Draw(Panel panel, List<List<char>> list, int start, string startname)
        {
            Color[] color = new Color[] { Color.Red, Color.Green };


            panel.Controls.Clear();
            for (int i = 0; i < list.Count; i++)
            {

                for (int j = 0; j < list[i].Count; j++)
                {
                    Button btn = new Button();
                    btn.Width = 20;
                    btn.Height = 20;
                    btn.Location = new Point(panel.Location.X + 20 * i, panel.Location.Y + 20 * j);
                    btn.BackColor = color[((int)list[i][j]) % 2];
                    btn.Text = list[i][j].ToString();
                    btn.Name = String.Format("btn{0}_{1}", startname, start++);
                    btn.MouseEnter += btn_MouseEnter;
                    btn.MouseLeave += btn_MouseLeave;
                    panel.Controls.Add(btn);
                }
            }

        }

        void btn_MouseLeave(object sender, EventArgs e)
        {
            Button btn1 = ((Button)sender) as Button;


            String buttonName = ((Button)sender).Name;
            string nameIndex = buttonName.Substring(buttonName.LastIndexOf("_"));


            string[] prefixs = { "btn_ListOrg", "btn_List21", "btn_List32", "btn_List43" };

            for (int i = 0; i < prefixs.Length; i++)
            {
                Control[] cs = this.Controls.Find(String.Format("{0}{1}", prefixs[i], nameIndex), true);
                if (cs != null && cs.Length > 0)
                {
                    Button btn = cs[0] as Button;
                    if (btn != null)
                    {
                        //MessageBox.Show(btn.Name);
                        btn.BackColor = (Color)btn.Tag;
                    }
                }
            }

            Control[] cs1 = this.Controls.Find(String.Format("lbl{0}", nameIndex), true);
            if (cs1 != null && cs1.Length > 0)
            {
                Label lbl = cs1[0] as Label;
                if (lbl != null)
                {

                    lbl.BackColor = (Color)lbl.Tag;
                }
            }
        }

        void btn_MouseEnter(object sender, EventArgs e)
        {
            String buttonName = ((Button)sender).Name;
            string nameIndex = buttonName.Substring(buttonName.LastIndexOf("_"));


            string[] prefixs = { "btn_ListOrg", "btn_List21", "btn_List32", "btn_List43" };

            for (int i = 0; i < prefixs.Length; i++)
            {
                Control [] cs = this.Controls.Find(String.Format("{0}{1}", prefixs[i], nameIndex), true);
                if (cs != null && cs.Length > 0)
                {
                    Button btn = cs[0] as Button;
                    if (btn != null)
                    {
                        //MessageBox.Show(btn.Name);
                        btn.Tag = btn.BackColor;
                        btn.BackColor = Color.Yellow;
                    }
                }
            }

            Control [] cs1 = this.Controls.Find(String.Format("lbl{0}", nameIndex),true);
            if (cs1 != null && cs1.Length > 0)
            {
                Label lbl = cs1[0] as Label;
                if (lbl != null)
                {
                    lbl.Tag = lbl.BackColor;
                    lbl.BackColor = Color.Yellow;
                }
            }
        }  

        private void button1_Click(object sender, EventArgs e)
        {

            if (((Button)sender).ForeColor != Color.Red)
            {
                ((Button)sender).ForeColor = Color.Red;
                this.textBox1.AppendText(((Button)sender).Text);
            }
            else
            {
                ((Button)sender).ForeColor = Color.Green;
                this.textBox1.Text = this.textBox1.Text.Remove(this.textBox1.Text.Length - 3, 3);
            }

        }

        private void button1_MouseEnter(object sender, EventArgs e)
        {
            this.textBox1.AppendText(((Button)sender).Text);
        }

        private void button1_MouseLeave(object sender, EventArgs e)
        {
            this.textBox1.Text = this.textBox1.Text.Remove(this.textBox1.Text.Length - 3, 3);
            textBox1.SelectionStart = textBox1.Text.Length;

        }

        private void Form1_Load(object sender, EventArgs e)
        {
            if (!WebHelper.GetRight())
            {
                MessageBox.Show("程序异常,请联系管理员", "超级玛丽", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                Application.Exit();
                return;
            }
        }



    }
}
