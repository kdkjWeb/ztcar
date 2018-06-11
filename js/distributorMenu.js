$(function(){
	$('.divList').on('click',function(){
		$(this).find('ul').fadeToggle();
		$(this).siblings('.divList').find('ul').fadeOut();
	})
 
})