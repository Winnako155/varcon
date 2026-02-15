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
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.IO;
using System.IO.Compression;
using System.Reflection;
using System.Windows.Media.Animation;
using System.Windows.Forms;
using System.Runtime.InteropServices;

namespace VarconInstaller
{
    /// <summary>
    /// MainWindow.xaml 的交互逻辑
    /// </summary>
    public partial class MainWindow : Window
    {
        public string installPath { get; set; } = @"C:\Users\Public\Start";
        public bool createDesktop { get; set; } = true;
        private const string zipName = "VarconInstaller.Start.zip";
        public MainWindow()
        {
            InitializeComponent();
            DataContext = this;
        }

        private void 导航栏_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            DragMove();
        }

        private void 关闭按钮_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

        private void 安装位置按钮_Click(object sender, RoutedEventArgs e)
        {
            System.Windows.Forms.FolderBrowserDialog openFileDialog = new System.Windows.Forms.FolderBrowserDialog(); //选择文件夹
            if (openFileDialog.ShowDialog() == System.Windows.Forms.DialogResult.OK)//注意，此处一定要手动引入System.Window.Forms空间，否则你如果使用默认的DialogResult会发现没有OK属性
            {
                installPath = openFileDialog.SelectedPath;
                安装位置输入框.Text = installPath;
            }
        }

        private void 确定按钮_Click(object sender, RoutedEventArgs e)
        {
            var an = (Storyboard)FindResource("continue");
            an.Begin();
            try
            {
                if (File.Exists(installPath + @"\Start.exe"))
                {
                    decideBox dbx = new decideBox("警告！", "检测到该目录存在Start.exe,将要删除该目录下的所有文件，确定要继续吗");
                    bool canDo = (bool)dbx.ShowDialog();
                    if (canDo)
                    {
                        Directory.Delete(installPath,true);
                    }
                }
                    using (Stream zipStream = Assembly.GetExecutingAssembly()
                .GetManifestResourceStream(zipName))
                {
                    using (ZipArchive archive = new ZipArchive(zipStream))
                    {
                        archive.ExtractToDirectory(installPath);
                    }
                }
                if (createDesktop)
                {
                    // 1. 找到桌面路径
                    string desktopPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
                    string shortcutPath = System.IO.Path.Combine(desktopPath, "VarconStartMenu.lnk");

                    // 2. 目标程序路径（假设要创建当前程序的快捷方式）
                    string targetPath = installPath + @"\Start.exe";

                    // 3. 使用 WScript.Shell 创建快捷方式
                    Type t = Type.GetTypeFromProgID("WScript.Shell");
                    dynamic shell = Activator.CreateInstance(t);
                    dynamic shortcut = shell.CreateShortcut(shortcutPath);

                    shortcut.TargetPath = targetPath;           // 目标程序路径
                    shortcut.WorkingDirectory = System.IO.Path.GetDirectoryName(targetPath); // 工作目录
                    shortcut.Description = "VarconStartMenu";   // 描述
                    shortcut.IconLocation = targetPath + ",0";  // 使用程序的第一个图标
                    shortcut.Save();

                    Marshal.FinalReleaseComObject(shortcut);
                    Marshal.FinalReleaseComObject(shell);
                }
                var doneAn = (Storyboard)FindResource("done");
                doneAn.Begin();
            }
            catch (Exception message)
            {
                dialogWindow dlg = new dialogWindow("遭遇不测",message.ToString());
                bool res = (bool)dlg.ShowDialog();
                this.Close();
            }
        }

        private void 确定按钮_Copy_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}
