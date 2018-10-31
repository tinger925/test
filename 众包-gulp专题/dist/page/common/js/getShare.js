var shareImg = 'http://wx.dadetong.com/static/img/ico.jpg';
//分享 集合   朋友圈，微信朋友，qq、腾讯微博  、qq空间
function shareCommonFn(shareTitle,shareDesc,shareLink,shareImgUrl){
	let title = shareTitle||document.title||"赚佣金，无上限？呼朋唤友造起来！",
		desc=shareDesc||getDesc(),
		link=shareLink||window.location.href,
		imgUrl = shareImgUrl||getShareImg();// 分享 标题  链接，图标
		//imgUrl=imgUrl.indexOf("static")>-1?("http://"+location.host+imgUrl):imgUrl
	    link=link.indexOf("http://")>-1?link:"http://"+link
	//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
	wx.onMenuShareTimeline({
	    title: title, // 分享标题
	    link:link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
	    imgUrl: imgUrl, // 分享图标
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	        console.log("分享到朋友圈sucess",title,link,imgUrl)
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	         console.log("分享到朋友圈cancel",title,link,imgUrl)
	    }
	});
	//获取“分享给朋友”按钮点击状态及自定义分享内容接口
	wx.onMenuShareAppMessage({
	    title: title, // 分享标题
	    desc: desc, // 分享描述
	    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
	    imgUrl: imgUrl, // 分享图标
	    type: '', // 分享类型,music、video或link，不填默认为link
	    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
	//获取“分享到QQ”按钮点击状态及自定义分享内容接口
	wx.onMenuShareQQ({
	    title: title, // 分享标题
	    desc: desc, // 分享描述
	    link: link, // 分享链接
	    imgUrl: imgUrl, // 分享图标
	    success: function () { 
	       // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	       // 用户取消分享后执行的回调函数
	    }
	});
	//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
	wx.onMenuShareWeibo({
	    title:title, // 分享标题
	    desc: desc, // 分享描述
	    link: link, // 分享链接
	    imgUrl: imgUrl, // 分享图标
	    success: function () { 
	       // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
	//获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
	wx.onMenuShareQZone({
	    title: title, // 分享标题
	    desc: desc, // 分享描述
	    link: link, // 分享链接
	    imgUrl:imgUrl, // 分享图标
	    success: function () { 
	       // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
}


//获取页面  description 信息
function getDesc(){
	let meta = document.getElementsByTagName('meta');
	let share_desc = '';
	for(let i in meta){
		 if(typeof meta[i].name!="undefined"&&meta[i].name.toLowerCase()=="description"){
		  share_desc = meta[i].content;
		 }
	}
	return share_desc;
}
//获取网页第一张符合 微信风险的图片  图片宽度高度 大于 300
function getShareImg(){
	let $img=$("#FXIcon");
	let src_ok="";
//	if(img.length>0){//符合分享的图片
//		//循环找到第一个符合分享的图片
//		for(let i=0;i<img.length;i++){
//			if(img[i].width>=300&&img[i].height>=300){
//				src_ok=img[i].src;
//				break;
//			}
//		}
//	}
    if($img.length){
       src_ok=$img.attr("src");
       src_ok=window.location.href.slice(0,window.location.href.lastIndexOf('/'))+src_ok.slice(1);
    }
	return src_ok||shareImg;
}
//设置微信分享
//获取微信分享签名
function wxShare(url,shareTitle,shareDesc,shareLink,shareImgUrl){
	if(!url){
		url = location.href;
	}
	$.post('http://www.dadetong.com/site/index/getsign',{uri:url},function(res){
		wx.config({
		    //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: res.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
		    timestamp: res.timestamp, // 必填，生成签名的时间戳
		    nonceStr: res.nonceStr, // 必填，生成签名的随机串
		    signature: res.signature,// 必填，签名，见附录1
		    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		wx.ready(function(){

			 // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
		     //config是一个客户端的异步操作，
		     //所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
		     //对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		     //微信分享公共函数
		     shareCommonFn(shareTitle,shareDesc,shareLink,shareImgUrl);
		});
	})
}
//初始化微信分享
$(function(){
	wxShare();
})
