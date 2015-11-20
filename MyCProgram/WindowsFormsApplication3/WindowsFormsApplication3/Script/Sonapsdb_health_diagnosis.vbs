Include("publicGetInIfile.vbs")

Set objShell = CreateObject("Wscript.Shell")

Dim rootPath
rootPath = CreateRootPath()

Dim subFolder
subFolder = rootPath & "\" & "SONAPS_DB"

CreateSubFolder(subFolder)

Dim fso
Set fso = CreateObject("Scripting.FileSystemObject")
dim   fread,str

set   fread=fso.opentextfile("Sonapsdb_health_diagnosis.bat",1,true)  
str=fread.readall  
fread.close 

str = Replace(str,"databaseuser",SONAPS_DB_User_Name)
str = Replace(str,"databasepassword",SONAPS_DB_Password)
str = Replace(str,"databasesid",SONAPS_DB_SID)
str = Replace(str,"C:\dynamicalPath\result\date\sonaps",subFolder)

Dim fwite
set   fwite=fso.CreateTextFile("Sonapsdb_health_diagnosis_1.bat",true)  
fwite.write str 
fwite.close 

''''''''''''''''

set   fread=fso.opentextfile("Sonapsdb_health_diagnosis.sql",1,true)  
str=fread.readall  
fread.close 

str = Replace(str,"databaseuser",SONAPS_DB_User_Name)
str = Replace(str,"databasepassword",SONAPS_DB_Password)
str = Replace(str,"databasesid",SONAPS_DB_SID)
str = Replace(str,"C:\dynamicalPath\result\date\sonaps",subFolder)


set   fwite=fso.CreateTextFile("Sonapsdb_health_diagnosis_1.sql",true)  
fwite.write str 
fwite.close 



WriteLog ("start...")
objShell.Run "cmd /c Sonapsdb_health_diagnosis_1.bat",1,true


Sub Include(sInstFile) 
    Dim oFSO, f, s 
    Set oFSO = CreateObject("Scripting.FileSystemObject") 
    Set f = oFSO.OpenTextFile(sInstFile) 
    s = f.ReadAll 
    f.Close 
    ExecuteGlobal s 
End Sub 

