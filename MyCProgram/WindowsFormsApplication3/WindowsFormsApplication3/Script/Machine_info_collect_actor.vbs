'On Error Resume Next

 

'****************************关键词注释***********************************
'cimv2 : common information model version 2  CIM模型 版本2
'winmgmts: WMI 脚本库的名称
'ACPI: Advanced Configuration and Power Management Interface 高级配置和电源管理接口
'CIM_ManagedSystemElement :为系统组件等级数据的基类别。成员标准: 任何特别的系统组件都可包含在这个类别中
'CIM_PhysicalElement :子类别定义任何有特别物理识别符的系统的组件
'CIM_PhysicalPackage : 代表包含或拥有其它组件的物理元素
'CIM_PhysicalComponents : 代表一个套件中任何低层或基本的组件
'CIM_LogicalElement : 代表抽象系统组件的所有系统组件的基类别
'CIM_LogicalDevice : 硬件实体的抽象或仿真。包含或与之关联的任何用于管理其操作或配置的逻辑设备的特性
'CIM_System : 它聚集了一组可列举的管理系统组件.集合以整体功能方式发挥作用
'CIM_DiskDrive : 代表一个由操作系统认为的物理磁盘驱动器
'*************************************************************************

 

'''
''' HTML页面类
'''
Class IEHTML
    Private ieobj  '注意：变量前面不能出现_ ，变量名称不能与GET SET 的属性名称一样（不区分大小写）
    Public Property Get IE() 'IE对象
        Set IE = ieobj
    End Property
    Public Property Set IE(Value)
        Set ieobj = Value
    End Property

    Private Sub Class_Initialize   ' 构造函数
        Set IE = Wscript.CreateObject("InternetExplorer.Application")

        With IE
            .left=200
            .top=200
            .height=540
            .width=750
            .menubar=0
            .toolbar=0
            .statusBar=0
            .navigate "About:Blank"  '转向的网址
            .visible=1
            '.FullScreen = 11
         End With
     End Sub

 

    '等待页面加载完成
    '返回IE的Document对象
    public Function PredefinedDocument
        Dim ieDocument
        Dim css

        css = css & "<style type='text/css'>" & _
                           "body {" & _
                           "    color: purple;" & _
                           "    background-color: #d8da3d}" & _
                           "table {" & _
                           "    border-collapse:separate;" & _
                           "    bgcolor : #FFC080;" & _
                           "    border: 1px dotted gray;" & _
                           "    width : 100%}" & _
                           "td {" & _
                           "    bgcolor : #EFE7D6td}" & _
                           "</style>"

         Do While IE.Busy
         Loop
  
         '激活当前窗口
         set WshShell = WScript.CreateObject("WScript.Shell")
         WshShell.Appactivate IE
         WshShell.sendkeys "{enter}"

         Set ieDocument = IE.Document '取得IE的Document对象

         '初始设置默认HTML节点
        With ieDocument
            .Open
            .WriteLn "<HTML>"
            .WriteLn "<HEAD>"
            .WriteLn "<TITLE>电脑信息检测器</TITLE>"
            .WriteLn css
            .WriteLn "</HEAD>"
            .WriteLn "<BODY>"
            .WriteLn "<Form>"
            .WriteLn "<div align = 'center'>"
            .WriteLn "<strong>电脑信息检测信息列表</strong>"
            .WriteLn "</div>"
            .WriteLn "</br></br>"
            .WriteLn "<div id = 'divInfo'></div>"
            .WriteLn "</Form>"
            .WriteLn "</BODY>"
            .WriteLn "</HTML>"
            '.Close '如果预先关闭 则IE的后续代码无法取到已经写入的值。意味着写入必须是一个整体
        End With

        PredefinedDocument = ieDocument
     End Function

 

     '显示页面信息
     public Sub WriteInfo(strInfo)
         Dim ieDocument , documentDiv
         PredefinedDocument() '执行预写程序

         Set ieDocument = IE.Document' GetDocument()  'IE.Document从函数返回之后 无法取得对象 原因不明
     
         with ieDocument
             '.open
             'IE.Document.write strInfo
             'MsgBox IE.Document.documentElement.innerHTML
            .getElementById("divInfo").innerHTML = strInfo
            .close
          End with
      End Sub

 

      '如果需要自定义输出 请调用此方法
      public Sub WriteInfo2(strInfo)
          Dim ieDocument

          While IE.Busy  
          wend
          Set ieDocument = IE.Document

          With ieDocument
              .open
              .Write strInfo
              .close
          End With
          'ieDocument.getElementById("divInfo").innerHTML = strInfo
       End Sub
 
       Private Sub Class_Terminate() '析构函数
           Set IE = nothing
       End Sub
End Class

 

'''
'''枚举项
'''
Class PropertyEnum
 Dim dic

 Private Sub Class_Initialize()
  Set dic = CreateObject("Scripting.Dictionary")
 End Sub

 Private Sub Class_Terminate()
  Set dic = nothing
 End Sub

 '********************公共属性**************************
 Public Property Get CommonEnum(strproperty)
  dic.RemoveAll()

  Select Case strproperty
  Case "Status" '对象当前操作和非操作的状态
   dic.add "OK", "确定"
   dic.add "Error", "错误"
   dic.add "Degraded", "已降级"
   dic.add "Unknown", "未知"
   dic.add "Pred Fail", "预见故障"
   dic.add "Starting", "启动"
   dic.add "Stopping", "停止"
   dic.add "Service", "服务"
   dic.add "Stressed", "强调"
   dic.add "NonRecover", "不可恢复"
   dic.add "NoContact", "无关联"
   dic.add "LostComm", "失去信号"
  Case "PoweredOn" 
   dic.add "True", "是"
   dic.add "Flase", "否"
  End Select

  Set CommonEnum = dic
 End Property
 '*****************************************************

 '********************CPU属性**************************
 Public Property Get CPUEnum(strproperty)
  dic.RemoveAll()

  Select Case strproperty
   Case "Architecture" 'Architecture 属性指定用于此平台的处理器的设计
    dic.add "0", "x86 "
    dic.add "1", "MIPS "
    dic.add "2", "Alpha "
    dic.add "3", "PowerPC "
    dic.add "6", "ia64 "
   Case "Availability" '设备的可用性和状态
    dic.add "3", "全部能量 "
    dic.add "4", "警告 "
    dic.add "5", "测试 "
    dic.add "10", "降级 "
    dic.add "13", "节能 - 未知 "
    dic.add "14", "节能 - 低能模式 "
    dic.add "15", "节能 - 待机状态 "
    dic.add "17", "节能 - 警告 "
   Case "ConfigManagerErrorCode" '表示 Win32 配置管理程序错误编码
    dic.add "0", "这台设置工作正常。"
    dic.add "1", "这台设置配置得不对。"
    dic.add "2", "Windows 不能为这台设置加载驱动程序。"
    dic.add "3", "这台设置的驱动程序可能损坏，或者您的系统的内存或其它资源不足。"
    dic.add "4", "这台设置工作不正常。某个驱动程序或注册表可能已损坏。"
    dic.add "5", "这台设置的驱动程序需要一个 Windows 不能管理的资源。"
    dic.add "6", "这台设置的引动配置与其它设备相冲突。"
    dic.add "7", "无法筛选。"
    dic.add "8", "找不到该设备的驱动程序。"
    dic.add "9", "由于控制固件没有正确汇报设备的资源，这个设备无法正常运行。"
    dic.add "10", "这个设备无法启动。"
    dic.add "11", "这个设备失败。"
    dic.add "12", "这个设备无法找到可供使用的可用资源。"
    dic.add "13", "Windows 无法识别这个设备使用的所有资源。"
    dic.add "14", "重新启动您的计算机之前，这个设备无法正常运行。"
    dic.add "15", "由于存在一个重新枚举的问题，这个设备无法正常运行。"
    dic.add "16", "Windows 无法识别这个设备使用的所有资源。"
    dic.add "17", "这个设备在请求一个未知资源类型。"
    dic.add "18", "为这个设备重新安装驱动程序。"
    dic.add "19", "您的注册表可能受损。"
    dic.add "20", "使用 VxD 加载器失败。"
    dic.add "21", "系统失败: 这个设备尝试更改驱动器。如果这样做无效，请参阅您的硬件文档。Windows 正在删除这个设备。"
    dic.add "22", "这个设备已停用。"
    dic.add "23", "系统失败: 这个设备尝试更改驱动器。如果这样做无效，请参阅您的硬件文档。"
    dic.add "24", "这个设备不存在、无法正常工作或者没有安装所有的驱动程序。"
    dic.add "25", "Windows 仍在安装这个设备。"
    dic.add "26", "Windows 仍在安装这个设备。"
    dic.add "27", "这个设备没有有效的日志配置。"
    dic.add "28", "这个设备的驱动程序没有安装。"
    dic.add "29", "由于设备的固件没有给出所需的资源，这个设备已停用。"
    dic.add "30", "这个设备正在使用另一台设备使用的中断请求(IRQ)资源。"
    dic.add "31", "由于 Windows 无法加载这个设备所需要的驱动程序，这个设备无法正常运行。"
   Case "StatusInfo" '设备的运行状态信息
    dic.add "1", "其它 "
    dic.add "3", "已启用 "    
    dic.add "2", "未知 "
    dic.add "4", "已停用 "
    dic.add "5", "不适用 "
   Case "Family" '处理器系列类型
    dic.add "1", "其他" 
    dic.add "2", "未知" 
    dic.add "3", "8086" 
    dic.add "4", "80286" 
    dic.add "5", "80386" 
    dic.add "6", "80486" 
    dic.add "7", "8087" 
    dic.add "8", "80287" 
    dic.add "9", "80387" 
    dic.add "10", "80487" 
    dic.add "11", "Pentium?  brand" 
    dic.add "12", "Pentium? Pro" 
    dic.add "13", "Pentium? II" 
    dic.add "14", "Pentium? processor with MMX technology"
    dic.add "15", "Celeron?" 
    dic.add "16", "Pentium? II Xeon" 
    dic.add "17", "Pentium? III" 
    dic.add "18", "M1 Family"
    dic.add "19", "M2 Family"
    dic.add "24", "K5 Family" 
    dic.add "25", "K6 Family" 
    dic.add "26", "K6-2" 
    dic.add "27", "K6-3" 
    dic.add "28", "AMD Athlon? Processor Family" 
    dic.add "29", "AMD? Duron? Processor" 
    dic.add "30", "AMD2900 Family" 
    dic.add "31", "K6-2+" 
    dic.add "32", "Power PC Family" 
    dic.add "33", "Power PC 601" 
    dic.add "34", "Power PC 603" 
    dic.add "35", "Power PC 603+" 
    dic.add "36", "Power PC 604" 
    dic.add "37", "Power PC 620" 
    dic.add "38", "Power PC X704" 
    dic.add "39", "Power PC 750" 
    dic.add "48", "Alpha Family" 
    dic.add "49", "Alpha 21064" 
    dic.add "50", "Alpha 21066" 
    dic.add "51", "Alpha 21164" 
    dic.add "52", "Alpha 21164PC" 
    dic.add "53", "Alpha 21164a" 
    dic.add "54", "Alpha 21264"
    dic.add "55", "Alpha 21364" 
    dic.add "64", "MIPS Family" 
    dic.add "65", "MIPS R4000" 
    dic.add "66", "MIPS R4200" 
    dic.add "67", "MIPS R4400" 
    dic.add "68", "MIPS R4600" 
    dic.add "69", "MIPS R10000" 
    dic.add "80", "SPARC Family" 
    dic.add "81", "SuperSPARC" 
    dic.add "82", "microSPARC II" 
    dic.add "83", "microSPARC IIep" 
    dic.add "84", "UltraSPARC" 
    dic.add "85", "UltraSPARC II" 
    dic.add "86", "UltraSPARC IIi" 
    dic.add "87", "UltraSPARC III" 
    dic.add "88", "UltraSPARC IIIi" 
    dic.add "96", "68040" 
    dic.add "97", "68xxx Family" 
    dic.add "98", "68000" 
    dic.add "99", "68010" 
    dic.add "100", "68020" 
    dic.add "101", "68030" 
    dic.add "112", "Hobbit Family" 
    dic.add "120", "Crusoe? TM5000 Family" 
    dic.add "121", "Crusoe? TM3000 Family" 
    dic.add "128", "Weitek" 
    dic.add "130", "Itanium? Processor" 
    dic.add "144", "PA-RISC Family" 
    dic.add "145", "PA-RISC 8500" 
    dic.add "146", "PA-RISC 8000" 
    dic.add "147", "PA-RISC 7300LC" 
    dic.add "148", "PA-RISC 7200" 
    dic.add "149", "PA-RISC 7100LC" 
    dic.add "150", "PA-RISC 7100" 
    dic.add "160", "V30 Family" 
    dic.add "176", "Pentium? III Xeon?" 
    dic.add "177", "Pentium? III Processor with Intel? SpeedStep? Technology" 
    dic.add "178", "Pentium? 4" 
    dic.add "179", "Intel? Xeon?" 
    dic.add "180", "AS400 Family" 
    dic.add "181", "Intel? Xeon? processor MP"
    dic.add "182", "AMD AthlonXP? Family" 
    dic.add "183", "AMD AthlonMP? Family" 
    dic.add "184", "Intel? Itanium? 2" 
    dic.add "185", "AMD Opteron? Family" 
    dic.add "190", "K7" 
    dic.add "200", "IBM390 Family" 
    dic.add "201", "G4" 
    dic.add "202", "G5" 
    dic.add "250", "i860" 
    dic.add "251", "i960" 
    dic.add "260", "SH-3" 
    dic.add "261", "SH-4" 
    dic.add "280", "ARM" 
    dic.add "281", "StrongARM" 
    dic.add "300", "6x86" 
    dic.add "301", "MediaGX" 
    dic.add "302", "MII" 
    dic.add "320", "WinChip" 
    dic.add "350", "DSP" 
    dic.add "500", "Video Processor" 
   Case "ProcessorType" '处理器类型
   dic.add "1", "其他" 
   dic.add "2", "未知" 
   dic.add "3", "中央处理器" 
   dic.add "4", "浮点处理器" 
   dic.add "5", "数字信号处理器" 
   dic.add "6", "视频处理器" 
   Case "CpuStatus" '处理器当前的状态
   dic.add "0", "未知" 
   dic.add "1", "启用" 
   dic.add "2", "BIOS设置显示" 
   dic.add "3", "BIOS设置不显示 (请求错误)" 
   dic.add "4", "闲置" 
   dic.add "5", "保留" 
   dic.add "6", "保留" 
   dic.add "7", "其他"
  End Select

  Set CPUEnum = dic
 End Property
 '*****************************************************

 '********************内存属性*************************
 Public Property Get PhysicalMemoryEnum(strproperty)
  dic.RemoveAll()

  Select Case strproperty
   Case "MemoryType" 
    dic.add "0", "未知" 
    dic.add "1", "其他" 
    dic.add "2", "DRAM" 
    dic.add "3", "Synchronous DRAM" 
    dic.add "4", "Cache DRAM" 
    dic.add "5", "EDO" 
    dic.add "6", "EDRAM" 
    dic.add "7", "VRAM" 
    dic.add "8", "SRAM" 
    dic.add "9", "RAM"
    dic.add "10", "ROM" 
    dic.add "11", "Flash" 
    dic.add "12", "EEPROM" 
    dic.add "13", "FEPROM" 
    dic.add "14", "EPROM" 
    dic.add "15", "CDRAM" 
    dic.add "16", "3DRAM" 
    dic.add "17", "SDRAM" 
    dic.add "18", "SGRAM" 
    dic.add "19", "RDRAM"
    dic.add "20", "DDR" 
   Case "InterleavePosition" 
    dic.add "0", "非交替" 
    dic.add "1", "第一个位置" 
    dic.add "2", "第二个位置" 
  End Select

  Set PhysicalMemoryEnum = dic
 End Property
 '*****************************************************

    '********************键盘属性*************************
 Public Property Get KeyBoradEnum(strproperty)
  dic.RemoveAll()

  Select Case strproperty
   Case "Password" 
    dic.add "1", "其他" 
    dic.add "2", "未知" 
    dic.add "3", "已停用" 
    dic.add "4", "已启用" 
    dic.add "5", "未执行"
  End Select

  Set KeyBoradEnum = dic
 End Property
 '*****************************************************

    '********************鼠标属性*************************
 Public Property Get PointingDeviceEnum(strproperty)
  dic.RemoveAll()

  Select Case strproperty
   Case "DeviceInterface" 
    dic.add "1", "其他" 
    dic.add "2", "未知" 
    dic.add "3", "连续的" 
    dic.add "4", "PS/2" 
    dic.add "5", "红外线的" 
    dic.add "6", "HP-HIL" 
    dic.add "7", "总线鼠标" 
    dic.add "8", "ADB (Apple Desktop Bus)" 
    dic.add "160", "总线鼠标 DB-9" 
    dic.add "161", "总线鼠标 micro-DIN" 
    dic.add "162", "USB" 
   Case "Handedness" 
    dic.add "0", "未知" 
    dic.add "1", "不适用" 
    dic.add "2", "右手操作" 
    dic.add "3", "左手操作"
   Case "PointingType" 
    dic.add "1", "其他" 
    dic.add "2", "未知" 
    dic.add "3", "鼠标" 
    dic.add "4", "跟踪球" 
    dic.add "5", "Track Point" 
    dic.add "6", "Glide Point" 
    dic.add "7", "触摸面板" 
    dic.add "8", "触摸屏" 
    dic.add "9", "光电鼠标" 
  End Select

  Set PointingDeviceEnum = dic
 End Property
 '*****************************************************

   '********************显示器属性*************************
 Public Property Get DesktopMonitorEnum(strproperty)
  dic.RemoveAll()

  Select Case strproperty
   Case "DisplayType" 
    dic.add "0", "未知" 
    dic.add "1", "其他" 
    dic.add "2", "多扫描色" 
    dic.add "3", "单色监视器" 
    dic.add "4", "Fixed Frequency Color" 
    dic.add "5", "Fixed Frequency Monochrome" 
  End Select

  Set DesktopMonitorEnum = dic
 End Property
 '*****************************************************

    '********************操作系统属性*********************
 Public Property Get ComputerSystemEnum(strproperty)
  dic.RemoveAll()

  Select Case strproperty
   Case "AdminPasswordStatus"
    dic.add "1", "不启用" 
    dic.add "2", "启用" 
    dic.add "3", "未生效" 
    dic.add "4", "未知" 
   Case "BootOptionOnLimit"
    dic.add "1", "预留" 
    dic.add "2", "操作系统" 
    dic.add "3", "系统应用" 
    dic.add "4", "不重启"
   Case "ChassisBootupState"
    dic.add "1", "其他" 
    dic.add "2", "未知" 
    dic.add "3", "安全的" 
    dic.add "4", "警告的" 
    dic.add "5", "危险的" 
    dic.add "6", "不可恢复的"
   Case "DomainRole"
    dic.add "0", "独立工作区" 
    dic.add "1", "工作区成员" 
    dic.add "2", "独立服务器" 
    dic.add "3", "服务器成员" 
    dic.add "4", "备份域管理员" 
    dic.add "5", "主域管理员"
   Case "FrontPanelResetStatus"
    dic.add "0", "不启用" 
    dic.add "1", "启用" 
    dic.add "2", "不生效" 
    dic.add "3", "未知" 
   Case "PowerManagementCapabilities"
    dic.add "0", "未知" 
    dic.add "1", "不受支持" 
    dic.add "2", "已停用" 
    dic.add "3", "已启用" 
    dic.add "4", "自动输入节能模式" 
    dic.add "5", "可设置的电源状态" 
    dic.add "6", "支持电源周期" 
    dic.add "7", "支持定时通电"
   Case "PowerState"
    dic.add "0", "未知" 
    dic.add "1", "全能模式" 
    dic.add "2", "低能模式" 
    dic.add "3", "备用模式" 
    dic.add "4", "节能模式" 
    dic.add "5", "动力循环" 
    dic.add "6", "电源关闭" 
    dic.add "7", "节能模式-警告状态" 
   Case "WakeUpType"
    dic.add "0", "预留" 
    dic.add "1", "其他" 
    dic.add "2", "未知" 
    dic.add "3", "高级电源管理定时器" 
    dic.add "4", "调制解调器通知" 
    dic.add "5", "远程网络" 
    dic.add "6", "电源开关" 
    dic.add "7", "PCI PME#" 
    dic.add "8", "AC Power Restored" 
   Case "BootupState"
       dic.add "Normal boot", "正常启动"
    dic.add "Fail-safe boot", "失效保险启动"
    dic.add "Fail-safe with network boot", "网络失效保险启动"
   End Select

  Set ComputerSystemEnum = dic
 End Property
 '****************************************************

  '********************内存属性*********************
 Public Property Get ProcessEnum(strproperty)
  dic.RemoveAll()

  Select Case strproperty
   Case "ExecutionState"
    dic.add "2", "就绪" 
    dic.add "3", "运行" 
    dic.add "4", "受阻" 
  End Select

  Set ProcessEnum = dic
 End Property
 '****************************************************
