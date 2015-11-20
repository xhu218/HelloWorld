On Error Resume Next
Include("publicGetInIfile.vbs")

REM Dim dict1
REM Set dict1 = myget1.GetServerByHost()
REM Dim objKeys, objItems, i
REM objKeys = dict1.Keys
REM objItems = dict1.Items
REM For i = 0 To dict1.Count - 1
	REM WSH.Echo "Key=" & objKeys(i) & _
	REM "Value=" & objItems(i).Module
REM Next


Set objFSO = CreateObject("Scripting.FileSystemObject") 

Dim root 
root = CreateRootPath()

Dim subFolder
subFolder = root & "\Sonaps Log"
CreateSubFolder(subFolder)

Dim helper
Set helper = new ConfigurationHelp
Dim Modules
Modules = helper.GetServerByModule()
Set objShell = CreateObject("Wscript.Shell")
For Each m in Modules
	'WSH.Echo m.ToString()
	WriteLog "ModuleName : " & m.ModuleName()
	
	Dim mFolder
	mFolder = subFolder & "\" & m.ModuleName()
	CreateSubFolder(mFolder)
	
	For Each ip in m.IPs
		If IsNull(ip) OR ip = "" Then
			exit For
		End If
		WriteLog "IP : " & ip
		Dim ipFolder
		ipFolder = mFolder & "\" & ip
		CreateSubFolder(ipFolder)
		
		WriteLog  "net mapping to " & ip
		objShell.Run "cmd /c net use \\"& ip & " "& Password &" /USER:"& UserName,0,true	
		
		WriteLog "Copy to local"
		For Each l in m.Logs
			'WSH.Echo l
			Dim t
			t = Replace(l,"C:","C$")
			CopyFolder "\\"& ip &  "\" & t, ipFolder
		Next
	Next
	
Next

Set objShell = Nothing

Sub Include(sInstFile) 
    Dim oFSO, f, s 
    Set oFSO = CreateObject("Scripting.FileSystemObject") 
    Set f = oFSO.OpenTextFile(sInstFile) 
    s = f.ReadAll 
    f.Close 
    ExecuteGlobal s 
End Sub 