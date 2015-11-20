using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Win32;
using System.Reflection;

namespace WindowsFormsApplication3
{
    //public class RegistryAccess
    //{
    //    public string RegBranch = @"SOFTWARE\Sobey\";
    //    public bool MachineScope = true;

    //    /// <summary>
    //    /// 取得注册表路径
    //    /// </summary>
    //    /// <param name="addAssemblyBranch">是否加上以当前Assembly命名的单独分支</param>
    //    /// <returns></returns>
    //    private string GetRegPath(bool addAssemblyBranch)
    //    {
    //        string regPath = RegBranch;
    //        if (addAssemblyBranch)
    //        {
    //            regPath = RegBranch + Assembly.GetEntryAssembly().GetName().Name;
    //        }
    //        return regPath;
    //    }

    //    private RegistryKey GetEntryKey()
    //    {
    //        RegistryKey key = (MachineScope ? Registry.LocalMachine : Registry.CurrentUser);
    //        return key;
    //    }

    //    public void SetRegValue(string keyName, string keyValue)
    //    {
    //        SetRegValue(keyName, keyValue, true);
    //    }

    //    public void SetRegValue(string keyName, string keyValue, bool addAssemblyBranch)
    //    {
    //        string regPath = this.GetRegPath(addAssemblyBranch);
    //        RegistryKey key = GetEntryKey().CreateSubKey(regPath);
    //        key.SetValue(keyName, keyValue);

    //    }
    //    /// <summary>
    //    /// 
    //    /// </summary>
    //    /// <param name="keyName"></param>
    //    /// <param name="keyValue"></param>
    //    public void SetRegValue(string keyName, int keyValue)
    //    {
    //        SetRegValue(keyName, keyValue, true);
    //    }

    //    public void SetRegValue(string keyName, int keyValue, bool addAssemblyBranch)
    //    {
    //        SetRegValue(keyName, keyValue, addAssemblyBranch, RegistryValueKind.String);
    //    }

    //    public void SetRegValue(string keyName, int keyValue, bool addAssemblyBranch, RegistryValueKind valueKind)
    //    {
    //        string regPath = this.GetRegPath(addAssemblyBranch);
    //        RegistryKey key = GetEntryKey().CreateSubKey(regPath);
    //        key.SetValue(keyName, keyValue, valueKind);
    //    }

    //    /// <summary>
    //    /// 
    //    /// </summary>
    //    /// <param name="keyName"></param>
    //    /// <returns></returns>
    //    public string GetRegValue(string keyName)
    //    {
    //        return GetRegValue(keyName, true);
    //    }

    //    public string GetRegValue(string keyName, bool addAssemblyBranch)
    //    {
    //        string keyValueString = null;

    //        string regPath = this.GetRegPath(addAssemblyBranch);
    //        RegistryKey key = GetEntryKey().OpenSubKey(regPath);
    //        if (key != null)
    //        {
    //            object keyValue = key.GetValue(keyName);
    //            if (keyValue != null)
    //            {
    //                keyValueString = keyValue.ToString();
    //            }
    //        }
    //        return keyValueString;
    //    }

    //    public void DeleteRegKey(string keyName)
    //    {
    //        DeleteRegKey(keyName, true);
    //    }

    //    public void DeleteRegKey(string keyName, bool addAssemblyBranch)
    //    {
    //        string regPath = this.GetRegPath(addAssemblyBranch);
    //        RegistryKey key = GetEntryKey().OpenSubKey(regPath, true);
    //        if (key != null)
    //        {
    //            try
    //            {
    //                key.DeleteValue(keyName, true);
    //                key.Flush();
    //            }
    //            catch
    //            {
    //            }
    //        }
    //    }

    //}
}