End Class

 

'''
'''字符串处理类
'''
Class OperateString
    '处理之后的字符串
    Private buildstr 
    Public Property Get Str()
        Str = buildstr
    End Property
    Public Property Set Str(value)
        buildstr = value '字符串不用SET
    End Property

    '''
    '''构造待显示在页面中的HTML字符串
    '''参数：text（待显示的名称） value(待显示的值)
    Public Sub BuildStringHTML(text, value)
     '必须用SET给属性赋值
        Set Str = Str & _
                       "<tr><td>" & text & _
                       "</td><td>" & value & _
                       "</td></tr>"
    End Sub
	
	public Sub BuildStringHTMLForBeginTR()
		Set Str = Str & "<tr>"
	End Sub
	
	Public Sub BuildStringHTMLForEndTR
		Set Str = Str & "</tr>"
	End Sub
	
	Public Sub BuildStringHTMLForProcess(value)
		Set Str = Str & _
						"<td>" & value & _
						"</td>"
	End Sub
 
    '''
    '''返回处理之后的字符串之前 密封一次此字符串
    '''参数: strHeader(区分多个表格的表头名称)
    Public Sub SealHTML(strHeader)
        Set Str = "<table>" & _
                       "<tr align = 'center' STYLE='font-size:14; background-color:beige'>" & _
                       "<td colSpan = '2'>" & _
                       strHeader & "信息列表" & _
                       "</td></tr>" & _
                       "<tr><td width = '30%'></td></tr>" & _
                       Str & _
                       "</table>"
    End Sub

    Public function ReturnStrAndClear()
        ReturnStrAndClear = Str
        Set Str = ""
    End function
End Class

 

'''
'''其他公用函数类
'''
Class OtherCommonOperate
    '根据Dictionary的键取得值
    Public Function GetEnumValue(dic, text)
        Dim dicKeys, dicItems

        If IsNull(text) Then Exit Function

        dicKeys = dic.Keys
        dicItems =  dic.Items
 
        For i = 0 To dic.count -1
            If dicKeys(i) = CStr(text) Then
                GetEnumValue = dicItems(i)
                Exit Function
            End If
       Next
    End Function
