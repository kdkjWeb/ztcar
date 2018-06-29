$(function(){
	$('.divList').on('click',function(){
		$(this).siblings('ul').fadeToggle();
		$(this).parents('div').siblings('div').find('ul').fadeOut();
	})
})