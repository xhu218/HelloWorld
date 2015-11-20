set wrap off
set linesize 1500

set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\sonaps\redo_log.txt"
select * from v$log;
spool off
set echo off

set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\sonaps\all_tablename.txt"
select table_name from user_tables;
spool off
set echo off



set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\sonaps\data_file.txt"
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
spool "C:\dynamicalPath\result\date\sonaps\index.txt"
select index_name,index_type,table_name,status from user_indexes;
spool off
set echo off




set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\sonaps\profile.txt"
select * from dba_profiles;
spool off
set echo off


set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\sonaps\parameter.txt"
show parameter
spool off
set echo off


set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\sonaps\process.txt"
show parameter process;
select count(*) from v$process;
spool off
set echo off


set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\sonaps\session.txt"
show parameter session;
select count(*) from v$session;
select saddr,sid,serial#,paddr,username,status from v$session where username='databaseuser';
select machine,status,count(*) from v$session where username='databaseuser' group by machine,status order by status;
spool off
set echo off


set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\sonaps\Memory_usage.txt"
show parameter target
select 'SGA' as name,round(sum(value)/1024/1024,2)||'M' as "SIZE(M)" from v$sga;
select 'PGA' as name,round(value/1024/1024,2)||'M' as "SIZE(M)" from v$pgastat where name='total PGA allocated';
spool off
set echo off



set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\sonaps\flash_recovery.txt"
show parameter recovery
select file_type,percent_space_used,number_of_files from v$flash_recovery_area_usage;
spool off
set echo off


set echo on
conn databaseuser/databasepassword@databasesid
spool "C:\dynamicalPath\result\date\sonaps\detailed_session.txt"
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
spool "C:\dynamicalPath\result\date\sonaps\table_count.txt"

