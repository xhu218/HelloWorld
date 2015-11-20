Include("publicGetIniFile.vbs")
On Error Resume Next

Set objShell = CreateObject("Wscript.Shell")


Dim root 
root = CreateRootPath()

Dim subFolder
subFolder = root & "\Machine_Info"

CreateSubFolder(subFolder)

Dim ips
Dim config
Set config = new ConfigurationHelp

Set ips = config.GetServerByHost()


Dim objKeys, objItems, i
objKeys = ips.Keys
objItems = ips.Items

Const ForReading = 1 '定义常量


For i = 0 To ips.Count - 1

	Dim ipFolder
	ipFolder = subFolder & "\" & objKeys(i)
	WriteLog  i & "/" & ips.Count & ":" & objKeys(i)
	
	WriteLog  "net mapping to " & objKeys(i)
	objShell.Run "cmd /c net use \\" & objKeys(i) & " " & Password &" /USER:" & UserName,0,true
	objShell.Run "cmd /c copy Machine_info_collect_actor.vbs \\" & objKeys(i) & "\c$\sony /y",0,true
	objShell.Run "cmd /c mkdir " & ipFolder,0,true
	
	Dim objFSO, objTextFile, strNextLine
    Set objFSO = CreateObject("Scripting.FileSystemObject") '建立FSO对象
	
	objShell.Run "cmd /c del c:\sony\time.txt /Q" ,0,true
	objShell.Run "cmd /c net time \\" & objKeys(i) & ">>c:\sony\time.txt",0,true	

    Set objTextFile = objFSO.OpenTextFile("c:\sony\time.txt", ForReading)'打开文档		
    Do Until objTextFile.AtEndOfStream   
        strNextLine = objTextFile.ReadLine	

		Dim time
		time = Split(strNextLine," ")
		'WSH.Echo time(UBound(time))
		
		Dim t
		t = DateAdd("s","60", time(UBound(time)))
		'WSH.Echo t	
		
		objShell.Run "cmd /c at \\" & objKeys(i) & " " & t & " c:\sony\Machine_info_collect_actor.vbs"  ,0,true			
		wscript.sleep 60*1000 
		objShell.Run "cmd /c copy \\" & objKeys(i) & "\c$\sony\Machine_Info.htm " & ipFolder,0,true		
		
		objShell.Run "cmd /c del \\" & objKeys(i) & "\c$\sony\Machine_info_collect_actor.vbs /Q" ,0,true
		objShell.Run "cmd /c del \\" & objKeys(i) & "\c$\sony\Machine_Info.htm /Q" ,0,true
		
		exit Do
	Loop
	objTextFile.close	
Next

Sub Include(sInstFile) 
    Dim oFSO, f, s 
    Set oFSO = CreateObject("Scripting.FileSystemObject") 
    Set f = oFSO.OpenTextFile(sInstFile) 
    s = f.ReadAll 
    f.Close 
    ExecuteGlobal s 
End Sub 