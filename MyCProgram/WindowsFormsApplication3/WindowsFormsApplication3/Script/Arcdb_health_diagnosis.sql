set wrap off
set linesize 1500

set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\archive\redo_log.txt"
select * from v$log;
spool off
set echo off

set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\archive\all_tablename.txt"
select table_name from user_tables;
spool off
set echo off



set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\archive\data_file.txt"
col User(%) format a10;
col Online_Status format a15;
select
b.file_name,b.tablespace_name,b.autoextensible,b.bytes/1024/1024 as "Size(MB)",(b.bytes-sum(nvl(a.bytes,0)))/1024/1024 as "Used(MB)",substr((b.bytes-sum(nvl(a.bytes,0)))/(b.bytes)*100,1,5) as "User(%)",b.status,b.online_status as "Online_Status"
from dba_free_space a,dba_data_files b
where a.file_id=b.file_id
group by b.tablespace_name,b.file_name,b.bytes,b.autoextensible,b.status,b.online_status
order by b.tablespace_name;
spool off
set echo off



set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\archive\index.txt"
select index_name,index_type,table_name,status from user_indexes;
spool off
set echo off




set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\archive\profile.txt"
select * from dba_profiles;
spool off
set echo off


set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\archive\parameter.txt"
show parameter
spool off
set echo off


set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\archive\process.txt"
show parameter process;
select count(*) from v$process;
spool off
set echo off


set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\archive\session.txt"
show parameter session;
select count(*) from v$session;
select saddr,sid,serial#,paddr,username,status from v$session where username='databaseuser';
select machine,status,count(*) from v$session where username='databaseuser' group by machine,status order by status;
spool off
set echo off


set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\archive\Memory_usage.txt"
show parameter target
select 'SGA' as name,round(sum(value)/1024/1024,2)||'M' as "SIZE(M)" from v$sga;
select 'PGA' as name,round(value/1024/1024,2)||'M' as "SIZE(M)" from v$pgastat where name='total PGA allocated';
spool off
set echo off



set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\archive\flash_recovery.txt"
show parameter recovery
select file_type,percent_space_used,number_of_files from v$flash_recovery_area_usage;
spool off
set echo off


set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\archive\detailed_session.txt"
select count(*) from V$process;
select count(*) from V$session where status like 'ACTIVE';
select count(*) from V$session where status like 'INACTIVE';
select count(*) from V$session where status like 'ACTIVE' and program like 'dllhost.exe';
select count(*) from V$session where status like 'INACTIVE' and program like 'dllhost.exe';
select count(*) from V$session where status like 'ACTIVE' and program like 'w3wp.exe';
select count(*) from V$session where status like 'INACTIVE' and program like 'w3wp.exe';
select count(*) from V$session where status like 'ACTIVE' and program like 'java.exe';
select count(*) from V$session where status like 'INACTIVE' and program like 'java.exe';
select program from V$session where status like 'ACTIVE';
select program from V$session where status like 'INACTIVE';
spool off
set echo off







set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\archive\table_count.txt"

