Include("publicGetIniFile.vbs")
On Error Resume Next

Dim root 
root = CreateRootPath()


Set oFSO = CreateObject("Scripting.FileSystemObject") 

Set txt = oFSO.CreateTextFile(root & "\StorageCapacity.csv",true) 
'Set txt = oFSO.CreateTextFile(root & "\" & GetNowTime() & ".csv",true) 
txt.WriteLine("Folder Name,Folder Size")

Dim allDiscName

allDiscName = GetDrive()



For i =0 To  UBound(allDiscName)
     Dim discname 
     discname = LCase(Left(allDiscName(i),2))
	 WriteLog "start to scan " & discname
     'Dim printdisc
     GetFolderSize discname ,txt
	 'WriteLog printdisc

     'txt.Write(printdisc)
Next
txt.close


WriteLog("End!")

Sub Include(sInstFile) 
    Dim oFSO, f, s 
    Set oFSO = CreateObject("Scripting.FileSystemObject") 
    Set f = oFSO.OpenTextFile(sInstFile) 
    s = f.ReadAll 
    f.Close 
    ExecuteGlobal s 
End Sub 