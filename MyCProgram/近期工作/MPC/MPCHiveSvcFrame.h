/*********************************************************
* Filename: MPCSvcFrame.h
* Contents: Service frame proxy class for MPC service interface
* Authors: Tanghai Xi
* Date: Mar., 18, 2006
* Revised: 
* All Rights Reserved
* MPC Develop Group
* Sobey Inc, P.R.China
**********************************************************/
#pragma once
#include <comutil.h>

#ifdef MPCHIVESERVICEFRAME
#define MPCHIVESERVICEFRAME_API __declspec(dllexport)
#else
#define MPCHIVESERVICEFRAME_API __declspec(dllimport)
#endif


class CHiveServiceFrame;
class MPCHIVESERVICEFRAME_API CMPCHiveSvcFrame
{
public:
	CMPCHiveSvcFrame(void);
	~CMPCHiveSvcFrame(void);
	//初始化
	MPC_FRAMERESULT	InitilizeForHive(
		/*in*/const CString&		strDispatchIp,			//调度所在机器IP地址	
		/*in*/const CString&		strLocalIPAddr,			//本地监听IP地址	
		/*in*/const CString&		strSvcName,				//服务名称
		/*in*/const CStringArray&	saSvcTypes,				//服务类型列表
		/*in*/const CStringArray&	saAttachTypes,			//该服务需要接收的任务信息块
		/*in*/const UINT			nMaxTaskCount = 1,		//该服务所能同时处理的最大任务数目
		/*out*/CString*				pstrSvcGuid	= NULL		//输出该服务注册的GUID
		);	

	//指示初始化过程结束，需要注册到调度并且接收调度任务
	MPC_FRAMERESULT	StartWork(void);

	//服务处理完成
	MPC_FRAMERESULT	FinishTask(/*in*/const ULONG ulJobID, 
		/*in*/const MPC_RESULTTYPE eResult, 
		/*in*/const MPC_AttachArray& arrTaskinfo, 
		/*in*/const MPC_MediaFileArray& arrMediaFile, 
		/*in*/const CString& strRemark);
	//回馈进度
	MPC_FRAMERESULT	FeedbackGuage(/*in*/const ULONG ulJobID,
		/*in*/const int nPercentage);

	//设置运行时回调函数
	MPC_FRAMERESULT	SetCallBackProc2(/*in*/const AssignTask fnAssignTask, 
		/*in*/const CancelTask fnCancelTask, 
		/*in*/const PauseTask fnPauseTask, 
		/*in*/const ResumeTask fnResumeTask, 
		/*in*/const QueryStatus fnQueryStatus,
		/*in*/const ConfigManage fnConfigManage,
		/*in*/const UnknownMethod fnUnknownMethod,
		/*in*/const LPVOID lpUserData);

	//卸载
	MPC_FRAMERESULT	Uninitilize(void);


	//初始化SNMP（如果服务需要返回进度才调用该函数）
	MPC_FRAMERESULT	InitSnmp(void);

	//设置运行时回调函数
	MPC_FRAMERESULT	SetCallBackProc(/*in*/const AssignTask fnAssignTask, 
		/*in*/const CancelTask fnCancelTask, 
		/*in*/const PauseTask fnPauseTask, 
		/*in*/const ResumeTask fnResumeTask, 
		/*in*/const QueryStatus fnQueryStatus,
		/*in*/const LPVOID lpUserData);

	//设置通知事件通知消息（当调度启动或者关闭时）
	MPC_FRAMERESULT	SetNotifyMsg(/*in*/const HWND hMsgWnd,
		/*in*/const UINT uGwShutdownMsgID = WM_NULL,
		/*in*/const UINT uGwStartupMsgID = WM_NULL);

	//设置互斥参数（如果服务需要和其他服务公用资源，可以使用这个方式来设置互斥方式)
	MPC_FRAMERESULT	SetMutex(/*in*/const CString& strMutexType);

	//服务处理完成
	MPC_FRAMERESULT	PostAirInfo(/*in*/const ULONG ulJobID,
		/*in*/BOOL bRealtime,
		/*in*/const MPC_MediaFileArray& arrOutFile, 
		/*in*/const CString& strRemark = _T(""));

	MPC_RESULTTYPE	PausedTask(/*in*/const ULONG ulJobID);
	MPC_RESULTTYPE	SuspendedTask(/*in*/const ULONG ulJobID, 
		/*int*/const LPMPC_ATTACH pBreakpack = NULL);
	MPC_RESULTTYPE	ResumedTask(/*in*/const ULONG ulJobID);

	//回馈关键资源
	MPC_FRAMERESULT FeedbackKeyResource(/*in*/const CString& strTaskGUID,
		/*in*/ const CString& strTaskName, 
		/*in*/ const LONG& lJobID, 
		/*in*/ const MPC_KEYRESITEMArray& arrKeyResItem);

	//手动任务
	void			ManualMessage(_variant_t vtMsg);

	//配置（可以设置调度IP地址/MQ名称/本地IP地址）
	static void		SvcFrameSetup(/*in*/const int nMaxTaskCount,
		/*in*/const HWND hParentWnd = NULL,
		/*out*/BOOL* pbNeedRestart = NULL);


	//服务向调度发送自定义消息
	MPC_FRAMERESULT	PostUserMessage(/*in*/const CString& strMethod,
		/*in*/const _bstr_t& bstrMsgBody);


MPC_FRAMERESULT	SetCallBackHiveServiceStatus(const FunHiveServiceStatus fnHiveServiceStatus, LPVOID lpUserData); 

private:
	CHiveServiceFrame*	m_pServiceFrame;
};
