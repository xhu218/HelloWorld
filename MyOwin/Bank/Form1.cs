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

            Draw(this.panel1, helper._ListOrg);
            Draw(this.panel2, helper._List21);
            Draw(this.panel3, helper._List32);
            Draw(this.panel4, helper._List43);
            this.label1.Text = helper.ToString();
            DrawText(helper._Last3Word);


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
        

        private void Draw(Panel panel, List<List<char>> list)
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
                    panel.Controls.Add(btn);
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



    }
}
