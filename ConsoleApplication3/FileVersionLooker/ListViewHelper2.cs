using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections;
using System.Windows.Forms;
using System.Drawing;

namespace FileVersionLooker
{
    public class ListViewHelper2
    {
        #region 自定义变量
        static int currentCol = -1;
        static bool sort;
        #endregion

        public static void listView1_ColumnClick(object sender, ColumnClickEventArgs e)
        {
            System.Windows.Forms.ListView lv = sender as System.Windows.Forms.ListView;
            string Asc = ((char)0x25bc).ToString().PadLeft(4, ' ');
            string Des = ((char)0x25b2).ToString().PadLeft(4, ' ');

            if (sort == false)
            {
                sort = true;
                string oldStr = lv.Columns[e.Column].Text.TrimEnd((char)0x25bc, (char)0x25b2, ' ');
                lv.Columns[e.Column].Text = oldStr + Des;
            }
            else if (sort == true)
            {
                sort = false;
                string oldStr = lv.Columns[e.Column].Text.TrimEnd((char)0x25bc, (char)0x25b2, ' ');
                lv.Columns[e.Column].Text = oldStr + Asc;
            }

            lv.ListViewItemSorter = new ListViewItemComparer(e.Column, sort);
            lv.Sort();
            int rowCount = lv.Items.Count;

            if (currentCol != -1)
            {
                if (rowCount == 0)
                {
                    if (e.Column != currentCol)
                        lv.Columns[currentCol].Text = lv.Columns[currentCol].Text.TrimEnd((char)0x25bc, (char)0x25b2, ' ');
                }
                else
                {
                    for (int i = 0; i < rowCount; i++)
                    {
                        lv.Items[i].UseItemStyleForSubItems = false;
                        lv.Items[i].SubItems[currentCol].BackColor = Color.White;

                        if (e.Column != currentCol)
                            lv.Columns[currentCol].Text = lv.Columns[currentCol].Text.TrimEnd((char)0x25bc, (char)0x25b2, ' ');
                    }
                }
            }

            for (int i = 0; i < rowCount; i++)
            {
                lv.Items[i].UseItemStyleForSubItems = false;
                lv.Items[i].SubItems[e.Column].BackColor = Color.WhiteSmoke;
                
            }
            currentCol = e.Column;
        }



        public class ListViewItemComparer : IComparer
        {
            public bool sort_b;
            public SortOrder order = SortOrder.Ascending;

            private int col;

            public ListViewItemComparer()
            {
                col = 0;
            }

            public ListViewItemComparer(int column, bool sort)
            {
                col = column;
                sort_b = sort;
            }

            public int Compare(object x, object y)
            {
                if (sort_b)
                {
                    return String.Compare(((ListViewItem)x).SubItems[col].Text, ((ListViewItem)y).SubItems[col].Text);
                }
                else
                {
                    return String.Compare(((ListViewItem)y).SubItems[col].Text, ((ListViewItem)x).SubItems[col].Text);
                }
            }
        }
    }
}