select count(*) from 	DBP_NEWIMPORT_TASK;
select count(*) from 	DBP_TASK;      
select count(*) from 	ET_HIRESMATCHTASK;   
select count(*) from 	RMS_WFAM;      
select count(*) from 	SONAPS_USERPERSONALIZEDINFO;  
select count(*) from 	GTM_TASKSTEPS;     
select count(*) from 	GTM_MODULETASKS;     
select count(*) from 	GTM_WORKFLOWS; 
select count(*) from 	CLIENTINFO;    
select count(*) from 	CLIENTINFO_REMOTE;   
select count(*) from 	TASKDETAILINFO;
select count(*) from 	TASKINFO;      
select count(*) from 	TASKINFO_REMOTE;     
select count(*) from 	MPC_CODECTEMPL;
select count(*) from 	MPC_SYSPARAM;  
select count(*) from 	MPC_CLIPDATA;  
select count(*) from 	MOS_MERGEINDEX;
select count(*) from 	MOS_ARCHIVESTORY;    
select count(*) from 	MOS_PLANINFO;  
select count(*) from 	SBT_SEQUENCELINK;    
select count(*) from 	SBT_TEMPLATEINFO;    
select count(*) from 	SBT_WORKFLOWCACHE;   
select count(*) from 	SBT_GTMCACHE;  
select count(*) from 	SBT_USERLAYOUTWINDOW;
select count(*) from 	SBT_USERLAYOUTTEMPLATE;       
select count(*) from 	SBT_CGEVENT;   
select count(*) from 	SBT_CGPLAYLIST;
select count(*) from 	SBT_DISKINFO;  
select count(*) from 	SBT_STORYINFO; 
select count(*) from 	SBT_STORYEVENT;
select count(*) from 	SBT_SOURCEINFO;
select count(*) from 	SBT_SOURCEFILEINFO;  
select count(*) from 	SBT_RECYCLEINFO;     
select count(*) from 	SBT_PLAYLISTSTORY;   
select count(*) from 	SBT_PLAYLISTFORMAT;  
select count(*) from 	SBT_PLAYLIST;  
select count(*) from 	SBT_PLAYHISTORY;     
select count(*) from 	SBT_MODIFYHISTORY;   
select count(*) from 	SBT_MATERIALSERVER;  
select count(*) from 	SBT_MATERIALINFO;    
select count(*) from 	SBT_EVENTMATERIAL;   
select count(*) from 	SBT_EVENTINFO; 
select count(*) from 	SBT_VTR;       
select count(*) from 	SBT_USERPARAM; 
select count(*) from 	SBT_USERINSTUDIO;    
select count(*) from 	SBT_TASKINFO;  
select count(*) from 	SBT_STUDIOPLAYSERVER;
select count(*) from 	SBT_STUDIOPLAYLIST;  
select count(*) from 	SBT_STUDIOINFO;
select count(*) from 	SBT_STUDIOCONTROL;   
select count(*) from 	SBT_SERVERINFO;
select count(*) from 	SBT_PLAYCHANNEL;     
select count(*) from 	SBT_INTERFACE; 
select count(*) from 	SBT_DELTASK;   
select count(*) from 	SBT_CONTROLSERVER;   
select count(*) from 	SBT_CONTROLCHANNEL;  
select count(*) from 	SBT_CHANNELGROUP;    
select count(*) from 	SBT_CARRYINFO; 
select count(*) from 	SBT_BASEDATAINFO;    
select count(*) from 	SBT_AIRUSERINFO;     
select count(*) from 	SBT_SERVERCARRY;     
select count(*) from 	SBT_MSCHANNEL; 
select count(*) from 	DBP_DEV_CONN;  
select count(*) from 	DBP_TASK_SIGNALSRC_BACKUPTASK;
select count(*) from 	DBP_SIGNALSRC_MASTERBACKUP;   
select count(*) from 	DBP_CHANNELGROUPMAP; 
select count(*) from 	DBP_NEWIMPORT_REMOTE;
select count(*) from 	DBP_NEWIMPORT_CLIP;  
select count(*) from 	DBP_TASK_ERRORINFO;  
select count(*) from 	DBP_CHN_EXTENDDATA;  
select count(*) from 	DBP_LOG_USERTEMPLATE;
select count(*) from 	DBP_LOG_EVENT_EXTEND;
select count(*) from 	DBP_LOG_LANGUAGEMAP; 
select count(*) from 	DBP_LOG_LANGUAGEINFO;
select count(*) from 	DBP_LOG_SCENARIOEVENTMAP;     
select count(*) from 	DBP_LOG_SCENTEAMMEMBERMAP;    
select count(*) from 	DBP_LOG_USERSETTING; 
select count(*) from 	DBP_LOG_MONITOR;     
select count(*) from 	DBP_LOG_SYSSETING;   
select count(*) from 	DBP_LOG_SCENARIOACTIONMAP;    
select count(*) from 	DBP_LOG_SCENARIOTEAMMAP;      
select count(*) from 	DBP_LOG_TEAMMEMBERMAP;        
select count(*) from 	DBP_LOG_EVENT; 
select count(*) from 	DBP_LOG_MEMBER;
select count(*) from 	DBP_LOG_SCENARIO;    
select count(*) from 	DBP_LOG_ACTION;
select count(*) from 	DBP_LOG_TEAM;  
select count(*) from 	DBP_LOG_FOLDER;
select count(*) from 	DBP_LOG_OBJECT;
select count(*) from 	DBP_XDCAM_XMPLOIT_PLAN;       
select count(*) from 	DBP_XDCAM_DEV_PLAN_MAP;       
select count(*) from 	DBP_XDCAM_MATERIAL_DEV_MAP;   
select count(*) from 	DBP_XDCAM_DISC_MATERIAL;      
select count(*) from 	DBP_PROGRAMPARAM_MAP;
select count(*) from 	DBP_CARRIERES; 
select count(*) from 	DBP_MSMQMSG_FAILED;  
select count(*) from 	DBP_MSMQMSG;   
select count(*) from 	DBP_STREAMMEDIA;     
select count(*) from 	DBP_IP_VIRTUALCHANNEL;        
select count(*) from 	DBP_IP_PROGRAMME;    
select count(*) from 	DBP_IP_DEVICE; 
select count(*) from 	DBP_IP_DATACHANNELINFO;       
select count(*) from 	DBP_USERTEMPLATE;    
select count(*) from 	DBP_GPI_MAP;   
select count(*) from 	DBP_GPI_INFO;  
select count(*) from 	DBP_OBJECTSTATEINFO; 
select count(*) from 	DBP_SIGNALSRCGROUPMAP;        
select count(*) from 	DBP_SIGNALGROUP;     
select count(*) from 	DBP_GLOBAL_STATE;    
select count(*) from 	DBP_MATERIAL_VIDEO_BACKUP;    
select count(*) from 	DBP_MATERIAL_AUDIO_BACKUP;    
select count(*) from 	DBP_MATERIAL_BACKUP; 
select count(*) from 	DBP_TASK_METADATA_BACKUP;     
select count(*) from 	DBP_TASK_BACKUP;     
select count(*) from 	VTR_UPLOADTASK;
select count(*) from 	VTR_TYPEINFO;  
select count(*) from 	VTR_TASK_MEATDATA;   
select count(*) from 	VTR_TASK_INOUT;
select count(*) from 	VTR_TASKINFO;  
select count(*) from 	VTR_TAPE_VTR_MAP;    
select count(*) from 	VTR_TAPELIST;  
select count(*) from 	VTR_RECORDTASK;
select count(*) from 	VTR_DOWNLOAD_MATERIALLIST;    
select count(*) from 	VTR_DETAILINFO;
select count(*) from 	DBP_XDCAM_TASK_METADATA;      
select count(*) from 	DBP_XDCAM_TASKFILE;  
select count(*) from 	DBP_XDCAM_TASK;
select count(*) from 	DBP_XDCAM_DISKINFO;  
select count(*) from 	DBP_XDCAM_DEVICE;    
select count(*) from 	DBP_VIRTUALMATRIXPORTSTATE;   
select count(*) from 	DBP_VIRTUALMATRIXINPORT;      
select count(*) from 	DBP_VIDOETYPE; 
select count(*) from 	DBP_USERSETTINGS;    
select count(*) from 	DBP_USERPARAM_MAP;   
select count(*) from 	DBP_USERPARAMLOG;    
select count(*) from 	DBP_TRANSFER_TEMPLATE;        
select count(*) from 	DBP_TRANSFER_POLICY; 
select count(*) from 	DBP_TRANSCODE_TEMPLATE;       
select count(*) from 	DBP_TRANSCODE_POLICY;
select count(*) from 	DBP_TASK_SOURCE;     
select count(*) from 	DBP_TASK_METADATA;   
select count(*) from 	DBP_TASKGROUP_MAP;   
select count(*) from 	DBP_TASKGROUP; 
select count(*) from 	DBP_SIG_REC_TYPE_MAP;
select count(*) from 	DBP_SIGNAL_TYPE;     
select count(*) from 	DBP_SIGNAL_SOURCE;   
select count(*) from 	DBP_SIGNAL_RECMAP;   
select count(*) from 	DBP_SIGNAL_DEVICE_MAP;        
select count(*) from 	DBP_SIGNALSRC; 
select count(*) from 	DBP_SETTINGS;  
select count(*) from 	DBP_SCHEDULER_RECUNIT;        
select count(*) from 	DBP_SCHEDULER; 
select count(*) from 	DBP_ROUTERCTROLSETTING;       
select count(*) from 	DBP_RECUNIT;   
select count(*) from 	DBP_RECDEVICE_TYPE;  
select count(*) from 	DBP_RCDOUTDESC;
select count(*) from 	DBP_RCDINDESC; 
select count(*) from 	DBP_POLICYUSERCLASS; 
select count(*) from 	DBP_POLICYUSER;
select count(*) from 	DBP_POLICYTASK;
select count(*) from 	DBP_PLANS;     
select count(*) from 	DBP_MSVCHANNEL_STATE;
select count(*) from 	DBP_MSGCONTROL;
select count(*) from 	DBP_METADATAPOLICY;  
select count(*) from 	DBP_MESSAGE_REGISTER;
select count(*) from 	DBP_MESSAGES;  
select count(*) from 	DBP_MATRIXTYPEINFO;  
select count(*) from 	DBP_MATRIXROUT;
select count(*) from 	DBP_MATRIXINFO;
select count(*) from 	DBP_MATERIAL_VIDEO;  
select count(*) from 	DBP_MATERIAL_DURATION;        
select count(*) from 	DBP_MATERIAL_AUDIO;  
select count(*) from 	DBP_MATERIAL_ARCHIVE;
select count(*) from 	DBP_MATERIAL;  
select count(*) from 	DBP_MAPOUTPORT;
select count(*) from 	DBP_MAPINPORT; 
select count(*) from 	DBP_LEVELRELATION;   
select count(*) from 	DBP_IMPORT_TASK;     
select count(*) from 	DBP_GLOBAL_PROGRAM;  
select count(*) from 	DBP_GLOBAL;    
select count(*) from 	DBP_CHANNEL_RECMAP;  
select count(*) from 	DBP_CAPTUREPARAMTEMPLATE;     
select count(*) from 	DBP_CAPTUREDEVICE;   
select count(*) from 	DBP_CAPTURECHANNELS; 
select count(*) from 	DBP_AUDIOTYPE; 
select count(*) from 	DBP_ARCHIVETYPE;     
select count(*) from 	ET_MARKEXTENDINFO_DATA;       
select count(*) from 	ET_MARKEXTENDINFO;   
select count(*) from 	ET_LANGUAGEINFO;     
select count(*) from 	DCM_FAVORITECARTSELFDEFINETAB;
select count(*) from 	DCM_FAVORITECART;    
select count(*) from 	DCM_WEBKEYVALUE;     
select count(*) from 	ET_COMMONGWTASK_DATA;
select count(*) from 	DCM_TASKS;     
select count(*) from 	ET_MATERIALIDHISTORY;
select count(*) from 	ET_COMMONGWSITE_DATA;
select count(*) from 	ET_CUSTOMIZETYPE;    
select count(*) from 	ET_COMMONGWTASK;     
select count(*) from 	ET_COMMONGWSITE;     
select count(*) from 	ET_FOLDERPOLICY;     
select count(*) from 	ET_ARCHIVEPOLICY;    
select count(*) from 	ET_PLANSOURCELIST;   
select count(*) from 	ET_MATERIALID; 
select count(*) from 	ET_GROUPCLIPITEM;    
select count(*) from 	ET_RETRIEVESCHEDULE; 
select count(*) from 	ET_REMOTESCHEDULE;   
select count(*) from 	ET_NOBODYFILE; 
select count(*) from 	ET_CLIPLINK;   
select count(*) from 	ET_USERLAYOUTDATA;   
select count(*) from 	ET_USERTEMPLATE;     
select count(*) from 	ET_SEARCHRESULT;     
select count(*) from 	ET_SEARCHFOLDER;     
select count(*) from 	ET_COLUMNSPACE;
select count(*) from 	ET_COLUMNPOLICY;     
select count(*) from 	ET_COLUMNCUSTOM_DEFAULT;                                                                  
select count(*) from 	ET_COLUMN_USER_SPACE;
select count(*) from 	ET_COLUMN_CLIP_SPACE;
select count(*) from 	ET_CLIPUMIDATTRIBUTE;
select count(*) from 	ET_CLIPSOURCELIST;   
select count(*) from 	ET_CLIPORIGINALMETADATA;                                                                   
select count(*) from 	ET_CLIPMARKPOINT;    
select count(*) from 	ET_CLIPINFO;   
select count(*) from 	ET_CLIPFILEDELETEQUEUE;                                                               
select count(*) from 	ET_CLIPFILE;   
select count(*) from 	ET_CLIPEVENT;  
select count(*) from 	ET_CENSORINFO; 
select count(*) from 	ET_CDINFO;     
select count(*) from 	ET_BACKGROUNDTASK;   
select count(*) from 	ET_DELETEFILEFAIL;   
select count(*) from 	SMM_USERLOGININFO_HISTORY;                                                                     
select count(*) from 	SMM_USERLOGININFO;   
select count(*) from 	SMM_USER_ROLE; 
select count(*) from 	SMM_USER_ADDRESS_LIST;                                                                         
select count(*) from 	SMM_UPDATEINFO;
select count(*) from 	SMM_TRANSACTION;     
select count(*) from 	SMM_TARIFF_TEMPLET_DETAIL;                                                                       
select count(*) from 	SMM_TARIFF_TEMPLET;  
select count(*) from 	SMM_TARIFF_DATE_SET; 
select count(*) from 	SMM_SYSMESSAGE;
select count(*) from 	SMM_ROLEPOPEDOM; 
select count(*) from 	SMM_ROLE;      
select count(*) from 	SMM_LOGINNUMBER_LIMIT;                                                                       
select count(*) from 	ET_USERPARAMETER;    
select count(*) from 	ET_INGESTMETADATA;   
select count(*) from 	SMM_DEVICE_USE_STAT; 
select count(*) from 	SMM_USERPOPEDOM;     
select count(*) from 	SMM_USERINFO;  
select count(*) from 	SMM_USERCLASS; 
select count(*) from 	SMM_USER_CLASS_RELATION;                                                                         
select count(*) from 	SMM_SYSTEMSETTING;   
select count(*) from 	SMM_SYSPARATYPE;     
select count(*) from 	SMM_POPEDOMTYPE;     
select count(*) from 	SMM_POPEDOMLIST;     
select count(*) from 	ET_USERPARAMETER_DEF;
select count(*) from 	ET_TEMPLATEINFO;     
select count(*) from 	ET_RESOURCECATALOG;  
select count(*) from 	ET_PLUGINPARAMETERDEF;                                                            
select count(*) from 	ET_PLUGINDEF;  
select count(*) from 	ET_OBJECT;     
select count(*) from 	ET_METADATADEF;
select count(*) from 	DOC_LOCKTYPEDEF;     
select count(*) from 	SMM_DEVICE_USE_RECORD_HISTORY;                                                              
select count(*) from 	SMM_DEVICE_USE_RECORD;                                                                     
select count(*) from 	SMM_DEVICE_APPLY;    
select count(*) from 	SMM_COLUMNNLEPOLICY; 
select count(*) from 	SMM_COLUMN;    
select count(*) from 	SMM_CHANNEL;   
select count(*) from 	ET_USERTERMINALDEF;  
select count(*) from 	ET_USERTERMINALCONFIG;                                                              
select count(*) from 	ET_USERTERMINAL;     
select count(*) from 	ET_USERSPACE;  
select count(*) from 	SMM_EDITION;   
select count(*) from 	SMM_DEVICETYPE;
select count(*) from 	SMM_DEVICEMANAGE;    
select count(*) from 	SMM_DEVICEINFO;
select count(*) from 	ET_USERSITEPARAMETER;
select count(*) from 	ET_USERSELECTPEPATH; 
select count(*) from 	ET_USERENVIRONMENT;  
select count(*) from 	ET_USER_COLUMNCUSTOM;
select count(*) from 	ET_TEMPLATEOBJECT; 
select count(*) from 	ET_TECHCENSORDATA;
select count(*) from 	ET_STORAGEDEF;
select count(*) from 	ET_SITEPARAMETER;
select count(*) from 	ET_SITEDEF;
select count(*) from 	ET_SERVERSENDMPC;
select count(*) from 	ET_SERVERENVIRONMENT;
select count(*) from 	ET_RESOURCEUSED;
select count(*) from 	ET_PLANNINGMETADATA;
select count(*) from 	ET_PLANNING;
select count(*) from 	ET_PGMRENDERDATA;
select count(*) from 	ET_PGMREFRESHRESOURCE;                                                                           
select count(*) from 	ET_PGMMASTER;
select count(*) from 	ET_PGMFLOW;
select count(*) from 	ET_OBJPOPEDOM_DATA_DUMMY;                                                                     
select count(*) from 	ET_OBJECTPOPEDOM_DATA;
select count(*) from 	ET_OBJECTPOPEDOM;    
select count(*) from 	ET_MYCOMMONOBJECT;   
select count(*) from 	ET_METADATA_MAPPING; 
select count(*) from 	ET_MEDIAFORMATDEF;   
select count(*) from 	ET_MAMRIEVETASK;     
select count(*) from 	ET_MAMHISTORYTASK;   
select count(*) from 	ET_GROUPSPACE; 
select count(*) from 	ET_FOLDER;     
select count(*) from 	ET_EXTENTION;  
select count(*) from 	ET_EDLINFO;    
select count(*) from 	ET_DEVICEINFO; 
select count(*) from 	ET_DELETEOBJECT;     
select count(*) from 	ET_ARCHIVESCHEDULE;
select count(*) from 	MPC_POLICY;    
select count(*) from 	DOC_USERLOCK;  
select count(*) from 	DOC_DBERRORLOG;
select count(*) from 	ET_DELETEBACKUP;


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