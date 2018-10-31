$(function() {
	//顶部最新查询轮播
	$(".J_searchSlider").slide({
		mainCell: ".bd ul",
		autoPlay: true,
		effect: "leftMarquee",
		vis: 5,
		interTime: 50
	});
	/*S 楼层跳转*/
	var floorLinkWrapper=$(".J_floorLinkWrapper");
	var floorLink=$(".J_floorLink");
	var floorItem=$(".J_floor");
	var floorFlag=true;
	//楼层跳转显示
	function showFloorWrapper(){
        if($(window).scrollTop()>floorItem.eq(0).offset().top - floorItem.eq(0).height()){
            floorLinkWrapper.fadeIn();
            getFloor();
        }else{
            floorLinkWrapper.fadeOut();
        }    	
    }	
    //楼层跳转
    function getFloor(){
    	if(floorFlag){
    		for(var i=0;i<floorItem.length;i++){
			if($(window).scrollTop()>floorItem.eq(i).offset().top-550){
					floorLink.removeClass('active').eq(i).addClass('active');
				}
			}
    	}else{
    		return;
    	}		
	}
	if(floorLinkWrapper&&floorItem.length){
		$(window).scroll(function(){
	    	showFloorWrapper();
		})
		getFloor();
	    floorLink.on("click",function(){
	    	floorFlag=false;
	    	var index=$(this).index();
	    	floorLink.removeClass('active').eq(index).addClass('active');
	    	$("html,body").animate({"scrollTop":floorItem.eq(index).offset().top-90},500,function(){
	    		floorFlag=true;
	    	});
	    })
	}    
	/*E 楼层跳转*/
	/*S 弹窗*/
	//打开弹窗
	$('.J_search').on('click',function(){
		$(".J_brandWrapper").show();
		$(".J_brandWrapper .J_brandWrapper_oneStep").show();
		$('.J_brandWrapper_twoStep').hide();
	});	
	//弹窗下一步
	$(".J_see_result").on("click",function(){
		$(this).parents('.J_brandWrapper_oneStep').hide();
		$(this).parents('.J_brandWrapper_oneStep').next(".J_brandWrapper_twoStep").show();
	});	
	//关闭弹窗
	$(".J_closeBrandLayer").on("click",function(){
		$(".J_brandWrapper").hide();
	}); 	
	/*E 弹窗*/
})