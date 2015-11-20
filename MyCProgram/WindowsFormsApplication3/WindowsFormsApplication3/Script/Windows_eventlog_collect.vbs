Include("publicGetInIfile.vbs")

Dim root 
root = CreateRootPath()

Dim subFolder
subFolder = root & "\Windows_Event_Log"

CreateSubFolder(subFolder)


Dim ips
Dim config
Set config = new ConfigurationHelp

Set ips = config.GetServerByHost()


Dim objKeys, objItems, i
objKeys = ips.Keys
objItems = ips.Items
For i = 0 To ips.Count - 1
	'WSH.Echo "Key=" & objKeys(i) & _
	'"Value=" & objItems(i).Module
 
	WriteLog  i & "/" & ips.Count & ":" & objKeys(i)

	
	Set objShell = CreateObject("Wscript.Shell")
	
	WriteLog  "net mapping to " & objKeys(i)
	objShell.Run "cmd /c net use \\" & objKeys(i) & " " & Password &" /USER:" & UserName,0,true
	
	WriteLog "Create Folder" & "\\" & objKeys(i) & "\c$\sony\" & TimeString & "\" & objKeys(i)
	objShell.Run "cmd /c mkdir \\" & objKeys(i) &"\c$\sony\" & TimeString & "\" & objKeys(i),0,true
	
	WriteLog "Export Application Event Log"
	objShell.Run "wevtutil epl Application C:\sony\" & TimeString & "\" & objKeys(i) & "\Application.evtx /r:" & objKeys(i) & " /u:" & UserName & " /p:" & Password & " /uni:true" ,0,true
	
	WriteLog "Export System Event Log"
	objShell.Run "wevtutil epl System C:\sony\" & TimeString & "\" & objKeys(i) & "\System.evtx /r:" & objKeys(i) & " /u:" & UserName & " /p:" & Password & " /uni:true" ,0,true
	
	WriteLog "Export Security Event Log"
	objShell.Run "wevtutil epl Security C:\sony\" & TimeString & "\" & objKeys(i) & "\Security.evtx /r:" & objKeys(i) & " /u:" & UserName & " /p:" & Password & " /uni:true" ,0,true
		
	WriteLog "Export Setup Event Log"
	objShell.Run "wevtutil epl Setup C:\sony\" & TimeString & "\" & objKeys(i) & "\Setup.evtx /r:" & objKeys(i) & " /u:"& UserName & " /p:"& Password & " /uni:true" ,0,true

	WriteLog "Copy to local"
	CopyFolder "\\" & objKeys(i) & "\c$\sony\" & TimeString & "\" & objKeys(i) & "" , subFolder

	objShell.Run "cmd /c del \\" & objKeys(i) & "\c$\sony\" & TimeString & "/Q" ,0,true
	objShell.Run "cmd /c rmdir \\" & objKeys(i) & "\c$\sony\" & TimeString & "/S/Q",0,true
	WriteLog "Successed."
 
 
Next



Sub Include(sInstFile) 
    Dim oFSO, f, s 
    Set oFSO = CreateObject("Scripting.FileSystemObject") 
    Set f = oFSO.OpenTextFile(sInstFile) 
    s = f.ReadAll 
    f.Close 
    ExecuteGlobal s 
End Sub 

