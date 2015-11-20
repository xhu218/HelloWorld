Include("publicGetInIfile.vbs")

Set objShell = CreateObject("Wscript.Shell")

Dim rootPath
rootPath = CreateRootPath()

Dim subFolder
subFolder = rootPath & "\" & "ARCHIVE_DB"

CreateSubFolder(subFolder)

Dim fso
Set fso = CreateObject("Scripting.FileSystemObject")
dim   fread,str

set   fread=fso.opentextfile("Arcdb_health_diagnosis.sql",1,true)  
str=fread.readall  
fread.close 

str = Replace(str,"databaseuser",Archive_DB_User_Name)
str = Replace(str,"databasepassword",Archive_DB_Password)
str = Replace(str,"databasesid",Archive_DB_SID)
str = Replace(str,"C:\dynamicalPath\result\date\archive",subFolder)

Dim fwite
set   fwite=fso.CreateTextFile("Arcdb_health_diagnosis_1.sql",true)  
fwite.write str 
fwite.close 


WriteLog "start..."
objShell.Run "cmd /c Arcdb_health_diagnosis.bat",1,true
'objShell.Run "sqlplus /nolog @Arcdb_health_diagnosis_1.sql",1,True


Sub Include(sInstFile) 
    Dim oFSO, f, s 
    Set oFSO = CreateObject("Scripting.FileSystemObject") 
    Set f = oFSO.OpenTextFile(sInstFile) 
    s = f.ReadAll 
    f.Close 
    ExecuteGlobal s 
End Sub 

