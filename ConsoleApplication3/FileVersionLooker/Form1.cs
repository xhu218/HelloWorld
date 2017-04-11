using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.IO;
using System.Reflection;
using System.IO.IsolatedStorage;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using Microsoft.VisualBasic.Devices;
using System.Collections.Specialized;
namespace FileVersionLooker
{
    public partial class Form1 : Form
    {
        private string openFilePath = string.Empty;
        private string saveFilePath = string.Empty;
        private string messageTitle = ".NET文件版本查看器";
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_DragEnter(object sender, DragEventArgs e)
        {
            if (e.Data.GetDataPresent(DataFormats.FileDrop))
                e.Effect = DragDropEffects.Link;
            else e.Effect = DragDropEffects.None;
        }

        private void Form1_DragDrop(object sender, DragEventArgs e)
        {
            string[] filelist = (string[])e.Data.GetData(DataFormats.FileDrop);
            ViewFileVersion(filelist);
            StatusDisplay();
        }



        private void 选择文件ToolStripMenuItem_Click(object sender, EventArgs e)
        {
            OpenFiles();
        }



        private void 清空列表ToolStripMenuItem_Click(object sender, EventArgs e)
        {
            DelAllItems();
        }


        private void 退出ToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Application.Exit();

        }

        private void toolStripMenuItem1_Click(object sender, EventArgs e)
        {
            SaveAllItems();
        }



        private void toolStripMenuItem2_Click(object sender, EventArgs e)
        {
            DelUnkownItems();
        }



        private void toolStripMenuItem3_Click(object sender, EventArgs e)
        {

            SaveSelectItems();

        }


        private void Form1_Load(object sender, EventArgs e)
        {
            ReadUserPreferences();
            this.listView1.ListViewItemSorter = new ListViewColumnSorter();//.ListViewItemComparer();
            this.listView1.ColumnClick += new ColumnClickEventHandler(ListViewHelper.ListView_ColumnClick);

        }

        //打开文件
        private void openToolStripButton1_Click(object sender, EventArgs e)
        {
            OpenFiles();
        }
        //保存选定项
        private void saveToolStripButton1_Click(object sender, EventArgs e)
        {
            SaveSelectItems();
        }
        //剪切
        private void cutToolStripButton1_Click(object sender, EventArgs e)
        {
            if (Copy2Clip())
            {
                DelSelectItem();
            }
        }
        //帮助
        private void helpToolStripButton1_Click(object sender, EventArgs e)
        {
            frmHelp frm = new frmHelp();
            frm.ShowDialog();
        }

