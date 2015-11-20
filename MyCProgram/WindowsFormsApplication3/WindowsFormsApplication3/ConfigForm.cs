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
    public partial class ConfigForm : frmBase
    {
        public ConfigForm()
        {
            InitializeComponent();

        }

        private bool inited = false;

        private void ConfigForm_Load(object sender, EventArgs e)
        {           
            try
            {

                bindingSource1.DataSource = Configuration.Open().KeyValuePairs;
                dataGridView1.AutoGenerateColumns = false;
                dataGridView1.AutoSize = true;
                dataGridView1.DataSource = bindingSource1;



                DriveInfo[] drives = DriveInfo.GetDrives();
                Drives configDrives = null;
                try
                {
                    configDrives = Drives.Open();
                }
                catch (System.Exception ex)
                {
                    //MessageBox.Show(ex.Message);
                }

                foreach (var drive in drives)
                {
                    try
                    {
                        ListViewItem item = new ListViewItem(new String[] { drive.Name, drive.VolumeLabel, (drive.TotalSize / 1024 / 1024 / 1024).ToString() + "GB", (drive.AvailableFreeSpace / 1024 / 1024 / 1024).ToString() + "GB" });
                        if (configDrives != null)
                        {
                            Drive configDrive = configDrives.list.FirstOrDefault(d => d.DriveName == drive.Name);
                            if (configDrive != null)
                            {
                                item.Checked = configDrive.Selected;
                            }
                        }
                        if ((double)drive.TotalFreeSpace / (double)drive.TotalSize * 100 < 10)
                        {
                            item.ImageIndex = 1;
                        }
                        else
                        {
                            item.ImageIndex = 0;
                        }
                        this.listView1.Items.Add(item);
                    }
                    catch (System.Exception ex)
                    {

                    }

                }

            }
            catch (System.Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            finally
            {
                inited = true;
            }
        }

        private void listView1_ItemChecked(object sender, ItemCheckedEventArgs e)
        {
            if (inited)
            {
                Drives drives = new Drives();
                foreach (ListViewItem item in this.listView1.Items)
                {

                    drives.list.Add(new Drive { DriveName = item.SubItems[0].Text, Selected = item.Checked });
                }
                drives.Save();

            }

        }

        private void dataGridView1_CellEndEdit(object sender, DataGridViewCellEventArgs e)
        {
            try
            {
                Configuration config = new Configuration();
                config.KeyValuePairs =  (List<KeyValue>)bindingSource1.DataSource;
                config.Save();
     
            }
            catch (System.Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
    }
}
