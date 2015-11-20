using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Diagnostics;
using System.IO;
using System.IO.IsolatedStorage;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;

namespace WindowsFormsApplication3
{
    public partial class MainForm : frmBase
    {
        private bool inited = false;
        private const String MsgTitle = "System Information Collection Tools";


        public MainForm()
        {
            InitializeComponent();
            if (AppDomain.CurrentDomain.BaseDirectory.IndexOf(" ") > 0)
            {
                MessageBox.Show("The excute path contains empty character, please move to another place", MsgTitle, MessageBoxButtons.OK, MessageBoxIcon.Stop);
                this.Close();
            }
      

        }

        private void ShowMsg(String msg)
        {
            this.toolStripStatusLabel2.Text = msg;
        }

        Color c;
        private void btnStart_Click(object sender, EventArgs e)
        {

            System.Threading.Thread thread = new System.Threading.Thread(delegate() { StartWork(); });
            thread.IsBackground = true;
            thread.Start();
            
        }

        private void StartWork()
        {
 
            String rootDir = String.Format(@"{0}result\{1}", AppDomain.CurrentDomain.BaseDirectory, DateTime.Now.ToString("yyyyMMddHHmmssfff"));
            if (!Directory.Exists(rootDir))
            {
                Directory.CreateDirectory(rootDir);
            }
            try
            {
                this.btnStart.Enabled = false;
                if (c == null)
                {
                    c = this.listView1.Items[0].BackColor;
                }

                foreach (ListViewItem item in this.listView1.Items)
                {
                    item.BackColor = c;
                    
                }
                int currentDoIndex = 0;

                foreach (ListViewItem item in this.listView1.Items)
                {
                    if (item.Checked)
                    {
                        ShowMsg(String.Format("{0} / {1} has be done", ++currentDoIndex, GetSelectItemCount()));
                        item.BackColor = Color.Green;
                        SysProcess p = (SysProcess)item.Tag;
                        Process proc = new Process();
                        proc.StartInfo.WorkingDirectory = AppDomain.CurrentDomain.BaseDirectory + @"Script\";
                        proc.StartInfo.FileName = "cmd.exe";
                        if (p.ExcutePath.EndsWith(".vbs", true, null))
                        {
                            proc.StartInfo.Arguments = String.Format(@"/c cscript {0} {1}", p.ExcutePath, rootDir);
                        }
                        else if (p.ExcutePath.EndsWith("bat", true, null))
                        {
                            proc.StartInfo.Arguments = String.Format(@"/c {0} {1}", p.ExcutePath, rootDir);
                        }
                        proc.StartInfo.CreateNoWindow = false;
                        proc.Start();
                        proc.WaitForExit();
                    }
                }
                CompressionHelper helper = new CompressionHelper(string.Format(@"{0}.zip", rootDir));
                helper.NotifyCompressProgress += new NotifyCompressProgress(helper_NotifyCompressProgress);
                helper.CompressSubDirectory(new string[] { rootDir });



            }
            catch (System.Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            finally
            {

            }
        }

        void helper_NotifyCompressProgress(int progress, string source, CompressStatus uploadStatus)
        {
            ShowMsg(String.Format("{0}{1}", progress, uploadStatus));
            if (uploadStatus == CompressStatus.Finished)
            {
                Process proc = new Process();

                proc.StartInfo.FileName = "cmd.exe";
                proc.StartInfo.Arguments = String.Format("/c  explorer.exe  /select,\"{0}\"",source);
                proc.StartInfo.CreateNoWindow = false;
                proc.Start();
                this.btnStart.Enabled = true;
            }
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            Close();

        }

        private void btnConfig_Click(object sender, EventArgs e)
        {
            ConfigForm frm = new ConfigForm();
            frm.ShowDialog();
        }

        private void MainForm_Load(object sender, EventArgs e)
        {       
            Form.CheckForIllegalCrossThreadCalls = false;
            String[] files = System.IO.Directory.GetFiles(string.Format(@"{0}\ssk", AppDomain.CurrentDomain.BaseDirectory), "*.ssk");
            foreach (var file in files)
            {
                FileInfo fileInfo = new FileInfo(file);
                ToolStripMenuItem t = new ToolStripMenuItem();
                t.Text = fileInfo.Name;
                t.Click += new EventHandler(t_Click);
                this.toolStripDropDownButton4.DropDownItems.Add(t);
            }


            ProcessList processList = ProcessList.Open();
            foreach (var process in processList.Process)
            {
                ListViewItem item = new ListViewItem(new String[] { process.ProcessName });
                item.Checked = process.Selected;

                Icon iconForFile = SystemIcons.WinLogo;
                String path = string.Format(@"{0}\Script\{1}", AppDomain.CurrentDomain.BaseDirectory, process.ExcutePath);
                FileInfo fileInfo = new FileInfo(path);
                iconForFile = Icon.ExtractAssociatedIcon(path);
                if (!imageList1.Images.ContainsKey(fileInfo.Extension))
                {
                    iconForFile = System.Drawing.Icon.ExtractAssociatedIcon(fileInfo.FullName);
                    imageList1.Images.Add(fileInfo.Extension, iconForFile);
                }
                item.ImageKey = fileInfo.Extension;
                item.Tag = process;

                this.listView1.Items.Add(item);
            }
            inited = true;
            //ReadUserPreferences();
            ShowMsg(String.Format("{0} items selected", GetSelectItemCount()));
        }

        private int GetSelectItemCount()
        {
            int counter = 0;
            foreach (ListViewItem item in this.listView1.Items)
            {
                if (item.Checked == true)
                {
                    counter++;
                }
            }
            return counter;
        }

        void t_Click(object sender, EventArgs e)
        {
            this.skinEngine1.SkinFile = String.Format(@"{0}\{1}\{2}", AppDomain.CurrentDomain.BaseDirectory, "ssk", ((ToolStripMenuItem)sender).Text);
            
            Properties.Settings.Default.SelectSSK = ((ToolStripMenuItem)sender).Text;
            Properties.Settings.Default.Save();

        }

        void listView1_ItemChecked(object sender, ItemCheckedEventArgs e)
        {
            if (inited)
            {
                ProcessList processList = ProcessList.Open();
                foreach (ListViewItem item in this.listView1.Items)
                {
                    SysProcess process = processList.Process.FirstOrDefault(p => p.ProcessName == item.SubItems[0].Text);
                    process.Selected = item.Checked;

                }
                processList.Save();
            }
            ShowMsg(String.Format("{0} items selected", GetSelectItemCount()));
        }

        private void ReadUserPreferences()
        {
            try
            {
                IsolatedStorageFile isFile =
                 IsolatedStorageFile.GetStore(
                 IsolatedStorageScope.User
                 | IsolatedStorageScope.Assembly
                 , null
                 , null);
                IsolatedStorageFileStream isFileStream = new
                 IsolatedStorageFileStream("Settings.isf"
                 , FileMode.Open
                 , isFile);
                IFormatter formatter = new
                    //System.Runtime.Serialization.Formatters.Binary.BinaryFormatter
                 BinaryFormatter();
                this.Size = (Size)formatter.Deserialize(isFileStream);
                this.Location = (Point)formatter.Deserialize(isFileStream);

                if (null != isFileStream)
                    isFileStream.Close();
                if (null != isFile)
                    isFile.Close();
                if (this.Location.X < 0 || this.Location.Y < 0)
                    this.StartPosition = FormStartPosition.CenterScreen;
            }
            catch (System.IO.FileNotFoundException e)
            {

            }
        }

        private void WriteUserPreferences()
        {
            try
            {
                IsolatedStorageFile isFile =
                 IsolatedStorageFile.GetStore(
                 IsolatedStorageScope.User
                 | IsolatedStorageScope.Assembly
                 , null
                 , null);
                IsolatedStorageFileStream isFileStream = new
                 IsolatedStorageFileStream("Settings.isf"
                 , FileMode.OpenOrCreate
                 , isFile);
                IFormatter formatter = new
                    //System.Runtime.Serialization.Formatters.Binary.BinaryFormatter
                 BinaryFormatter();
                formatter.Serialize(isFileStream, this.Size);
                formatter.Serialize(isFileStream, this.Location);

                if (null != isFileStream)
                    isFileStream.Close();
                if (null != isFile)
                    isFile.Close();
            }
            catch
            { }
        }

        private void MainForm_FormClosed(object sender, FormClosedEventArgs e)
        {
            WriteUserPreferences();
        }



    }
}