End Class


'''
''' WMI取得电脑信息
'''
Class WMIInfo
    Dim objWMI 'WMI对象 CIMV2类库
    Dim objWMI1 'WMI对象 WINDOWS WMI特有类库
    Dim optstr '字符串操作类对象
    Dim objEnum '枚举类对象
    Dim ocommonopt '其他函数处理类

 

 '计算机名称
 'Set用在本类内部  Let用在类实例化之后赋值的情况
 Private strcomputer 
 Public Property Get computerName
  computerName = strcomputer
 End Property 
 Public Property Set computerName(Value)
     strcomputer = Value
 End Property 
 Public Property Let computerName(Value)
  strcomputer = Value

  Set objWMI = GetObject("winmgmts://" &  Value & "/root/cimv2") 
  Set objWMI1 = GetObject("winmgmts://" & Value & "/root/wmi")
 End Property

 Private Sub Class_Initialize '构造函数
  Set objWMI = GetObject("winmgmts://") 'winmgmts://默认代表本机CIMV2
  Set optstr = new OperateString
  Set objEnum = new PropertyEnum
  Set ocommonopt = new OtherCommonOperate
 End Sub

 Private Sub Class_Terminate() '析构函数
  Set objWMI = Nothing
  Set optstr = Nothing
  Set objEnum = Nothing
  Set ocommonopt = Nothing
  If IsEmpty(computerName) Then
   Set objWMI1 = Nothing
  End If
End Sub

 

 '取得主板信息
 '注:Win32_BaseBoard 类别代表基板(也称母板或系统板)
 '位置：//DZW/ROOT/CIMV2/CIM_ManagedSystemElement/CIM_PhysicalElement/CIM_PhysicalPackage/CIM_Card
 Public Function GetBaseBoardInfo()
  'instancesof只代表SWbemServices对象的一个简单查询  
  '复杂的查询需要使用SWbemServices.ExecQuery
  Set baseboard = objWMI.instancesof("win32_baseboard")
  
  For Each itembaseboard In baseboard 
   Call optstr.BuildStringHTML("主板厂商" , itembaseboard.Manufacturer)
   Call optstr.BuildStringHTML("主板型号" , itembaseboard.product)
   Call optstr.BuildStringHTML("主板物理编号", itembaseboard.SerialNumber)
   Call optstr.BuildStringHTML("电源打开状态",  _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("PoweredOn"), itembaseboard.PoweredOn))
   Call optstr.BuildStringHTML("运行状态", _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("Status"), itembaseboard.Status))
      Call optstr.BuildStringHTML("版本", itembaseboard.Version)
   Call optstr.BuildStringHTML("重量", itembaseboard.Weight)
   Call optstr.BuildStringHTML("宽度", itembaseboard.Width)
   Call optstr.BuildStringHTML("安装时间", itembaseboard.InstallDate)
  Next 
  optstr.SealHTML("主板")

  GetBaseBoardInfo = optstr.ReturnStrAndClear()
    End Function

 

     '取得CPU信息
  '注：Win32_Processor 类别代表 处理器
  '位置：//DZW/ROOT/CIMV2/CIM_ManagedSystemElement/CIM_LogicalElement/CIM_LogicalDevice/CIM_Processor
 Public Function GetCPUInfo()
  Set cpu = objWMI.instancesof("win32_processor")

  For Each itemcpu In cpu
   Call optstr.BuildStringHTML("CPU厂商" , itemcpu.Manufacturer)
   Call optstr.BuildStringHTML("CPU名称" , itemcpu.Name)
   Call optstr.BuildStringHTML("CPU标识", itemcpu.DeviceID)
   Call optstr.BuildStringHTML("CPU类型",  _
   ocommonopt.GetEnumValue(objEnum.CPUEnum("ProcessorType"), itemcpu.ProcessorType))
   Call optstr.BuildStringHTML("CPU系列类型",  _
   ocommonopt.GetEnumValue(objEnum.CPUEnum("Family"), itemcpu.Family))
   Call optstr.BuildStringHTML("CPU设计类型", _
   ocommonopt.GetEnumValue(objEnum.CPUEnum("Architecture"), itemcpu.Architecture))
   Call optstr.BuildStringHTML("当前状态", _
   ocommonopt.GetEnumValue(objEnum.CPUEnum("CpuStatus"), itemcpu.CpuStatus))
   Call optstr.BuildStringHTML("操作和非操作状态", _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("Status"), itemcpu.Status)) 
   Call optstr.BuildStringHTML("CPU运行状态信息", _
   ocommonopt.GetEnumValue(objEnum.CPUEnum("StatusInfo"), itemcpu.StatusInfo))
   Call optstr.BuildStringHTML("可用性", _
   ocommonopt.GetEnumValue(objEnum.CPUEnum("Availability"), itemcpu.Availability))
   Call optstr.BuildStringHTML("当前速度", itemcpu.CurrentClockSpeed)
   Call optstr.BuildStringHTML("当前最快速度(赫兹)", itemcpu.MaxClockSpeed)
   Call optstr.BuildStringHTML("当前电压", itemcpu.CurrentVoltage)
   Call optstr.BuildStringHTML("地址宽度(位)", itemcpu.AddressWidth)
   Call optstr.BuildStringHTML("数据宽度(位)", itemcpu.DataWidth)
   Call optstr.BuildStringHTML("外部时钟频率", itemcpu.ExtClock)
   Call optstr.BuildStringHTML("二级缓存大小", itemcpu.L2CacheSize)
   Call optstr.BuildStringHTML("二级缓存时钟速度", itemcpu.L2CacheSpeed)
   Call optstr.BuildStringHTML("最后一秒负载能量", itemcpu.LoadPercentage)
   Call optstr.BuildStringHTML("即插即用ID", itemcpu.PNPDeviceID)
   Call optstr.BuildStringHTML("CPU功能特有信息", itemcpu.ProcessorId)
   Call optstr.BuildStringHTML("CPU角色", itemcpu.Role)
   Call optstr.BuildStringHTML("芯片插槽种类", itemcpu.SocketDesignation)
   Call optstr.BuildStringHTML("插座信息", itemcpu.UpgradeMethod)
   Call optstr.BuildStringHTML("作用域计算机系统名称", itemcpu.SystemName)
   Call optstr.BuildStringHTML("CPU版本", itemcpu.Version)
   Call optstr.BuildStringHTML("CPU描述", itemcpu.Caption)
   Call optstr.BuildStringHTML("Win32配置管理程序错误" , _
   ocommonopt.GetEnumValue(objEnum.CPUEnum("ConfigManagerErrorCode"),itemcpu.ConfigManagerErrorCode))
   Call optstr.BuildStringHTML("安装时间", itemcpu.InstallDate)
  Next

  optstr.SealHTML("CPU")

  GetCPUInfo = optstr.ReturnStrAndClear()
 End Function

 

 '取得发热区温度信息
 '位置：//DZW/ROOT/WMI/MSAcpi/MSAcpi_ThermalZoneTemperature
 Public Function GetTemperatureInfo()
     If IsEmpty(objWMI1) Then
   Exit Function
     End If

  Set temperature = objWMI1.instancesof("MSAcpi_ThermalZoneTemperature")

  If IsNull(temperature) = true Then
	  For Each itemtemperature In temperature
	   Call optstr.BuildStringHTML("实例名称" , itemtemperature.InstanceName)
	   Call optstr.BuildStringHTML("当前温度" , CStr((CDbl(itemtemperature.CurrentTemperature)-2732)/10))
	   Call optstr.BuildStringHTML("取样周期" , itemtemperature.SamplingPeriod)
	   Call optstr.BuildStringHTML("第一个热物理常数" , itemtemperature.ThermalConstant1)
	   Call optstr.BuildStringHTML("第二个热物理常数" , itemtemperature.ThermalConstant2)
	   Call optstr.BuildStringHTML("热信息改变的标识" , itemtemperature.ThermalStamp)

				'**预留属性**
	   'Call optstr.BuildStringHTML("Active" , itemtemperature.Active)
	   'Call optstr.BuildStringHTML("ActiveTripPointCount" , itemtemperature.ActiveTripPointCount)
	   'Call optstr.BuildStringHTML("CriticalTripPoint" , itemtemperature.CriticalTripPoint)
	   'Call optstr.BuildStringHTML("PassiveTripPoint" , itemtemperature.PassiveTripPoint)
	   'Call optstr.BuildStringHTML("Reserved" , itemtemperature.Reserved)
	   '************
	  Next
  End if

     optstr.SealHTML("CPU温度")

  GetTemperatureInfo = optstr.ReturnStrAndClear()
 End Function

 

 '取得内存信息
 'Win32_PhysicalMemory 类别 代表 操作系统的内存条
 '位置：//DZW/ROOT/CIMV2/CIM_ManagedSystemElement/CIM_PhysicalElement/CIM_PhysicalComponent/CIM_Chip/CIM_PhysicalMemory
Public Function GetMemoryInfo()
  Set physicalmemory = objWMI.instancesof("Win32_PhysicalMemory")

  For Each itemphysicalmemory In physicalmemory
   Call optstr.BuildStringHTML("内存厂商" , itemphysicalmemory.Manufacturer)
   Call optstr.BuildStringHTML("内存名称" , itemphysicalmemory.Name)
   Call optstr.BuildStringHTML("内存编号", itemphysicalmemory.PartNumber)
   Call optstr.BuildStringHTML("内存物理编号", itemphysicalmemory.SerialNumber)
   Call optstr.BuildStringHTML("物理内存总容量(M)", Round((itemphysicalmemory.Capacity/1024^2),2))
   Call optstr.BuildStringHTML("内存类型",  _
   ocommonopt.GetEnumValue(objEnum.PhysicalMemoryEnum("MemoryType"), itemphysicalmemory.MemoryType))
   Call optstr.BuildStringHTML("操作和非操作状态", _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("Status"), itemphysicalmemory.Status))
   Call optstr.BuildStringHTML("速度(纳秒)", itemphysicalmemory.Speed)
   Call optstr.BuildStringHTML("数据宽度(位)", itemphysicalmemory.DataWidth)
   Call optstr.BuildStringHTML("内存总宽度(位)", itemphysicalmemory.TotalWidth)
   Call optstr.BuildStringHTML("内存位置", itemphysicalmemory.BankLabel)
   Call optstr.BuildStringHTML("内存所在电路板", itemphysicalmemory.DeviceLocator)
   Call optstr.BuildStringHTML("芯片执行格式", itemphysicalmemory.FormFactor)
   Call optstr.BuildStringHTML("是否支持热替换", itemphysicalmemory.HotSwappable)
   Call optstr.BuildStringHTML("交错访问数据最大行数", itemphysicalmemory.InterleaveDataDepth)
   Call optstr.BuildStringHTML("交替中内存的位置",  _
   ocommonopt.GetEnumValue(objEnum.PhysicalMemoryEnum("InterleavePosition"), itemphysicalmemory.InterleavePosition))
   Call optstr.BuildStringHTML("电源打开状态",  _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("PoweredOn"), itemphysicalmemory.PoweredOn))
   Call optstr.BuildStringHTML("内存版本", itemphysicalmemory.Version)
   Call optstr.BuildStringHTML("内存描述", itemphysicalmemory.Description)
   Call optstr.BuildStringHTML("安装时间", itemphysicalmemory.InstallDate)
  Next

     optstr.SealHTML("内存")

  GetMemoryInfo = optstr.ReturnStrAndClear()
 End Function

 

    '取得硬盘信息
    'Win32_DiskDrive 类别代表物理磁盘驱动器
 '位置： //DZW/ROOT/CIMV2/CIM_ManagedSystemElement/CIM_LogicalElement/CIM_LogicalDevice/CIM_MediaAccessDevice/CIM_DiskDrive
    Public Function GetDiskDriveInfo()
  Set diskdrive = objWMI.instancesof("Win32_DiskDrive")

  For Each itemdiskdrive In diskdrive
   If not isnull(itemdiskdrive.size) Then
       '多个磁盘信息加入分隔符 区分
    If itemdiskdrive.index <> 0 Then
     Call optstr.BuildStringHTML("---------------------" , "")
    End If 
                
    Call optstr.BuildStringHTML("厂商" , itemdiskdrive.Manufacturer)
    Call optstr.BuildStringHTML("名称" , itemdiskdrive.Name)
    Call optstr.BuildStringHTML("硬盘总容量(M)",  Round((itemdiskdrive.size/1024^2), 2))
    Call optstr.BuildStringHTML("分区数" , itemdiskdrive.Partitions)
    Call optstr.BuildStringHTML("每个扇区字节数" , itemdiskdrive.BytesPerSector)
    Call optstr.BuildStringHTML("默认块大小(字节)" , itemdiskdrive.DefaultBlockSize)
    Call optstr.BuildStringHTML("物理编号" , itemdiskdrive.DeviceID)
    Call optstr.BuildStringHTML("物理驱动号" , itemdiskdrive.Index)
    Call optstr.BuildStringHTML("即插即用ID" , itemdiskdrive.PNPDeviceID)
    Call optstr.BuildStringHTML("SCSI主线号" , itemdiskdrive.SCSIBus)
    Call optstr.BuildStringHTML("SCSI逻辑单位号(LUN)" , itemdiskdrive.SCSILogicalUnit)
    Call optstr.BuildStringHTML("SCSI端口号" , itemdiskdrive.SCSIPort)
    Call optstr.BuildStringHTML("SCSI的ID号" , itemdiskdrive.SCSITargetId)
    Call optstr.BuildStringHTML("每个磁道的扇区数" , itemdiskdrive.SectorsPerTrack)
    Call optstr.BuildStringHTML("数字签名" , itemdiskdrive.Signature)
    Call optstr.BuildStringHTML("最大块规格(字节)" , itemdiskdrive.MaxBlockSize)
    Call optstr.BuildStringHTML("所支持最大容量(千字节)" , itemdiskdrive.MaxMediaSize)
    Call optstr.BuildStringHTML("是否加载" ,  _
    ocommonopt.GetEnumValue(objEnum.CommonEnum("PoweredOn"),  itemdiskdrive.MediaLoaded))
    Call optstr.BuildStringHTML("种类" , itemdiskdrive.MediaType)
    Call optstr.BuildStringHTML("最小模块规格(字节)" , itemdiskdrive.MinBlockSize)
    Call optstr.BuildStringHTML("制造商型号" , itemdiskdrive.Model)
    Call optstr.BuildStringHTML("是否需要清理" ,  _
    ocommonopt.GetEnumValue(objEnum.CommonEnum("PoweredOn"),  itemdiskdrive.NeedsCleaning))
    Call optstr.BuildStringHTML("柱面总数" , itemdiskdrive.TotalCylinders)
    Call optstr.BuildStringHTML("磁头总数" , itemdiskdrive.TotalHeads)
    Call optstr.BuildStringHTML("扇面总数" , itemdiskdrive.TotalSectors)
    Call optstr.BuildStringHTML("磁道总数" , itemdiskdrive.TotalTracks)
    Call optstr.BuildStringHTML("每个柱面磁道数量" , itemdiskdrive.TracksPerCylinder)
    Call optstr.BuildStringHTML("操作和非操作状态", _
    ocommonopt.GetEnumValue(objEnum.CommonEnum("Status"), itemdiskdrive.Status))
    Call optstr.BuildStringHTML("标题" , itemdiskdrive.Caption)
    Call optstr.BuildStringHTML("描述" , itemdiskdrive.Description)
   End If
  Next

     optstr.SealHTML("硬盘")

  GetDiskDriveInfo = optstr.ReturnStrAndClear()
 End Function

 

    '取得光驱信息
    'Win32_CDROMDrive 类别代表 CD-ROM 驱动器
 '位置： //DZW/ROOT/CIMV2/CIM_ManagedSystemElement/CIM_LogicalElement/CIM_LogicalDevice/CIM_MediaAccessDevice/CIM_CDROMDrive
Public Function GetCDROMDriveInfo()
  Set cdromdrive = objWMI.instancesof("Win32_CDROMDrive") 
        
  For Each itemcdromdrive In cdromdrive
   Call optstr.BuildStringHTML("厂商" , itemcdromdrive.Manufacturer)
   Call optstr.BuildStringHTML("名称" , itemcdromdrive.Name)
   If not isnull(itemcdromdrive.size) Then
    Call optstr.BuildStringHTML("光驱总容量(M)",  Round((itemcdromdrive.size/1024^2), 2))
   End If

   Call optstr.BuildStringHTML("默认块大小(字节)" , itemcdromdrive.DefaultBlockSize)
   Call optstr.BuildStringHTML("物理编号" , itemcdromdrive.DeviceID)
   Call optstr.BuildStringHTML("驱动号" , itemcdromdrive.Drive)
   Call optstr.BuildStringHTML("被识别驱动号" , itemcdromdrive.Id)
   Call optstr.BuildStringHTML("SCSI主线号" , itemcdromdrive.SCSIBus)
   Call optstr.BuildStringHTML("SCSI逻辑单位号(LUN)" , itemcdromdrive.SCSILogicalUnit)
   Call optstr.BuildStringHTML("SCSI端口号" , itemcdromdrive.SCSIPort)
   Call optstr.BuildStringHTML("SCSI的ID号" , itemcdromdrive.SCSITargetId)
   Call optstr.BuildStringHTML("是否可准确读取数据"  , _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("PoweredOn"),  itemcdromdrive.DriveIntegrity))
   Call optstr.BuildStringHTML("支持文件名最大长度" , itemcdromdrive.MaxBlockSize)
   Call optstr.BuildStringHTML("最大块规格(字节)" , itemcdromdrive.MaxBlockSize)
   Call optstr.BuildStringHTML("所支持最大容量(千字节)" , itemcdromdrive.MaxMediaSize)
   Call optstr.BuildStringHTML("是否在驱动器中" , _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("PoweredOn"), itemcdromdrive.MediaLoaded))
   Call optstr.BuildStringHTML("种类" , itemcdromdrive.MediaType)
   Call optstr.BuildStringHTML("最小模块规格(字节)" , itemcdromdrive.MinBlockSize)
   Call optstr.BuildStringHTML("是否需要清理" ,  _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("PoweredOn"),  itemcdromdrive.NeedsCleaning))
   Call optstr.BuildStringHTML("传送率" , itemcdromdrive.TransferRate)
   Call optstr.BuildStringHTML("卷名" , itemcdromdrive.VolumeName)
   Call optstr.BuildStringHTML("操作和非操作状态", _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("Status"), itemcdromdrive.Status))
   Call optstr.BuildStringHTML("标题" , itemcdromdrive.Caption)
   Call optstr.BuildStringHTML("描述" , itemcdromdrive.Description)
   Call optstr.BuildStringHTML("安装日期" , itemcdromdrive.InstallDate)
   Call optstr.BuildStringHTML("---------------------" , "")
  Next

  optstr.SealHTML("光驱")

  GetCDROMDriveInfo = optstr.ReturnStrAndClear()
 End Function


    '取得键盘信息
    'Win32_Keyboard 类别代表安装在 Win32 系统上的键盘
 '位置： //DZW/ROOT/CIMV2/CIM_ManagedSystemElement/CIM_LogicalElement/CIM_LogicalDevice/CIM_UserDevice/CIM_Keyboard
    Public Function GetKeyBoardInfo()
  Set keyboard = objWMI.instancesof("Win32_Keyboard") 
        
  For Each itemkeyboard In keyboard
      Call optstr.BuildStringHTML("名称" , itemkeyboard.Name)
   Call optstr.BuildStringHTML("物理编号" , itemkeyboard.DeviceID)
   Call optstr.BuildStringHTML("即插即用ID" , itemkeyboard.PNPDeviceID)
   Call optstr.BuildStringHTML("是否锁定"  , _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("PoweredOn"),  itemkeyboard.IsLocked))
   Call optstr.BuildStringHTML("键盘的格式和布局" , itemkeyboard.Layout)
   Call optstr.BuildStringHTML("功能键数目" , itemkeyboard.NumberOfFunctionKeys)
   Call optstr.BuildStringHTML("键盘是否启用硬件密码" , _
   ocommonopt.GetEnumValue(objEnum.KeyBoradEnum("Password"), itemkeyboard.Password))
   Call optstr.BuildStringHTML("操作和非操作状态" , _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("Status"), itemkeyboard.Status))
   Call optstr.BuildStringHTML("标题" , itemkeyboard.Caption)
   Call optstr.BuildStringHTML("描述" , itemkeyboard.Description)
   Call optstr.BuildStringHTML("安装日期" , itemkeyboard.InstallDate)
  Next

     optstr.SealHTML("键盘")

  GetKeyBoardInfo = optstr.ReturnStrAndClear()
 End Function

 

    '取得鼠标信息
    'Win32_PointingDevice 类别代表用来指向和选择 Win32 计算机系统显示上的区域
 '位置： //DZW/ROOT/CIMV2/CIM_ManagedSystemElement/CIM_LogicalElement/CIM_LogicalDevice/CIM_UserDevice/CIM_PointingDevice
    Public Function GetPointingDeviceInfo()
  Set pointingdevice = objWMI.instancesof("Win32_PointingDevice") 
        
  For Each itempointingdevice In pointingdevice
   Call optstr.BuildStringHTML("厂商" , itempointingdevice.Manufacturer)
   Call optstr.BuildStringHTML("名称" , itempointingdevice.Name)
   Call optstr.BuildStringHTML("物理编号" , itempointingdevice.DeviceID)
   Call optstr.BuildStringHTML("即插即用ID" , itempointingdevice.PNPDeviceID)
   Call optstr.BuildStringHTML("是否锁定" , _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("PoweredOn"),  itempointingdevice.IsLocked))
   Call optstr.BuildStringHTML("指示设备的界面类型" , _
   ocommonopt.GetEnumValue(objEnum.PointingDeviceEnum("DeviceInterface"), itempointingdevice.DeviceInterface))
   Call optstr.BuildStringHTML("操作配置" , _
   ocommonopt.GetEnumValue(objEnum.PointingDeviceEnum("Handedness"), itempointingdevice.Handedness))
   Call optstr.BuildStringHTML("被指向的硬件类别种类" , itempointingdevice.HardwareType)
   Call optstr.BuildStringHTML("鼠标的.inf文件的名称" , itempointingdevice.InfFileName)
   Call optstr.BuildStringHTML("鼠标的.inf 文件的段" , itempointingdevice.InfSection)
   Call optstr.BuildStringHTML("按钮数" , itempointingdevice.NumberOfButtons)
   Call optstr.BuildStringHTML("类别" , _
   ocommonopt.GetEnumValue(objEnum.PointingDeviceEnum("PointingType"), itempointingdevice.PointingType))
   Call optstr.BuildStringHTML("跟踪分辨率" , itempointingdevice.Resolution)
   Call optstr.BuildStringHTML("轮询输入信息的速率" , itempointingdevice.SampleRate)
   Call optstr.BuildStringHTML("操作和非操作状态" , _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("Status"), itempointingdevice.Status))
   Call optstr.BuildStringHTML("标题" , itempointingdevice.Caption)
   Call optstr.BuildStringHTML("描述" , itempointingdevice.Description)
   Call optstr.BuildStringHTML("安装日期" , itempointingdevice.InstallDate)
   Call optstr.BuildStringHTML("---------------------" , "")
  Next

     optstr.SealHTML("鼠标")

  GetPointingDeviceInfo = optstr.ReturnStrAndClear()
 End Function

 

    '取得显示器信息
    'Win32_DesktopMonitor 类别代表连接在计算机系统上的控制器或显示设备的监视器种类
 '位置： //DZW/ROOT/CIMV2/CIM_ManagedSystemElement/CIM_LogicalElement/CIM_LogicalDevice/CIM_UserDevice/CIM_Display/CIM_DesktopMonitor
    Public Function GetDesktopMonitorInfo()
  Set desktopmonitor = objWMI.instancesof("Win32_DesktopMonitor")

  For Each itemdesktopmonitor In desktopmonitor
   If Not IsNull(itemdesktopmonitor.ScreenHeight) And Not IsNull(itemdesktopmonitor.ScreenWidth) Then
       '注：此处无INDEX属性 原因不明
    'If itemdesktopmonitor.index <> 0 Then
     'Call optstr.BuildStringHTML("---------------------" , "")
    'End If

    Call optstr.BuildStringHTML("厂商" , itemdesktopmonitor.MonitorManufacturer)
    Call optstr.BuildStringHTML("名称" , itemdesktopmonitor.Name)
    Call optstr.BuildStringHTML("物理编号" , itemdesktopmonitor.DeviceID)
    Call optstr.BuildStringHTML("监视器带宽(MegaHertz)" , itemdesktopmonitor.Bandwidth)
    Call optstr.BuildStringHTML("即插即用ID" , itemdesktopmonitor.PNPDeviceID)
    Call optstr.BuildStringHTML("是否锁定" , _
    ocommonopt.GetEnumValue(objEnum.CommonEnum("PoweredOn"),  itemdesktopmonitor.IsLocked))
    Call optstr.BuildStringHTML("桌面监视器的种类或CRT" , _
    ocommonopt.GetEnumValue(objEnum.DesktopMonitorEnum("DisplayType"),  itemdesktopmonitor.DisplayType))
    Call optstr.BuildStringHTML("监视器的种类" , itemdesktopmonitor.MonitorType)
    Call optstr.BuildStringHTML("X 轴(水平方向)的分辨率" , itemdesktopmonitor.PixelsPerXLogicalInch)
    Call optstr.BuildStringHTML("Y 轴(纵向方向)的分辨率" , itemdesktopmonitor.PixelsPerYLogicalInch)
    Call optstr.BuildStringHTML("屏幕高度" , itemdesktopmonitor.ScreenHeight)
    Call optstr.BuildStringHTML("屏幕宽度" , itemdesktopmonitor.ScreenWidth)
    Call optstr.BuildStringHTML("操作和非操作状态" , _
    ocommonopt.GetEnumValue(objEnum.CommonEnum("Status"), itemdesktopmonitor.Status))
    Call optstr.BuildStringHTML("标题" , itemdesktopmonitor.Caption)
    Call optstr.BuildStringHTML("描述" , itemdesktopmonitor.Description)
    Call optstr.BuildStringHTML("安装日期" , itemdesktopmonitor.InstallDate)
   End if
  Next

     optstr.SealHTML("显示器")

  GetDesktopMonitorInfo = optstr.ReturnStrAndClear()
 End Function

 

    '取得操作系统信息
    'Win32 环境中操作的计算机系统
 '位置： //DZW/ROOT/CIMV2/CIM_ManagedSystemElement/CIM_LogicalElement/CIM_System/CIM_ComputerSystem/CIM_UnitaryComputerSystem
 Public Function GetComputerSystemInfo()
  Set computersystem = objWMI.instancesof("win32_computersystem")

  For Each itemcomputersystem In computersystem
   Call optstr.BuildStringHTML("操作系统厂商" , itemcomputersystem.Manufacturer)
   Call optstr.BuildStringHTML("产品名称" , itemcomputersystem.Model)
   Call optstr.BuildStringHTML("计算机系统名称" , itemcomputersystem.Name)
   Call optstr.BuildStringHTML("名称格式" , itemcomputersystem.NameFormat)
   Call optstr.BuildStringHTML("当前登陆用户名称" , itemcomputersystem.UserName)
   Call optstr.BuildStringHTML("工作组名称" , itemcomputersystem.Workgroup)
   Call optstr.BuildStringHTML("管理员密码状态" ,  _
   ocommonopt.GetEnumValue(objEnum.ComputerSystemEnum("AdminPasswordStatus"), itemcomputersystem.AdminPasswordStatus))
   Call optstr.BuildStringHTML("系统故障是否尝试重启" ,  _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("PoweredOn"), itemcomputersystem.AutomaticResetBootOption))
   Call optstr.BuildStringHTML("故障重启是否可用" ,  _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("PoweredOn"), itemcomputersystem.AutomaticResetCapability))
   Call optstr.BuildStringHTML("启动选项边界" , _
   ocommonopt.GetEnumValue(objEnum.ComputerSystemEnum("BootOptionOnLimit"), itemcomputersystem.BootOptionOnLimit))
   Call optstr.BuildStringHTML("超时启动选项" , _
   ocommonopt.GetEnumValue(objEnum.ComputerSystemEnum("BootOptionOnLimit"), itemcomputersystem.BootOptionOnWatchDog))
   Call optstr.BuildStringHTML("是否支持引导ROM" ,  _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("PoweredOn"), itemcomputersystem.BootROMSupported))
   Call optstr.BuildStringHTML("系统启动状态" , _
   ocommonopt.GetEnumValue(objEnum.ComputerSystemEnum("BootupState"), itemcomputersystem.BootupState))
   Call optstr.BuildStringHTML("外机启动状态" , _
   ocommonopt.GetEnumValue(objEnum.ComputerSystemEnum("ChassisBootupState"), itemcomputersystem.ChassisBootupState))
   Call optstr.BuildStringHTML("上一次启动外机电源状态"  , _
   ocommonopt.GetEnumValue(objEnum.ComputerSystemEnum("PowerSupplyState"), itemcomputersystem.PowerSupplyState))
   Call optstr.BuildStringHTML("时间偏移量(当前时区)" , itemcomputersystem.CurrentTimeZone)
   Call optstr.BuildStringHTML("夏时值是否有效" ,  _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("PoweredOn"), itemcomputersystem.DaylightInEffect))
   Call optstr.BuildStringHTML("是否认可夏时制" ,  _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("PoweredOn"), itemcomputersystem.EnableDaylightSavingsTime))
   Call optstr.BuildStringHTML("所属域名称" , itemcomputersystem.Domain)
   Call optstr.BuildStringHTML("域角色" , _
   ocommonopt.GetEnumValue(objEnum.ComputerSystemEnum("DomainRole"), itemcomputersystem.DomainRole))
   Call optstr.BuildStringHTML("是否存在红外(IR)端口" ,  _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("PoweredOn"), itemcomputersystem.InfraredSupported))
   Call optstr.BuildStringHTML("初始化信息" , itemcomputersystem.InitialLoadInfo)
   Call optstr.BuildStringHTML("重设按钮安全设置" , _
   ocommonopt.GetEnumValue(objEnum.ComputerSystemEnum("FrontPanelResetStatus"), itemcomputersystem.FrontPanelResetStatus))
   Call optstr.BuildStringHTML("键盘密码状态安全设置" , _
   ocommonopt.GetEnumValue(objEnum.ComputerSystemEnum("FrontPanelResetStatus"), itemcomputersystem.KeyboardPasswordStatus))
   Call optstr.BuildStringHTML("通电密码安全设置"  , _
   ocommonopt.GetEnumValue(objEnum.ComputerSystemEnum("FrontPanelResetStatus"), itemcomputersystem.PowerOnPasswordStatus))
   Call optstr.BuildStringHTML("网络服务器模式启用状态" ,  _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("PoweredOn"), itemcomputersystem.NetworkServerModeEnabled))
   Call optstr.BuildStringHTML("cpu数量" , itemcomputersystem.NumberOfProcessors)
   Call optstr.BuildStringHTML("特定电源能力" , _
   ocommonopt.GetEnumValue(objEnum.ComputerSystemEnum("PowerManagementCapabilities"), itemcomputersystem.PowerManagementCapabilities))
   Call optstr.BuildStringHTML("是否支持电源管理" ,  _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("PoweredOn"), itemcomputersystem.PowerManagementSupported))
   Call optstr.BuildStringHTML("电源状态" , _
   ocommonopt.GetEnumValue(objEnum.ComputerSystemEnum("PowerState"), itemcomputersystem.PowerState))
   Call optstr.BuildStringHTML("系统所有者联系信息" , itemcomputersystem.PrimaryOwnerContact)
   Call optstr.BuildStringHTML("系统所有者" , itemcomputersystem.PrimaryOwnerName)
   Call optstr.BuildStringHTML("硬件重设能力" , _
   ocommonopt.GetEnumValue(objEnum.ComputerSystemEnum("ChassisBootupState"), itemcomputersystem.ResetCapability))
   Call optstr.BuildStringHTML("上次手动重设后的自动重设数" , itemcomputersystem.ResetCount)
   Call optstr.BuildStringHTML("系统重设数" , itemcomputersystem.ResetLimit)
   'Call optstr.BuildStringHTML("系统在IT环境中的角色" , itemcomputersystem.Roles)
   Call optstr.BuildStringHTML("当前状态" ,  _
   ocommonopt.GetEnumValue(objEnum.CommonEnum("PoweredOn"), itemcomputersystem.Status))
   Call optstr.BuildStringHTML("启动延迟时间" , itemcomputersystem.SystemStartupDelay)
   Call optstr.BuildStringHTML("系统种类" , itemcomputersystem.SystemType)
   Call optstr.BuildStringHTML("上一次启动外机温度状态" , _
   ocommonopt.GetEnumValue(objEnum.ComputerSystemEnum("ChassisBootupState"), itemcomputersystem.ThermalState))
   Call optstr.BuildStringHTML("系统加电事件" , _
   ocommonopt.GetEnumValue(objEnum.ComputerSystemEnum("WakeUpType"),  itemcomputersystem.WakeUpType))
   Call optstr.BuildStringHTML("物理内存的总大小(M)" , Round((itemcomputersystem.TotalPhysicalMemory/1024^2),2))
   Call optstr.BuildStringHTML("标题" , itemcomputersystem.Caption)
   Call optstr.BuildStringHTML("描述" , itemcomputersystem.Description)
   Call optstr.BuildStringHTML("安装日期" , itemcomputersystem.InstallDate)
  Next

  optstr.SealHTML("操作系统")

  GetComputerSystemInfo = optstr.ReturnStrAndClear()
 End Function

 

    '取得进程信息
    'Win32_Process 类别代表在 Win32 系统上的进程
 '位置： //DZW/ROOT/CIMV2/CIM_ManagedSystemElement/CIM_LogicalElement/CIM_Process
 'Win_Process有3个
Public Function GetProcessInfo()
  Set process = objWMI.instancesof("Win32_Process")
  	Call optstr.BuildStringHTMLForBeginTR()
    Call optstr.BuildStringHTMLForProcess("名称" )
    Call optstr.BuildStringHTMLForProcess("启动进程所需命令行" )
    Call optstr.BuildStringHTMLForProcess("可执行文件路径" )
    'Call optstr.BuildStringHTMLForProcess("进程的操作条件" , _
    'ocommonopt.GetEnumValue(objEnum.ProcessEnum("ExecutionState"),  itemprocess.ExecutionState))
    Call optstr.BuildStringHTMLForProcess("进程句柄" )
    Call optstr.BuildStringHTMLForProcess("进程中线程打开句柄总数" )
    Call optstr.BuildStringHTMLForProcess("核心模式下时间(100纳秒)" )
    Call optstr.BuildStringHTMLForProcess("最大工作集大小" )
    Call optstr.BuildStringHTMLForProcess("最小工作集大小" )
    Call optstr.BuildStringHTMLForProcess("类别名称" )
    Call optstr.BuildStringHTMLForProcess("作用域系统名称" )
    Call optstr.BuildStringHTMLForProcess("读和写之外的I/O操作数" )
    Call optstr.BuildStringHTMLForProcess("读和写之外的数据传送量" )
    Call optstr.BuildStringHTMLForProcess("页错误数目" )
    Call optstr.BuildStringHTMLForProcess("当前使用的页面文件空白数" )
    Call optstr.BuildStringHTMLForProcess("创建这个进程的那个进程的唯一标识符" )
    Call optstr.BuildStringHTMLForProcess("最大的页面文件空白" )
    Call optstr.BuildStringHTMLForProcess("当前使用的页面文件空白数" )
    Call optstr.BuildStringHTMLForProcess("最大虚拟地址空间" )
    Call optstr.BuildStringHTMLForProcess("高峰工作集大小" )
    Call optstr.BuildStringHTMLForProcess("优先级" )
    Call optstr.BuildStringHTMLForProcess("指派的进程当前页数" )
    Call optstr.BuildStringHTMLForProcess("全局进程识别符" )
    Call optstr.BuildStringHTMLForProcess("非分页池使用的限额数目" )
    Call optstr.BuildStringHTMLForProcess("分页池使用的限额数目" )
    Call optstr.BuildStringHTMLForProcess("非分页池使用的高峰限额数目" )
    Call optstr.BuildStringHTMLForProcess("分页池使用的高峰限额数目" )
    Call optstr.BuildStringHTMLForProcess("读取操作的数" )
    Call optstr.BuildStringHTMLForProcess("数据读取数" )
    Call optstr.BuildStringHTMLForProcess("会话创建指定的惟一标识符" )
    Call optstr.BuildStringHTMLForProcess("停止或结束时间" )
    Call optstr.BuildStringHTMLForProcess("活动线程数目" )
    Call optstr.BuildStringHTMLForProcess("用户模式下的时间(100纳秒)" )
    Call optstr.BuildStringHTMLForProcess("虚拟地址空间的字节大小" )
    Call optstr.BuildStringHTMLForProcess("Windows 版本" )
    Call optstr.BuildStringHTMLForProcess("内存量(byte)" )
    Call optstr.BuildStringHTMLForProcess("写入操作的数" )
    Call optstr.BuildStringHTMLForProcess("写入读取数" )
    Call optstr.BuildStringHTMLForProcess("会话创建指定的惟一标识符" )
    Call optstr.BuildStringHTMLForProcess("会话创建指定的惟一标识符" )   
    Call optstr.BuildStringHTMLForProcess("操作和非操作状态" )
    Call optstr.BuildStringHTMLForProcess("标题" )
    Call optstr.BuildStringHTMLForProcess("描述" )
    Call optstr.BuildStringHTMLForProcess("安装日期" )
	Call optstr.BuildStringHTMLForEndTR()

  For Each itemprocess In process
  
	Call optstr.BuildStringHTMLForBeginTR()
	
    Call optstr.BuildStringHTMLForProcess( itemprocess.Name)
    Call optstr.BuildStringHTMLForProcess( itemprocess.CommandLine)
    Call optstr.BuildStringHTMLForProcess( itemprocess.ExecutablePath)
    'Call optstr.BuildStringHTMLForProcess( _
    'ocommonopt.GetEnumValue(objEnum.ProcessEnum("ExecutionState"),  itemprocess.ExecutionState))
    Call optstr.BuildStringHTMLForProcess( itemprocess.Handle)
    Call optstr.BuildStringHTMLForProcess( itemprocess.HandleCount)
    Call optstr.BuildStringHTMLForProcess( itemprocess.KernelModeTime)
    Call optstr.BuildStringHTMLForProcess( itemprocess.MaximumWorkingSetSize)
    Call optstr.BuildStringHTMLForProcess( itemprocess.MinimumWorkingSetSize)
    Call optstr.BuildStringHTMLForProcess( itemprocess.OSCreationClassName)
    Call optstr.BuildStringHTMLForProcess( itemprocess.OSName)
    Call optstr.BuildStringHTMLForProcess( itemprocess.OtherOperationCount)
    Call optstr.BuildStringHTMLForProcess( itemprocess.OtherTransferCount)
    Call optstr.BuildStringHTMLForProcess( itemprocess.PageFaults)
    Call optstr.BuildStringHTMLForProcess( itemprocess.PageFileUsage)
    Call optstr.BuildStringHTMLForProcess( itemprocess.ParentProcessId)
    Call optstr.BuildStringHTMLForProcess( itemprocess.PeakPageFileUsage)
    Call optstr.BuildStringHTMLForProcess( itemprocess.PeakVirtualSize)
    Call optstr.BuildStringHTMLForProcess( itemprocess.PageFileUsage)
    Call optstr.BuildStringHTMLForProcess( itemprocess.PeakWorkingSetSize)
    Call optstr.BuildStringHTMLForProcess( itemprocess.Priority)
    Call optstr.BuildStringHTMLForProcess( itemprocess.PrivatePageCount)
    Call optstr.BuildStringHTMLForProcess( itemprocess.ProcessId)
    Call optstr.BuildStringHTMLForProcess( itemprocess.QuotaNonPagedPoolUsage)
    Call optstr.BuildStringHTMLForProcess( itemprocess.QuotaPagedPoolUsage)
    Call optstr.BuildStringHTMLForProcess( itemprocess.QuotaPeakNonPagedPoolUsage)
    Call optstr.BuildStringHTMLForProcess( itemprocess.QuotaPeakPagedPoolUsage)
    Call optstr.BuildStringHTMLForProcess( itemprocess.ReadOperationCount)
    Call optstr.BuildStringHTMLForProcess( itemprocess.ReadTransferCount)
    Call optstr.BuildStringHTMLForProcess( itemprocess.SessionId)
    Call optstr.BuildStringHTMLForProcess( itemprocess.TerminationDate)
    Call optstr.BuildStringHTMLForProcess( itemprocess.ThreadCount)
    Call optstr.BuildStringHTMLForProcess( itemprocess.UserModeTime)
    Call optstr.BuildStringHTMLForProcess( itemprocess.VirtualSize)
    Call optstr.BuildStringHTMLForProcess( itemprocess.WindowsVersion)
    Call optstr.BuildStringHTMLForProcess( itemprocess.WorkingSetSize)
    Call optstr.BuildStringHTMLForProcess( itemprocess.WriteOperationCount)
    Call optstr.BuildStringHTMLForProcess( itemprocess.WriteTransferCount)
    Call optstr.BuildStringHTMLForProcess( itemprocess.SessionId)
    Call optstr.BuildStringHTMLForProcess( itemprocess.SessionId)   
    Call optstr.BuildStringHTMLForProcess( _
    ocommonopt.GetEnumValue(objEnum.CommonEnum("Status"), itemprocess.Status))
    Call optstr.BuildStringHTMLForProcess( itemprocess.Caption)
    Call optstr.BuildStringHTMLForProcess( itemprocess.Description)
    Call optstr.BuildStringHTMLForProcess( itemprocess.InstallDate)
	Call optstr.BuildStringHTMLForEndTR()
   ' Call optstr.BuildStringHTMLForProcess("---------------------" , "")
	
	
'    Call optstr.BuildStringHTML("名称" , itemprocess.Name)
'    Call optstr.BuildStringHTML("启动进程所需命令行" , itemprocess.CommandLine)
'    Call optstr.BuildStringHTML("可执行文件路径" , itemprocess.ExecutablePath)
'    'Call optstr.BuildStringHTML("进程的操作条件" , _
'    'ocommonopt.GetEnumValue(objEnum.ProcessEnum("ExecutionState"),  itemprocess.ExecutionState))
'    Call optstr.BuildStringHTML("进程句柄" , itemprocess.Handle)
'    Call optstr.BuildStringHTML("进程中线程打开句柄总数" , itemprocess.HandleCount)
'    Call optstr.BuildStringHTML("核心模式下时间(100纳秒)" , itemprocess.KernelModeTime)
'    Call optstr.BuildStringHTML("最大工作集大小" , itemprocess.MaximumWorkingSetSize)
'    Call optstr.BuildStringHTML("最小工作集大小" , itemprocess.MinimumWorkingSetSize)
'    Call optstr.BuildStringHTML("类别名称" , itemprocess.OSCreationClassName)
'    Call optstr.BuildStringHTML("作用域系统名称" , itemprocess.OSName)
'    Call optstr.BuildStringHTML("读和写之外的I/O操作数" , itemprocess.OtherOperationCount)
'    Call optstr.BuildStringHTML("读和写之外的数据传送量" , itemprocess.OtherTransferCount)
'    Call optstr.BuildStringHTML("页错误数目" , itemprocess.PageFaults)
'    Call optstr.BuildStringHTML("当前使用的页面文件空白数" , itemprocess.PageFileUsage)
'    Call optstr.BuildStringHTML("创建这个进程的那个进程的唯一标识符" , itemprocess.ParentProcessId)
'    Call optstr.BuildStringHTML("最大的页面文件空白" , itemprocess.PeakPageFileUsage)
'    Call optstr.BuildStringHTML("当前使用的页面文件空白数" , itemprocess.PeakVirtualSize)
'    Call optstr.BuildStringHTML("最大虚拟地址空间" , itemprocess.PageFileUsage)
'    Call optstr.BuildStringHTML("高峰工作集大小" , itemprocess.PeakWorkingSetSize)
'    Call optstr.BuildStringHTML("优先级" , itemprocess.Priority)
'    Call optstr.BuildStringHTML("指派的进程当前页数" , itemprocess.PrivatePageCount)
'    Call optstr.BuildStringHTML("全局进程识别符" , itemprocess.ProcessId)
'    Call optstr.BuildStringHTML("非分页池使用的限额数目" , itemprocess.QuotaNonPagedPoolUsage)
'    Call optstr.BuildStringHTML("分页池使用的限额数目" , itemprocess.QuotaPagedPoolUsage)
'    Call optstr.BuildStringHTML("非分页池使用的高峰限额数目" , itemprocess.QuotaPeakNonPagedPoolUsage)
'    Call optstr.BuildStringHTML("分页池使用的高峰限额数目" , itemprocess.QuotaPeakPagedPoolUsage)
'    Call optstr.BuildStringHTML("读取操作的数" , itemprocess.ReadOperationCount)
'    Call optstr.BuildStringHTML("数据读取数" , itemprocess.ReadTransferCount)
'    Call optstr.BuildStringHTML("会话创建指定的惟一标识符" , itemprocess.SessionId)
'    Call optstr.BuildStringHTML("停止或结束时间" , itemprocess.TerminationDate)
'    Call optstr.BuildStringHTML("活动线程数目" , itemprocess.ThreadCount)
'    Call optstr.BuildStringHTML("用户模式下的时间(100纳秒)" , itemprocess.UserModeTime)
'    Call optstr.BuildStringHTML("虚拟地址空间的字节大小" , itemprocess.VirtualSize)
'    Call optstr.BuildStringHTML("Windows 版本" , itemprocess.WindowsVersion)
'    Call optstr.BuildStringHTML("内存量(byte)" , itemprocess.WorkingSetSize)
'    Call optstr.BuildStringHTML("写入操作的数" , itemprocess.WriteOperationCount)
'    Call optstr.BuildStringHTML("写入读取数" , itemprocess.WriteTransferCount)
'    Call optstr.BuildStringHTML("会话创建指定的惟一标识符" , itemprocess.SessionId)
'    Call optstr.BuildStringHTML("会话创建指定的惟一标识符" , itemprocess.SessionId)   
'    Call optstr.BuildStringHTML("操作和非操作状态" , _
'    ocommonopt.GetEnumValue(objEnum.CommonEnum("Status"), itemprocess.Status))
'    Call optstr.BuildStringHTML("标题" , itemprocess.Caption)
'    Call optstr.BuildStringHTML("描述" , itemprocess.Description)
'    Call optstr.BuildStringHTML("安装日期" , itemprocess.InstallDate)
'    Call optstr.BuildStringHTML("---------------------" , "")

  Next

     optstr.SealHTML("进程")

  GetProcessInfo = optstr.ReturnStrAndClear()
 End Function
End Class

 

'''
'''取得电脑检测信息
'''参数 ：computerName(待检测计算机名称)
Public Function GetComputerInfo(computerName)
    Dim objWIMInfo, strComputerInfo

    Set objWIMInfo = new WMIInfo
    objWIMInfo.computerName = computerName

    strComputerInfo = strComputerInfo + objWIMInfo.GetBaseBoardInfo() '取得主板信息
    strComputerInfo = strComputerInfo + objWIMInfo.GetCPUInfo() '取得CPU信息
    strComputerInfo = strComputerInfo + objWIMInfo.GetTemperatureInfo '取得温度信息
    strComputerInfo = strComputerInfo + objWIMInfo.GetMemoryInfo() '取得内存信息
    strComputerInfo = strComputerInfo + objWIMInfo.GetDiskDriveInfo() '取得硬盘信息
    strComputerInfo = strComputerInfo + objWIMInfo.GetCDROMDriveInfo()'取得光驱信息
    strComputerInfo = strComputerInfo + objWIMInfo.GetKeyBoardInfo() '取得键盘信息
    strComputerInfo = strComputerInfo + objWIMInfo.GetPointingDeviceInfo() '取得鼠标信息
    strComputerInfo = strComputerInfo + objWIMInfo.GetDesktopMonitorInfo() '取得显示器信息
    strComputerInfo = strComputerInfo + objWIMInfo.GetComputerSystemInfo()'取得操作系统信息
    strComputerInfo = strComputerInfo + objWIMInfo.GetProcessInfo()'取得进程信息
    GetComputerInfo = strComputerInfo

    Set objWIMInfo = Nothing
