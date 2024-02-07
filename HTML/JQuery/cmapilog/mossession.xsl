<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <head>
        <title>
          <xsl:value-of select="MOSLog/@HostName" />@MOSMessage LogViewer
        </title>
        <style type="text/css">
          <![CDATA[
      .RoReuqest{background:#538ED5}
      .RoResponse{background:#C5D9F1}
      .MosRequest{background:#F79646}
      .MosResponse{background:#FAC090}
      .MosNotification{background:#FFFF66}
      .RoStatusNotification{background:#00B0F0}
      .RoMetadataNotification{background:#7030A0}
      .Acknowledge_mos{background:#FDE9D9}
      .Acknowledge_ro{background:#B6DDE8}
      .Customized{background:#BFBFBF}
      .c1{color:#0000FF}
      .c2{color:#FF0000}
      .c3{color:#A31515}
      .tablestyle{ width:960px;font-size:12px;background-color:#EDFDFE;font-family:Arial}
      .header{background-color:#336699;color:#FFFFFF;font-size:14px;font-weight:bold;height:28px}
      .mosstyle{font-family:宋体;background-color:#EDFDFE;}
      .ctrlxml{color:#ff2c2f;cursor:hand;}
      a:link {color: #330099; text-decoration:none} /* 未访问的链接 */
      a:visited {color:#330099; text-decoration: none} /* 已访问的链接 */
      a:hover {color: #0000FF; text-decoration:none} /* 鼠标在链接上 */
      ]]>
        </style>
        <script language="javascript" type="text/javascript">
          <![CDATA[

function displayByType(obj)
{
	  if(obj.selectedIndex==0)
	  {
	      displayAll();
	  }
	  else
	  {
  	 	    var table=document.getElementById("mosTable");
          for(i=2;i<table.rows.length;i+=2)
          {
              tr=table.rows[i];
              if(tr.cells[3].innerText==obj.value)
              {
                  tr.style.display="";
              }
			        else
			        {
				          tr.style.display="none";
				          tr.nextSibling.style.display="none";
			        }
         }
	  }
}

function displayAll()
{
    var table=document.getElementById("mosTable");
    for(i=2;i<table.rows.length;i+=2)
    {
       tr=table.rows[i];
       tr.style.display="";
       var t=tr.firstChild.firstChild.innerText;
       if(t=="-")
       {
				  tr.firstChild.firstChild.innerText="+";
				  tr.nextSibling.style.display="none";
       }
    }
}

function displayByStatus(obj)
{
    var table=document.getElementById("mosTable");
    if(obj.selectedIndex==0)
	  {
          for(i=2;i<table.rows.length;i+=2)
          {
              tr=table.rows[i];
              if(tr.style.color=="green"||tr.style.color=="red")
              {
                  tr.style.display="";
              }
			        else
			        {
				          tr.style.display="none";
				          tr.nextSibling.style.display="none";
			        }
         }
	  }
	  else
	  {
          for(i=2;i<table.rows.length;i+=2)
          {
              tr=table.rows[i];
              if(tr.style.color==obj.value)
              {
                  tr.style.display="";
              }
			        else
			        {
				          tr.style.display="none";
				          tr.nextSibling.style.display="none";
			        }
         }
	  }
}


function displayByPort(obj)
{
    var table=document.getElementById("mosTable");
    if(obj.selectedIndex==0)
	  {
          for(i=2;i<table.rows.length;i+=2)
          {
              tr=table.rows[i];
              tr.style.display="";
          }
	  }
	  else
	  {
          for(i=2;i<table.rows.length;i+=2)
          {
              tr=table.rows[i];
              var sourcePort=tr.cells[5].innerText;
              var destinationPort=tr.cells[6].innerText;
              
              if(sourcePort.indexOf(obj.value)>0||destinationPort.indexOf(obj.value)>0)
              {
                  tr.style.display="";
              }
			        else
			        {
				          tr.style.display="none";
				          tr.nextSibling.style.display="none";
			        }
         }
	  }
}

function Search()
{
    if(nodes==null)return;
    
    var keyword1=document.getElementById("keyword1").value.toLowerCase();
    var keyword2=document.getElementById("keyword2").value.toLowerCase();
    if(keyword1=="")keyword1=keyword2;
    if(keyword2=="")keyword2=keyword1;
    
    if(!checkKeyword(keyword1)||!checkKeyword(keyword2))
    {
				var s="/ < > \" ' & ";
				alert(s+"is invalid chars.");
				return;
    }
    
     document.getElementById("tdExpandOrCollapse").innerText="+"; 
	   var table=document.getElementById("mosTable");
     for(i=2;i<table.rows.length;i+=2)
     {
            tr=table.rows[i];
            var t=tr.firstChild.firstChild.innerText;
            if(t=="-")
            {
				        tr.firstChild.firstChild.innerText="+";
				        tr.nextSibling.style.display="none";
            }
            
            id=Number(tr.childNodes[1].innerText);
            var text=nodes[id].xml.toLowerCase();
            var myLogic=document.getElementById("Logic").value;
            if(myLogic=="AND")
	          {
        	      
		            if(text.indexOf(keyword1)>-1 & text.indexOf(keyword2)>-1)
                {
		                tr.style.display="";
		                //showOrHide(tr.firstChild.firstChild);
                }
                else
                {
		                tr.style.display="none";
                }
	          }
            else
            {
                if(text.indexOf(keyword1)>-1||text.indexOf(keyword2)>-1)
                {
		                tr.style.display="";
		                //showOrHide(tr.firstChild.firstChild);
                }
                else
                {
		                tr.style.display="none";
                }
            }
     }
}

function showOnlyExpanded(obj)
{
    addID();
    var table=document.getElementById("mosTable");
    if(obj.selectedIndex==0)
    {
        displayAll();
    }
    else
    {
        for(i=2;i<table.rows.length;i+=2)
        {
            tr=table.rows[i];
            if(tr.style.display==""&&tr.nextSibling.style.display=="none")
            {
                tr.style.display="none";
            }
        }
    }
}

//返回树形结构的HTML代码
function BuilderTree(node)
{
	var temp="";
	var nodes=node.childNodes;
	for(var i=0;i<nodes.length;i++)
	{
		  //当该节点有子节点时
		  if(nodes[i].hasChildNodes)
		  {
		      var attr=getAttributes(nodes[i]);
		      temp+="<div style='margin-left:20px;overflow:hidden;height:auto'>";
          temp+="<div>";
		      //是否有孙子节点
		      if(nodes[i].firstChild.hasChildNodes)temp+="<span class='ctrlxml' onclick='show(this)'>-</span>";
		      //当前节点的名称,like:<book>
		      temp+="<span class='c1'>&lt;</span><span class='c3'>"+nodes[i].nodeName+"</span>"+attr+"<span class='c1'>&gt;</span>";
		      //当前节点的下级内容
		      temp+=BuilderTree(nodes[i]);
		      //当前节点的名称结束,like:</book>
			    temp+="<span class='c1'>&lt;/</span><span class='c3'>"+nodes[i].nodeName+"</span><span class='c1'>&gt;</span>";
		      temp+="</div></div>";
		  }
      else if(nodes[i].nodeType==1)//此节点为空节点,如:‘<book />’
      {   
          var attr=getAttributes(nodes[i]);
          temp+="<div style='margin-left:20px;overflow:hidden;height:auto'>";
		      temp+="<div><span class='c1'>&lt;</span><span class='c3'>"+nodes[i].nodeName+"</span>"+attr+"<span class='c1'>/&gt;</span></div>";
		      temp+="</div>";
      }
      else//此节点为文本节点
      {
		    temp+="<span>";
        strtext=nodes[i].text.replace(/</g,"&lt;").replace(/"/g,"&quot;").replace(/>/g,"&gt;");
		    temp+=strtext;
		    temp+="</span>";
		  }
	}
	return temp;
}

//获取节点的属性
function getAttributes(node)
{
    var attr="";
		for(j=0;j<node.attributes.length;j++)
		{
		    attr+=' <span class="c2">'+node.attributes[j].nodeName+'</span><span class="c1">=</span>"<span class="c1">'+node.attributes[j].text+'</span>"';
		}
    return attr;
}

//建立XMLdom对象，并载入xml，xmlFilePath为xml的文本路径
function CreateXMLDoc(xmlFilePath)
{
		//获得操作的xml文件的对象 
		var msXMLdom = new ActiveXObject('Microsoft.XMLDOM'); 
		msXMLdom.loadXML(xmlFilePath); 
		return msXMLdom;
}
//操作某个节点是否显示；
function show(obj)
{
  var parentNode=obj.parentNode.parentNode;
	if(parentNode.nodeType==1)
	{
		with(eval(parentNode))
		{
			 if(style.height=="auto")
			 {
			  style.height="12px";
			  obj.firstChild.nodeValue="+";
			 }else
			 {
			  style.height="auto";
			  obj.firstChild.nodeValue="-";
			 }
		}
	}
}

function checkKeyword(keyword)
{
	if(keyword=="") return true;
	var regx=/[/<>"'&]+/;
	return !regx.exec(keyword);
}

function replaceInvalidChars(keyword)
{
    keyword=keyword.replace(/\\/g,"\\\\");
    keyword=keyword.replace(/\|/g,"\\|");
    keyword=keyword.replace(/\?/g,"\\?");
    keyword=keyword.replace(/\*/g,"\\*");
    return keyword;
}

//隐藏和显示mos节点内容
function showOrHide(me)
{ 
      id=Number(me.parentNode.parentNode.childNodes[1].innerText);
      tr=me.parentNode.parentNode.nextSibling;
      if(me.innerText=="+")
      {
          var html=BuilderTree(nodes[id].parentNode);
          var keyword1=document.getElementById("keyword1").value.toLowerCase();
          var keyword2=document.getElementById("keyword2").value.toLowerCase();

          var index1=html.toLowerCase().indexOf(keyword1);
          if(index1>0)
          {
				      var parno1=replaceInvalidChars(keyword1);
				      var regs1 = new RegExp(parno1,"gi");
				      var selectedKey1=html.substring(index1,index1+keyword1.length);
              
				      var regex1=new RegExp("<[^>]+"+replaceInvalidChars(selectedKey1)+"[^<]+>","gi");
				      if(!regex1.exec(html)&&keyword1!="")
              {
					        html=html.replace(regs1,"<span style='background:yellow'>"+selectedKey1+"</span>");
				      }
		      }
          
          var index2=html.toLowerCase().indexOf(keyword2);
          if(index2>0)
          {
              var parno2=replaceInvalidChars(keyword2);
				      var regs2 = new RegExp(parno2,"gi");
				      var selectedKey2=html.substring(index2,index2+keyword2.length);
              var selectedKey2=selectedKey2.replace(/\|/g,"");
				      var regex2=new RegExp("<[^>]+"+replaceInvalidChars(selectedKey2)+"[^<]+>","gi");
				      if(!regex2.exec(html)&&keyword2!="")
              {
					        html=html.replace(regs2,"<span style='background:pink'>"+selectedKey2+"</span>");
				      }
          }
		  
		      div=tr.firstChild.firstChild;
          div.innerHTML=html;
          
          tr.style.display="inline";
          me.innerText="-";
      }
      else
      {
          tr.style.display="none";
          me.innerText="+";
      }
      return false;
 }
 
 function displyMosMessageEndTime()
 {
	  table=document.getElementById("mosTable");
	  lastRow=table.rows[table.rows.length-2];
	  firstRow=table.rows[2];
	  document.getElementById("spanStartTime").innerText=firstRow.cells[4].innerText;
	  document.getElementById("spanEndTime").innerText=lastRow.cells[4].innerText;
	  document.getElementById("spanStartDateTime").innerText=document.getElementById("spanStartDateTime").innerText.split(" ")[0];
	  document.getElementById("spanMessageCount").innerText=(table.rows.length-2)/2;
    document.title=document.getElementById("spanHostName").innerText+"@"+document.getElementById("spanStartDateTime").innerText+" "+document.getElementById("spanStartTime").innerText+"-"+ document.getElementById("spanEndTime").innerText;
 }
 
 function expandOrCollapse(headerRowFirstCell)
 {
	  if(headerRowFirstCell.innerText=="+")
	  {
		  headerRowFirstCell.innerText="-";
	  }
	  else
	  {
		  headerRowFirstCell.innerText="+";
	  }
	
	  table=document.getElementById("mosTable");
     for(i=2;i<table.rows.length;i+=2)
     {
         tr=table.rows[i];
         nextTr=tr.nextSibling;
         curStat=tr.firstChild.firstChild.innerText;
         if(tr.style.display=="")
         {
            if(curStat!=headerRowFirstCell.innerText)
            {
				        showOrHide(tr.firstChild.firstChild);
            }
         }
     }
 }
 
 var nodes;//保存所有MOS节点的集合
 
 function addID()
 {
     table=document.getElementById("mosTable");
     id=0;
     for(i=2;i<table.rows.length;i+=2)
     {
         tr=table.rows[i];
         tr.childNodes[1].innerText=id;
         id++;
     }
     
    msXMLdom = new ActiveXObject('Microsoft.XMLDOM'); 
		msXMLdom.load(location.href); 
    nodes=msXMLdom.getElementsByTagName("mos");
 }
 
 function onBodyLoad()
 {
    displyMosMessageEndTime();
    addID();
 }
 
      ]]>
        </script>
      </head>
      <center>
        <body onload="onBodyLoad();" style="margin:5 auto;font-size:12px">
          <div>
            <b>HostName: </b><span id="spanHostName">
              <xsl:value-of select="MOSLog/@HostName" />
            </span>
            <span style="margin-left:20px">
              <b>Date: </b>
            </span><span id="spanStartDateTime">
              <xsl:value-of select="MOSLog/@StartTime" />
            </span>
            <span style="margin-left:20px">
              <b>Duration: </b>
            </span><span id="spanStartTime"></span>~<span id="spanEndTime"></span>
            <span style="margin-left:20px">
              <b>MessageCount: </b>
            </span><span id="spanMessageCount"></span>
          </div>
          <!--<hr width="960px"/>-->
          <table border="0" cellpadding="5" cellspacing="0" class="tablestyle" id="mosTable"  >
            <tr>
              <td colspan="7">
                <div style="padding:4px; border:1px solid;">
                  <form>
                    <table  border="0" cellpadding="2" cellspacing="0">
                      <tr style="font-size:12px">
                        <td align="left">Type</td>
                        <td align="left">
                          <select name="select" onchange="displayByType(this)">
                            <option value="all" selected="selected">All</option>
                            <option value="mosAck">mosAck</option>
                            <option value="roAck">roAck</option>
                            <option value="roCreate">roCreate</option>
                            <option value="roElementAction">roElementAction</option>
                            <option value="roReq">roReq</option>
                            <option value="roDelete">roDelete</option>
                            <option value="roReplace">roReplace</option>
                            <option value="roMetadataReplace">roMetadataReplace</option>
                            <option value="roReadyToAir">roReadyToAir</option>
                            <option value="roReqAll">roReqAll</option>
                            <option value="roStorySend">roStorySend</option>
                            <option value="roList">roList</option>
                            <option value="roListAll">roListAll</option>
                            <option value="mosReqObj">mosReqObj</option>
                            <option value="mosReqAll">mosReqAll</option>
                            <option value="mosObjCreate">mosObjCreate</option>
                            <option value="mosReqObjAction">mosReqObjAction</option>
                            <option value="mosListAll">mosListAll</option>
                            <option value="mosObj">mosObj</option>
                            <option value="roStat">roStat</option>
                            <option value="roItemStat">roItemStat</option>
                            <option value="roElementStat">roElementStat</option>
                            <option value="mosItemReplace">mosItemReplace</option>
                          </select>
                        </td>
                        <td align="left">
                          ACKStatus
                        </td>
                        <td align="left">
                          <select name="select2" onchange="displayByStatus(this)">
                            <option value="all" selected="selected">All</option>
                            <option value="green">ACK/OK</option>
                            <option value="red">NACK/ERROR</option>
                          </select>
                        </td>
                        <td align="left">Display</td>
                        <td align="left">
                          <select name="select3" onchange="showOnlyExpanded(this)">
                            <option value="0" selected="selected">All items</option>
                            <option value="1">Expanded items only</option>
                          </select>
                        </td>
                        <td align="left">Port</td>
                        <td align="left">
                          <select name="select4" onchange="displayByPort(this)">
                            <option value="0" selected="selected">All</option>
                            <option value="10540">Mos</option>
                            <option value="10541">Ro</option>
                          </select>
                        </td>
                      </tr>
                      <tr style="font-size:12px">
                        <td>Search</td>
                        <td  colspan="9">
                          <input type="text"  value="" size="50" id="keyword1" onpropertychange="Search()" style="margin-right:3px"/>
                          <select name="Logic" onchange="Search()">
                            <option value="AND" selected="selected">AND</option>
                            <option value="OR">OR</option>
                          </select>
                          <input style="margin-left:3px" type="text"  value="" size="50" id="keyword2" onpropertychange="Search()"/>

                        </td>
                        <td>
                          <input type="reset" onclick="displayAll();"  value="Reset"/>
                        </td>
                      </tr>
                    </table>
                  </form>
                </div>
              </td>
            </tr>
            <tr class="header">
              <td style="cursor:pointer" onclick="expandOrCollapse(this)" id="tdExpandOrCollapse">+</td>
              <td>ID</td>
              <td>MessageID</td>
              <td>MessageType</td>
              <td>Time</td>
              <td>Source</td>
              <td>Destination</td>
            </tr>
            <xsl:for-each select="/MOSLog/*">
              <!--<xsl:sort select="@command"/>-->
              <xsl:choose>
                <xsl:when test="@command='roCreate'or @command='roElementAction' or @command='roReq' or @command='roDelete' or @command='roReplace' or @command='roMetadataReplace' or @command='roReadyToAir' or @command='roReqAll' or @command='roStorySend'">
                  <tr class="RoReuqest">
                    <xsl:call-template name="item"/>
                  </tr>
                  <tr style="display:none">
                    <xsl:call-template name="mosxml"/>
                  </tr>
                </xsl:when>
                <xsl:when test="@command='roList' or @command='roListAll'">
                  <tr class="RoResponse">
                    <xsl:call-template name="item"/>
                  </tr>
                  <tr style="display:none">
                    <xsl:call-template name="mosxml"/>
                  </tr>
                </xsl:when>
                <xsl:when test="@command='mosReqObj' or @command='mosReqAll' or @command='mosReqObjList' or @command='mosObjCreate' or @command='mosReqObjAction'">
                  <tr class="MosRequest">
                    <xsl:call-template name="item"/>
                  </tr>
                  <tr style="display:none">
                    <xsl:call-template name="mosxml"/>
                  </tr>
                </xsl:when>
                <xsl:when test="@command='mosListAll' or @command='mosObjList' or (@command='mosObj' and name(.)='mosResponse')">
                  <tr class="MosResponse">
                    <xsl:call-template name="item"/>
                  </tr>
                  <tr style="display:none">
                    <xsl:call-template name="mosxml"/>
                  </tr>
                </xsl:when>
                <xsl:when test="@command='mosObj' and name(.)='mosNotify'">
                  <tr class="MosNotification">
                    <xsl:call-template name="item"/>
                  </tr>
                  <tr style="display:none">
                    <xsl:call-template name="mosxml"/>
                  </tr>
                </xsl:when>
                <xsl:when test="@command='roStat' or @command='roItemStat' or @command='roElementStat'">
                  <tr class="RoStatusNotification">
                    <xsl:call-template name="item"/>
                  </tr>
                  <tr style="display:none">
                    <xsl:call-template name="mosxml"/>
                  </tr>
                </xsl:when>
                <xsl:when test="@command='mosItemReplace'">
                  <tr class="RoMetadataNotification">
                    <xsl:call-template name="item"/>
                  </tr>
                  <tr style="display:none">
                    <xsl:call-template name="mosxml"/>
                  </tr>
                </xsl:when>
                <xsl:when test="@command='mosAck'">
                  <xsl:if test="starts-with(mos/mosAck/status,'ACK')">
                    <tr class="Acknowledge_mos" style="color:green">
                      <xsl:call-template name="item"/>
                    </tr>
                  </xsl:if>
                  <xsl:if test="not(starts-with(mos/mosAck/status,'ACK'))">
                    <tr class="Acknowledge_mos" style="color:red">
                      <xsl:call-template name="item"/>
                    </tr>
                  </xsl:if>
                  <tr style="display:none">
                    <xsl:call-template name="mosxml"/>
                  </tr>
                </xsl:when>
                <xsl:when test="@command='roAck'">
                  <xsl:if test="starts-with(mos/roAck/roStatus,'OK')">
                    <tr class="Acknowledge_ro" style="color:green">
                      <xsl:call-template name="item"/>
                    </tr>
                  </xsl:if>
                  <xsl:if test="not(starts-with(mos/roAck/roStatus,'OK'))">
                    <tr class="Acknowledge_ro" style="color:red">
                      <xsl:call-template name="item"/>
                    </tr>
                  </xsl:if>
                  <tr style="display:none">
                    <xsl:call-template name="mosxml"/>
                  </tr>
                </xsl:when>
                <xsl:when test="@command='mosObjTransfer' or @command='mosObjTransferAck'">
                  <tr class="Customized">
                    <xsl:call-template name="item"/>
                  </tr>
                  <tr style="display:none">
                    <xsl:call-template name="mosxml"/>
                  </tr>
                </xsl:when>
                <xsl:otherwise>
                  <tr bgcolor="yellow">
                    <xsl:call-template name="item"/>
                  </tr>
                  <tr style="display:none">
                    <xsl:call-template name="mosxml"/>
                  </tr>
                </xsl:otherwise>
              </xsl:choose>
            </xsl:for-each>
          </table>
        </body>
      </center>
    </html>
  </xsl:template>
  <xsl:template name="item">
    <td>
      <a href="javascript:" onclick="showOrHide(this)" class="button1">+</a>
    </td>
    <td></td>
    <td>
      <xsl:value-of select="mos/messageID"/>
    </td>
    <td>
      <xsl:value-of select="@command"/>
    </td>
    <td>
      <xsl:value-of select="@time"/>
    </td>
    <td>
      <xsl:value-of select="@source"/>
      <xsl:if test="@sourcePort!=''">
        (<xsl:value-of select="@sourcePort"/>)
      </xsl:if>
    </td>
    <td>
      <xsl:value-of select="@destination"/>
      <xsl:if test="@destinationPort!=''">
        (<xsl:value-of select="@destinationPort"/>)
      </xsl:if>
    </td>
  </xsl:template>
  <xsl:template name="mosxml">
    <td colspan="7">
      <div class="mosstyle"/>
    </td>
  </xsl:template>
</xsl:stylesheet>