select count(*) from	RMS_WFAM;
select count(*) from	TBL_ALLSLOTINFO;
select count(*) from	TBL_EVENTLOG;
select count(*) from	TBL_ARCHFILEINFO;
select count(*) from	TBL_ARCHIVEDFILE;
select count(*) from	TBL_TAPELIBSLOT;
select count(*) from	TBL_TAPEINDX;
select count(*) from	TBL_TAPE;
select count(*) from	TBL_HDBUFPOOL;
select count(*) from	TBL_HDBUFDRV;
select count(*) from	TBL_REQUEST_FILE_HISTORY;
select count(*) from	TBL_REQUEST_FILE;
select count(*) from	TBL_REQUEST_INSTANCE_HISTORY;
select count(*) from	TBL_REQUEST_INSTANCE;
select count(*) from	TBL_REQUEST_FTPINFO;
select count(*) from	TBL_REQUEST_HISTORY;
select count(*) from	TBL_REQUEST;
select count(*) from	TBL_TRANSFER_DRIVE;
select count(*) from	TBL_USER_TRANSFER;
select count(*) from	TBL_TRANSFER;
select count(*) from	TBL_TAPE_DRIVE;
select count(*) from	TBL_TAPEDRIVE;
select count(*) from	TBL_TAPEDRIVEPROPERTY;
select count(*) from	TBL_TAPE_PROPERTY;
select count(*) from	TBL_GROUP;
select count(*) from	TBL_STORAGENODE;
select count(*) from	TBL_SYSTEM;
select count(*) from	TBL_USER_INFO;
select count(*) from	TBL_SYS_MANAGE;
select count(*) from	TBL_SPEEDTEST;
select count(*) from	TBL_OBJECT_INSTANCE;
select count(*) from	TBL_OBJECT_COUNTINFO;
select count(*) from	TBL_ARCHIVED_OBJECT;
select count(*) from	TBL_MEDIUMSET;
select count(*) from	TBL_ARCHIVEREQUEST_FILEHISTORY;
select count(*) from	TBL_ARCHIVEREQUEST_HISTORY;
select count(*) from	TBL_ARCHIVEREQUEST_FILE;
select count(*) from	TBL_ARCHIVEREQUEST;
select count(*) from	TBL_TAPEINSTANCEMAP;
select count(*) from	TBL_MAX_MISSION_NUM;
select count(*) from	TBL_MANAGER_REPACK;
select count(*) from	TBL_TAPELISTINLIB;
select count(*) from	TBL_OBJECT_COUNTPROPERTY;
select count(*) from	TBL_SPLITFILE;
select count(*) from	TBL_USERS;
select count(*) from	DCM_SEARCHRESULT;
select count(*) from	DCM_SEARCHFOLDER;
select count(*) from	DCMA_MARKEXTENDINFO_DATA;
select count(*) from	DCMA_MARKEXTENDINFO;
select count(*) from	DCM_OBJECTPOPEDOM_DATA;
select count(*) from	DCM_OBJECTPOPEDOM;
select count(*) from	DCM_USER_CLASS_RELATION;
select count(*) from	DCM_USER_CLASS;
select count(*) from	DCM_COMMANDDELETEGUID;
select count(*) from	DCM_COMMANDDELETEFILE;
select count(*) from	DCM_COMMANDDELETETASK;
select count(*) from	DCM_COMMANDTASKRECORD;
select count(*) from	DCM_COMMANDTASK;
select count(*) from	DCM_CLASS;
select count(*) from	DCM_FILEINSTANCE;
select count(*) from	DCM_COMPLEXTASKINFO;
select count(*) from	DCM_SERVICELOG;
select count(*) from	DCM_SECTIONWORKPATH;
select count(*) from	DCM_SEARCHTYPEOPTIONDETAIL;
select count(*) from	DCM_ARCHIVEHISTORY;
select count(*) from	DCM_ROLE;
select count(*) from	DCM_S6HEAD;
select count(*) from	DCM_SEARCHTYPEOPTION;
select count(*) from	DCM_SEARCHTYPE;
select count(*) from	DCM_SEARCHSOURCE;
select count(*) from	DCM_FILE;
select count(*) from	DCM_FAVORITEINFO;
select count(*) from	DCM_FAVORITEDIRECTORYSHARE;
select count(*) from	DCM_FAVORITEDIRECTORYNODE;
select count(*) from	DCM_FAVORITEDIRANDUSER;
select count(*) from	DCM_ENTITYVISITEDRECORD;
select count(*) from	DCM_ENTITYSCORE;
select count(*) from	DCM_ENTITYRECOMMENDATION;
select count(*) from	DCM_ENTITYPIC;
select count(*) from	DCM_ENTITYDOCUMENT;
select count(*) from	DCM_ENTITYDETAILPRIVILEGE;
select count(*) from	DCM_ENTITYANDDATASET;
select count(*) from	DCM_ENTITYANDCLASS;
select count(*) from	DCM_DATASETINFO;
select count(*) from	DCM_DATASETANDCLASS;
select count(*) from	DCM_DATASETANDATTRIBUTE;
select count(*) from	DCM_DATASET;
select count(*) from	DCM_CONTENTSTRUCTURE;
select count(*) from	DCM_COMMONENTITY;
select count(*) from	DCM_CLUSTERINFO;
select count(*) from	DCMA_ORIGINALUMID;
select count(*) from	DCMA_ORIGINALMETADATA;
select count(*) from	DCMA_ONAIRMATERIAL;
select count(*) from	DCMA_MATERIALMETADATA;
select count(*) from	DCMA_FILINGMETADATA;
select count(*) from	DCMA_EVENTPROPERTY;
select count(*) from	DCMA_ESSENCEMARK;
select count(*) from	DCM_DEVICEINFO;
select count(*) from	DCM_SEARCHINDEXFILE;
select count(*) from	DCM_SEARCHINDEX;
select count(*) from	DCM_ROLEPOPEDOM;
select count(*) from	DCM_PRIVILEGETEMPLATEANDUSER;
select count(*) from	DCM_PRIVILEGETEMPLATEANDGROUP;
select count(*) from	DCM_PRIVILEGETEMPLATE;
select count(*) from	DCM_PRIVILEGEGROUP;
select count(*) from	DCM_POPEDOMTYPE;
select count(*) from	DCM_POPEDOMLIST;
select count(*) from	DCM_POLICY;
select count(*) from	DCM_PLAYOUTITEM;
select count(*) from	DCM_OTHERMETADATAS;
select count(*) from	DCM_OLTAPEFILEINST;
select count(*) from	DCM_METADATAEXPORTHISTORY;
select count(*) from	DCM_METADATAEXPORT;
select count(*) from	DCM_MEDIAFORMAT;
select count(*) from	DCM_MDADOWNLOADFLOW;
select count(*) from	DCM_MDACHECKTASK;
select count(*) from	DCM_MDACHECKRECORD;
select count(*) from	DCM_LAYERMAINCONFIG;
select count(*) from	DCM_LAYERDETAILCONFIG;
select count(*) from	DCM_GROUPANDPOLICY;
select count(*) from	DCM_GROUP_FILE_RELATION;
select count(*) from	DCM_FIXITEM;
select count(*) from	DCM_FILESECTIONINST;
select count(*) from	DCM_PE_INITPATH;
select count(*) from	DCM_PHYSICALENTITY;
select count(*) from	DCM_DEVICEDESCRIBE;
select count(*) from	DCM_DBEXECTASK;
select count(*) from	DCM_TRANSCODETASK;
select count(*) from	DCM_TASKOFCATALOGUE;
select count(*) from	DCM_SYSTEMCONSTANT;
select count(*) from	DCM_KEYVALUE;
select count(*) from	DCM_ROADSECTION;
select count(*) from	DCM_DEVICE;
select count(*) from	DCM_TRANSCODEPARAM;
select count(*) from	DCM_FILETYPE;
select count(*) from	DCM_FILEGROUP;
select count(*) from	DCM_ATTRIBUTEINFO;
select count(*) from	DCM_XDCAMTASK;
select count(*) from	DCM_XDCAMFILEINSTANCE;
select count(*) from	DCM_XDCAMDISCINSTANCE;
select count(*) from	DCM_USERINFO;
select count(*) from	DCM_RECORDOBJ;
select count(*) from	DCMC_CATAUSERROLERELATION;
select count(*) from	DCMC_CATALOGUEUSERROLE;
select count(*) from	DCMC_CATALOGUEUSERINFO;
select count(*) from	DCMC_CATALOGUEROLE;
select count(*) from	DCMC_CATALOGUELOGININFO;
select count(*) from	DCMA_OTCINFO;
select count(*) from	DCMA_HISTORY;
select count(*) from	DCMA_CUSTOM;
select count(*) from	DCMA_ATTRIBUTE_SEQUENCE;
select count(*) from	DCMA_ATTRIBUTE_PROGRAM;
select count(*) from	DCM_ENTITYCLIP;
select count(*) from	DCM_CATALOGUESYSTEM;
select count(*) from	DCM_ENTITYDEFINE;
select count(*) from	DCM_ENTITYTYPE;
select count(*) from	DCM_CRITERIONITEM;
select count(*) from	DCM_CRITERIONTYPE;
select count(*) from	DCM_PRIVILEGELEVEL;
select count(*) from	DCM_FILEPUTYPE;
select count(*) from	DCM_DATATYPE;
select count(*) from	DCM_PRIVILEGEGROUPANDUSER;
select count(*) from	DCM_KEYFRAMEINFO;
select count(*) from	DCM_RECYCLEINFO;
select count(*) from	DCM_USERANDCLASS;
select count(*) from	DCM_CLASSANDCATALOGUE;
select count(*) from	DCM_TASKGUIDTOREQUESTID;
select count(*) from	DCM_SYSPARAM;
select count(*) from	DCM_STARCHIVETAPEINFO;
select count(*) from	DCM_SPECIALSUBJECT;
select count(*) from	DCM_FILEANALYSISLOG;
select count(*) from	DCM_TRANSFERFILE;
select count(*) from	DCM_CHECKTASK;
select count(*) from	DCM_MDADOWNLOADCLIPS;
select count(*) from	DCM_MDADOWNLOADAPPS;
select count(*) from	DCM_ENTITYPROGRAM;
select count(*) from	DCM_PRIVILEGETEMPLATEANDSECRET;
select count(*) from	DCM_MESSAGE;
select count(*) from	DCM_AUDITAPPLICATION;
select count(*) from	DCM_TAPEFILEINST;
select count(*) from	DCM_DISKFILEINST;
select count(*) from	DCM_COUNTLOG;
select count(*) from	DCM_ENTITYANDATTRIBUTE;
select count(*) from	DCM_RESPONSEMQ;
select count(*) from	DCM_PEENTITY_INSTANCE;
select count(*) from	DCM_AUTOFILETASK;
select count(*) from	DCM_USERLOGININFO_HISTORY;
select count(*) from	DCM_TRANSFERTASK;
select count(*) from	DCM_MSBUSHEADPARAM;
select count(*) from	DCM_MSBUSHEAD;
select count(*) from	DCM_CLIPPACKTASK;
select count(*) from	DCM_CLASSANDDATASET;
select count(*) from	DCM_ADDTIONALFIELD;
select count(*) from	DCM_DIGITALTAPE;
select count(*) from	DCM_USERLOGININFO;
select count(*) from	DCM_USERCLASSANDSTGSECTION;
select count(*) from	DCM_USERCLASS_TYPE;
select count(*) from	DCM_USERCLASS;
select count(*) from	DCM_USERAUTHORIZATION;
select count(*) from	DCM_USERANDROLE;
select count(*) from	DCM_USERANDPOPEDOM;
select count(*) from	DCM_UNTYPEDDATA;
select count(*) from	DCM_TRANSFERFILECOLLECT;
select count(*) from	DCM_TRANSFERACTOR;
select count(*) from	DCM_TRANSCODEREQUEST;
select count(*) from	DCM_TRACKFILEINSTANCE;
select count(*) from	DCM_ARCHIVEEXETASK;
select count(*) from	DCM_ANALOGTAPEINST;
select count(*) from	DCM_ACCUSTOMEDMATERIAL;
select count(*) from	DCM_CATALOGUERELATION;
select count(*) from	DCM_CATALOGUEDATA;
select count(*) from	DCM_CATALOGUEANDATTRIBUTE;
select count(*) from	DCM_AUDITENTITYITEM;
select count(*) from	DCM_AUDITAPPOPINION;
select count(*) from	DCM_ATTRIBUTESTYPE;
select count(*) from	DCMC_CATATASKASSIGNER;
select count(*) from	DCMA_PLANNINGMETADATA;

spool off
set echo off

exit;