        private void Form1_SizeChanged(object sender, EventArgs e)
        {
            for (int i = 0; i < this.listView1.Columns.Count; i++)
            {
                this.listView1.Columns[i].Width = (this.Width - 8) / this.listView1.Columns.Count;
            }

        }


        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            WriteUserPreferences();
        }
        //保存全部
        private void toolStripButton1_Click(object sender, EventArgs e)
        {
            SaveAllItems();
        }
        //移出未知项
        private void toolStripButton2_Click(object sender, EventArgs e)
        {
            DelUnkownItems();
        }

        private void listView1_SelectedIndexChanged(object sender, EventArgs e)
        {
            StatusDisplay();
        }

        private void listView1_KeyDown(object sender, KeyEventArgs e)
        {

            //全选
            if (e.KeyData == (Keys.Control | Keys.A))
            {
                foreach (ListViewItem item in this.listView1.Items)
                {
                    if (!item.Selected)
                    {
                        item.Selected = true;
                    }
                }
            }
            //删除
            else if (e.KeyData == Keys.Delete)
            {
                if (MessageBox.Show("你确定要移除全部记录吗?", messageTitle, MessageBoxButtons.OKCancel, MessageBoxIcon.Question) == DialogResult.OK)
                {
                    DelAllItems();
                }
            }
            //复制
            if (e.Control && e.KeyCode == Keys.D)
            {
                Copy2Clip();
            }
            //剪切
            else if (e.KeyData == (Keys.Control | Keys.X))
            {
                Copy2Clip();
                DelSelectItem();

            }
        }


        private void listView1_MouseMove(object sender, MouseEventArgs e)
        {
            Point loc = e.Location;
            ListViewItem it = listView1.GetItemAt(loc.X, loc.Y) as ListViewItem;
            if (it != null)
            {
                string toolTipString = it.Tag.ToString();

                toolTip1.SetToolTip(listView1, toolTipString);
            }
        }

        #region Assistant Method

        private void ViewFileVersion(string[] files)
        {
            foreach (string filepath in files)
            {
                FileInfo fileInfo = null;
                ListViewItem item;
                try
                {
                    fileInfo = new FileInfo(filepath);

                    if (this.listView1.Items.ContainsKey(fileInfo.FullName))
                        continue;

                    Version version = AssemblyName.GetAssemblyName(filepath).Version;
                    int Build = version.Build;
                    int Revision = version.Revision;

                    DateTime dt = new DateTime(2000, 1, 1);
                    DateTime now = dt.AddDays(Build).AddSeconds(Revision * 2);

                    item = new ListViewItem(fileInfo.Name);
                    item.Name = fileInfo.FullName;

                    Icon iconForFile = SystemIcons.WinLogo;
                    iconForFile = Icon.ExtractAssociatedIcon(filepath);
                    if (!imageList1.Images.ContainsKey(fileInfo.Extension))
                    {
                        iconForFile = System.Drawing.Icon.ExtractAssociatedIcon(fileInfo.FullName);
                        imageList1.Images.Add(fileInfo.Extension, iconForFile);
                    }
                    item.ImageKey = fileInfo.Extension;
                    item.SubItems.Add(Convert.ToString(fileInfo.Length));
                    item.SubItems.Add(version.ToString());
                    item.SubItems.Add(fileInfo.CreationTime.ToString());
                    item.SubItems.Add(now.ToString());
                    item.Tag = fileInfo.FullName;
                    this.listView1.Items.Add(item);
                }
                catch
                {

                    if (this.listView1.Items.ContainsKey(fileInfo.Name))
                        continue;
                    item = new ListViewItem(fileInfo.Name);
                    item.Name = fileInfo.FullName;

                    Icon iconForFile = SystemIcons.WinLogo;
                    iconForFile = Icon.ExtractAssociatedIcon(filepath);
                    if (!imageList1.Images.ContainsKey(fileInfo.Extension))
                    {
                        iconForFile = System.Drawing.Icon.ExtractAssociatedIcon(fileInfo.FullName);
                        imageList1.Images.Add(fileInfo.Extension, iconForFile);
                    }
                    item.ImageKey = fileInfo.Extension;
                    item.SubItems.Add(Convert.ToString(fileInfo.Length));
                    item.SubItems.Add("Unknown");
                    item.SubItems.Add(fileInfo.CreationTime.ToString());
                    item.SubItems.Add("Unknown");
                    item.BackColor = Color.DarkGray;
                    item.Tag = fileInfo.FullName;
                    this.listView1.Items.Add(item);

                }
                StatusDisplay();
            }
            StatusDisplay();


        }


        private void StatusDisplay()
        {
            if (this.listView1.SelectedItems.Count == 0)
            {
                this.toolStripStatusLabel3.Text = string.Format("总共 {0} 条记录", this.listView1.Items.Count);
            }
            else
            {
                this.toolStripStatusLabel3.Text = string.Format("当前选择了 {0} 条记录", this.listView1.SelectedItems.Count);

            }
        }


        private void OpenFiles()
        {
            this.openFileDialog1.Filter = "所有文件(*.*)|*.*";
            this.openFileDialog1.FileName = "";
            this.openFileDialog1.Title = messageTitle;
            if (this.openFilePath == string.Empty)
            {
                openFileDialog1.InitialDirectory = "c:\\";
            }
            else
            {
                openFileDialog1.InitialDirectory = Directory.GetParent(this.openFilePath).ToString();
            }
            openFileDialog1.RestoreDirectory = true;
            if (openFileDialog1.ShowDialog() == DialogResult.OK)
            {
                this.openFilePath = this.openFileDialog1.FileName;
                ViewFileVersion(openFileDialog1.FileNames);
            }
        }

        private void DelAllItems()
        {
            if (this.listView1.Items.Count == 0)
            {
                MessageBox.Show("当前没有记录可被移除！", messageTitle, MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }
            this.listView1.Items.Clear();
            StatusDisplay();
        }

        private void DelSelectItem()
        {
            if (this.listView1.SelectedItems.Count == 0)
            {
                MessageBox.Show("你没有选择任何记录！", messageTitle, MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }
            foreach (ListViewItem item in this.listView1.Items)
            {
                if (item.Selected)
                    this.listView1.Items.Remove(item);
            }
            StatusDisplay();
        }

        private void SaveAllItems()
        {
            if (this.listView1.Items.Count == 0)
            {
                MessageBox.Show("没有可保存的记录", messageTitle, MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }
            List<ListViewItem> items = new List<ListViewItem>();
            foreach (ListViewItem item in this.listView1.Items)
            {
                items.Add(item);
            }
            SaveItems(items);
        }

        private void SaveItems(List<ListViewItem> items)
        {
            saveFileDialog1.Filter = "CSV(*.csv)|*.csv";
            saveFileDialog1.FileName = string.Format("文件版本{0}", DateTime.Now.ToString("yyyyMMddHHmmss"));
            if (this.saveFileDialog1.ShowDialog() == DialogResult.OK)
            {
                string fileName = this.saveFileDialog1.FileName;
                try
                {
                    using (StreamWriter sw = new StreamWriter(fileName, false, Encoding.UTF8))
                    {
                        sw.WriteLine("文件名称,文件大小,文件版本,文件时间,编译时间");
                        foreach (ListViewItem item in items)
                        {
                            sw.WriteLine(string.Format("{0},{1},{2},{3},{4}", item.SubItems[0].Text, item.SubItems[1].Text, item.SubItems[2].Text, item.SubItems[3].Text, item.SubItems[4].Text));
                        }
                        sw.Flush();
                        sw.Close();
                        string content = string.Format("总共保存 {0} 条记录 ", items.Count);
                        MessageBox.Show(content, messageTitle, MessageBoxButtons.OK);
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.ToString(), messageTitle, MessageBoxButtons.OK, MessageBoxIcon.Warning);
                }
            }
        }

        private void DelUnkownItems()
        {
            bool hasUnknowItem = false;
            foreach (ListViewItem item in this.listView1.Items)
            {
                if (item.BackColor == Color.DarkGray)
                {
                    this.listView1.Items.Remove(item);
                    hasUnknowItem = true;
                }
            }
            if (hasUnknowItem == false)
            {
                MessageBox.Show("没有未知记录", messageTitle, MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }
            StatusDisplay();

        }

        private void SaveSelectItems()
        {
            if (this.listView1.Items.Count == 0)
            {
                MessageBox.Show("没有可保存的记录", messageTitle, MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;

            }
            if (this.listView1.SelectedItems.Count == 0)
            {
                MessageBox.Show("请选择记录！", messageTitle, MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }
            List<ListViewItem> items = new List<ListViewItem>();
            foreach (ListViewItem item in this.listView1.Items)
            {
                if (item.Selected)
                {
                    items.Add(item);
                }
            }
            SaveItems(items);
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
                this.openFilePath = (string)formatter.Deserialize(isFileStream);
                this.saveFilePath = (string)formatter.Deserialize(isFileStream);
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
                formatter.Serialize(isFileStream, this.openFilePath);
                formatter.Serialize(isFileStream, this.saveFilePath);
                if (null != isFileStream)
                    isFileStream.Close();
                if (null != isFile)
                    isFile.Close();
            }
            catch
            { }
        }


        private bool Copy2Clip()
        {
            if (this.listView1.Items.Count == -0)
            {
                MessageBox.Show("当前没有记录", messageTitle, MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return false; ;
            }
            if (this.listView1.SelectedItems.Count == 0)
            {
                MessageBox.Show("请至从选择一条记录！", messageTitle, MessageBoxButtons.OK, MessageBoxIcon.Information);
                return false;
            }
            Computer com = new Computer();
            StringBuilder sb = new StringBuilder();

            int[] colSize = new int[this.listView1.Columns.Count];
            foreach (ListViewItem item in this.listView1.Items)
            {
                if (item.Selected)
                {
                    for (int colIndex = 0; colIndex < this.listView1.Columns.Count; colIndex++)
                    {
                        colSize[colIndex] = item.SubItems[colIndex].Text.Length > colSize[colIndex] ? item.SubItems[colIndex].Text.Length : colSize[colIndex];
                    }
                }
            }
            string headLine = string.Format("{0}{1}{2}{3}{4}", "文件名称".PadRight(colSize[0], ' '), "文件大小".PadRight(colSize[1], ' '), "文件版本".PadRight(colSize[2], ' '), "文件时间".PadRight(colSize[3], ' '), "编译时间".PadRight(colSize[4], ' '));
            sb.AppendLine(headLine);
            foreach (ListViewItem item in this.listView1.Items)
            {
                if (item.Selected)
                {
                    sb.AppendLine(string.Format("{0}\t{1}\t{2}\t{3}\t{4}", item.SubItems[0].Text.PadRight(colSize[0], ' '), item.SubItems[1].Text.PadRight(colSize[1], ' '), item.SubItems[2].Text.PadRight(colSize[2], ' '), item.SubItems[3].Text.PadRight(colSize[3], ' '), item.SubItems[4].Text.PadRight(colSize[4], ' ')));
                }

            }
            //StringCollection paths = new StringCollection();
            //string tempFilePath = Path.Combine(System.Environment.GetEnvironmentVariable("TEMP"), string.Format("文件版本{0}.csv", DateTime.Now.ToString("yyyyMMddHHmmss")));
            //StreamWriter sw = new StreamWriter(tempFilePath, false, Encoding.UTF8);
            //sw.Write(sb.ToString());
            //sw.Flush();
            //sw.Close();
            //paths.Add(tempFilePath);
            Clipboard.SetText(sb.ToString());
            MessageBox.Show("已经复制到剪贴板，请到其他位置粘贴！", messageTitle, MessageBoxButtons.OK, MessageBoxIcon.Information);
            return true;
        }

        #endregion
        //复制
        private void toolStripButton3_Click(object sender, EventArgs e)
        {
            Copy2Clip();
        }
        //移出所有项
        private void toolStripButton4_Click(object sender, EventArgs e)
        {
            DelAllItems();
        }

        private void toolStripMenuItem2_Click_1(object sender, EventArgs e)
        {

        }
        //打开文件
        private void 打开文件ToolStripMenuItem_Click(object sender, EventArgs e)
        {
            OpenFiles();
        }
        //保存选定项
        private void 保存选定项ToolStripMenuItem_Click(object sender, EventArgs e)
        {
            SaveSelectItems();
        }
        //保存全部项
        private void 保存所有项ToolStripMenuItem_Click(object sender, EventArgs e)
        {
            SaveAllItems();
        }
        //复制选定项
        private void 复制选定项ToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Copy2Clip();
        }
        //剪切选定项
        private void 剪切选定项ToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (Copy2Clip())
            {
                DelSelectItem();
            }
        }
        //移出所有项
        private void 移除所有项ToolStripMenuItem_Click(object sender, EventArgs e)
        {
            DelAllItems();
        }
        //移出未知项
        private void 移除未知项ToolStripMenuItem_Click(object sender, EventArgs e)
        {
            DelUnkownItems();
        }
        //退出
        private void 退出ToolStripMenuItem_Click_1(object sender, EventArgs e)
        {
            Application.Exit();
        }







        public void ChangeStatus(
               bool bsaveToolStripButton1,
               bool bsaveAlltoolStripButton1,
               
               bool bcutToolStripButton1,
               bool bcopytoolStripButton3,

               bool bdelUnknowtoolStripButton2,
               bool bdelAlltoolStripButton,

               bool b保存选定项ToolStripMenuItem,
               bool b保存所有项ToolStripMenuItem,

               bool b复制选定项ToolStripMenuItem,
               bool b剪切选定项ToolStripMenuItem,

               bool b移除所有项ToolStripMenuItem,
               bool b移除未知项ToolStripMenuItem

            )
           {
               saveToolStripButton1.Visible = bsaveToolStripButton1;
               saveAlltoolStripButton1.Visible = bsaveAlltoolStripButton1;
               
               cutToolStripButton1.Visible = bcutToolStripButton1;
               copytoolStripButton3.Visible = bcopytoolStripButton3;

               delUnknowtoolStripButton2.Visible = bdelUnknowtoolStripButton2;
               delAlltoolStripButton.Visible = bdelAlltoolStripButton;

               保存选定项ToolStripMenuItem.Visible = b保存选定项ToolStripMenuItem;
               保存所有项ToolStripMenuItem.Visible = b保存所有项ToolStripMenuItem;

               复制选定项ToolStripMenuItem.Visible = b复制选定项ToolStripMenuItem;
               剪切选定项ToolStripMenuItem.Visible = b剪切选定项ToolStripMenuItem;

                移除所有项ToolStripMenuItem.Visible = b移除所有项ToolStripMenuItem;
                移除未知项ToolStripMenuItem.Visible = b移除未知项ToolStripMenuItem;

           }


    }
}
