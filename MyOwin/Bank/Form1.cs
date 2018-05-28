using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
            ListHelper helper = new ListHelper();
            helper._Input = this.textBox1.Text;
            helper.Process(helper._Input, helper._List);
            helper.Process1(helper._List, helper._List1);

            Draw(this.panel1,helper._List);
            Draw(this.panel2, helper._List1);
          
        }

        

        private void Draw(Panel panel, List<List<char>> list)
        {
            Color[] color = new Color[] { Color.Red, Color.Green };
            Application.DoEvents();

            panel.Controls.Clear();
            for (int i = 0; i < list.Count; i++)
            {
                Panel p = new Panel();           

                for (int j = 0; j < list[i].Count; j++)
                {
                    Button btn = new Button();
                    btn.Width = 20;
                    btn.Height = 20;
                    btn.Location = new Point(p.Location.X, p.Location.Y + 20 * j);
                    btn.BackColor =color[ ((int)list[i][j]) % 2];
                    btn.Text = list[i][j].ToString();
                    p.Controls.Add(btn);
                }

                p.Width = 20;
                p.Height = 400;
                p.Location = new Point(this.panel1.Location.X + i * 20, this.panel1.Location.Y);
                panel.Controls.Add(p);
            }
            Application.DoEvents();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            //MessageBox.Show(((Button)sender).Text);
         
            if (((Button)sender).ForeColor != Color.Red)
            {
                ((Button)sender).ForeColor = Color.Red;
                this.textBox1.AppendText(((Button)sender).Text);
            }
            else 
            {
                ((Button)sender).ForeColor = Color.Green;
                this.textBox1.Text = this.textBox1.Text.Remove(this.textBox1.Text.Length  - 3, 3);
            }

        }

        private void panel1_Scroll(object sender, ScrollEventArgs e)
        {

        }

        private void button1_MouseEnter(object sender, EventArgs e)
        {
            this.textBox1.AppendText(((Button)sender).Text);
        }

        private void button1_MouseLeave(object sender, EventArgs e)
        {
               this.textBox1.Text = this.textBox1.Text.Remove(this.textBox1.Text.Length  - 3, 3);
            textBox1.SelectionStart = textBox1.Text.Length;

        }

        private void button1_Click_1(object sender, EventArgs e)
        {

        }     

   
    }
}
