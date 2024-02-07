var top = window.screen.height / 2 - 250;
var left = window.screen.width / 2 - 300;

/*title是标题，rLink链接，summary内容，site分享来源，pic分享图片路径,分享到新浪微博*/
function shareTSina(title,rLink,site,pic) {
	alert("in");
    title = "标题。";
  // pic = $(".p-img img").attr("src");
   rLink = "http://www.abc.com/heeh.html";
   
    window.open("http://service.weibo.com/share/share.php?pic=" +encodeURIComponent(pic) +"&title=" + 
    encodeURIComponent(title.replace(/&nbsp;/g, " ").replace(/<br \/>/g, " "))+ "&url=" + encodeURIComponent(rLink),
    "分享至新浪微博",
    "height=500,width=600,top=" + top + ",left=" + left + ",toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no");
    
}

/*,分享到qq空间*/
function shareQzone(title,rLink,summary,site,pic) {
	 title = "标题。";
	 rLink = "http://www.abc.com/heeh.html";
	 site = "http://www.abc.com/heeh.html";
	  window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title='+
                       encodeURIComponent(title)+'&url='+encodeURIComponent(rLink)+'&summary='+
                       encodeURIComponent(summary)+ '&site='+encodeURIComponent(site)
                       ,'_blank','scrollbars=no,width=600,height=450,left=' + left + ',top=' + top + ',status=no,resizable=yes');
  
	 }

/*,分享到人人*/
function shareRR(title,rLink,summary){   
	 title = "标题。";
	 summary = "内容。";
	 rLink = "http://www.abc.com/heeh.html";
    window.open('http://share.renren.com/share/buttonshare/post/1004?title='+encodeURIComponent(title)+'&url='+
     encodeURIComponent(rLink)+'&content='+encodeURIComponent(summary),'_blank',
     'scrollbars=no,width=600,height=450,left=' + left + ',top=' + top + ',status=no,resizable=yes'); 
}





//开心网 
function shareKX(title,rLink,summary){    
	 title = "标题。";
	 rLink = "http://www.abc.com/heeh.html";
        window.open('http://www.kaixin001.com/repaste/bshare.php?rtitle='+encodeURIComponent(title)+
        '&rurl='+encodeURIComponent(rLink)+
'&rcontent='+encodeURIComponent(summary),'_blank',
        'scrollbars=no,width=600,height=450,left=' + left + ',top=' + top + ',status=no,resizable=yes');   
} 

//腾讯微博
function shareToWb(title,rLink,site,pic){   
	  title = "标题。";
	  rLink = "http://www.abc.com/heeh.html";
         window.open('http://v.t.qq.com/share/share.php?url='+encodeURIComponent(rLink)+
          '&title='+encodeURI(title)+'&appkey='+encodeURI(site),'_blank',
           'scrollbars=no,width=600,height=450,left=' + left + ',top=' + top + ',status=no,resizable=yes');     
}


   
  /*分享到msn*/
  function shareToMSN(imgUrl){  
	  var title = "标题。";
      var content = "内容";     
      var productUrl ="http://www.abc.com/heeh.html";
     
      window.open("http://profile.live.com/badge/?url=" + productUrl + "&title=" + encodeURI(title) +"&screenshot="+encodeURIComponent(imgUrl));
	     
 }  
