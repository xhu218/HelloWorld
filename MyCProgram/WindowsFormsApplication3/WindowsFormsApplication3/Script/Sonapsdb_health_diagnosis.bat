echo off
echo The script will diagnosis for Oracle health
echo ........................................

exp databaseuser/databasepassword@databasesid tables=(GTM_TASKSTEPS) file=C:\dynamicalPath\result\date\sonaps\GTM_TASKSTEPS.dmp 
exp databaseuser/databasepassword@databasesid tables=(GTM_MODULETASKS) file=C:\dynamicalPath\result\date\sonaps\GTM_MODULETASKS.dmp

sqlplus /nolog @"Sonapsdb_health_diagnosis_1.sql"