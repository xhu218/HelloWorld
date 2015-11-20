using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.IO;

namespace WindowsFormsApplication3
{
    public partial class frmBase : Form
    {
        public frmBase()
        {
            InitializeComponent();
        }

        private void frmBase_Load(object sender, EventArgs e)
        {
           
            String value = null;
            try
            {
                value = Properties.Settings.Default.SelectSSK;
            }
            catch (System.Exception ex)
            {
            	
            }            

            if (String.IsNullOrEmpty(value))
            {
                String []files = System.IO.Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory + @"ssk\", "*.ssk");
                Random r = new Random();
                int index = r.Next(0, files.Length);

                this.skinEngine1.SkinFile = files[index];
                FileInfo fileInfo = new FileInfo(files[index]);
                try
                {                    
                    Properties.Settings.Default.SelectSSK = fileInfo.Name;
                    Properties.Settings.Default.Save();
                }
                catch (System.Exception ex)
                {
                	
                }
    
            }
            else
            {
                this.skinEngine1.SkinFile = String.Format(@"{0}\{1}\{2}", AppDomain.CurrentDomain.BaseDirectory, "ssk", value);
            }

        }


    }
}
