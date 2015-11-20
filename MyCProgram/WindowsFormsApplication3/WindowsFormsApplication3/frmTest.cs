using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace WindowsFormsApplication3
{
    public partial class frmTest : Form
    {
        public frmTest()
        {
            InitializeComponent();
            Form.CheckForIllegalCrossThreadCalls = false;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            String path = @"D:\Users\WangFugui\Desktop\xhu218.HelloWorld\work\WindowsFormsApplication3\WindowsFormsApplication3\bin\Release\20150311093937689";
            CompressionHelper helper = new CompressionHelper(string.Format(@"{0}.zip", path));
            helper.NotifyCompressProgress += new NotifyCompressProgress(helper_NotifyCompressProgress);
            helper.CompressSubDirectory(new string[] {path });

        }

        void helper_NotifyCompressProgress(int progress, string source, CompressStatus uploadStatus)
        {
            this.textBox1.AppendText(String.Format("{0}{1}{2}", source, progress, uploadStatus));
        }
    }
}