End Function


Public Sub Main()
    Dim iehtml
    Dim infoHTML '待显示的电脑检测信息
    'Set iehtml = new IEHTML
	

    'infoHTML = "<table>"
    'infoHTML = infoHTML & "<tr align = 'center'><td colSpan = '2'>你好！</td></tr></table>"
    
	'iehtml.WriteInfo(GetComputerInfo("."))
	
	Dim fso
	Set fso = CreateObject("Scripting.FileSystemObject")
	
	Dim fwite
	set   fwite=fso.CreateTextFile("c:\sony\Machine_Info.htm",true)  
	Dim str
	Dim ret
	ret = GetComputerInfo(".") 
	str = "<HTML>" & _
"<HEAD>" & _
"<TITLE>电脑信息检测器</TITLE>" & _
	"<style type='text/css'>" & _
                           "body {" & _
                           "    color: purple;" & _
                           "    background-color: #d8da3d}" & _
                           "table {" & _
                           "    border-collapse:separate;" & _
                           "    bgcolor : #FFC080;" & _
                           "    border: 1px dotted gray;" & _
                           "    width : 100%}" & _
                           "td {" & _
                           "    bgcolor : #EFE7D6td}" & _
                           "</style>" & _
"</HEAD>" & _
"<BODY>" & _
"<Form>" & _
"<div align = 'center'>" & _
"<strong>电脑信息检测信息列表</strong>" & _
"</div>" & _
"</br></br>" & _
"<div id = 'divInfo'>" & _			
		ret & _
			"</div>"  & _
"</Form>" & _
"</BODY>" & _
"</HTML>" 
	
	
	fwite.write str
	fwite.close 
	
    'Set iehtml = nothing
    'MsgBox iehtml.IE.Document.documentElement.innerHTML
End Sub

Call Main