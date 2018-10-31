$(function() {
	// 切换地区
	$('.J_location').on('click', function() {
		if($('#citys').css('display') == 'none') {
			$('#citys').show();
		} else {
			$('#citys').hide();
		}
	})
	$('#citys').change(function(e) {
		var targetObj = e.target;
		$('#selectedCity').text(targetObj.options[targetObj.selectedIndex].value);
	});
	//查询直播轮播
	$(".J_dynamic").slide({
		mainCell: ".bd .transaction",
		autoPage: true,
		effect: "topLoop",
		autoPlay: true,
		vis: 2
	});
		
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
})
