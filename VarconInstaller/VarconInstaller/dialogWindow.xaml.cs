using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace VarconInstaller
{
    /// <summary>
    /// dialogWindow.xaml 的交互逻辑
    /// </summary>
    public partial class dialogWindow : Window
    {
        public dialogWindow(string title,string content)
        {
            InitializeComponent();
            标题.Text = title;
            内容.Text = content;
        }

        private void 确定按钮_Click(object sender, RoutedEventArgs e)
        {
            DialogResult = true;
        }
    }
}
