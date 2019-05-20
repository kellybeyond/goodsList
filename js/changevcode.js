/*
实现的功能：更换验证码
ele需要点击的元素
img接收更换验证码图片的id
*/
function changevcode(ele,img){
	$("#"+ele).click(function(){
		nums=new Date().getTime()
		$("#"+img).attr('src','http://192.168.4.233:3000/capt?'+new Date().getTime())
		// console.log($.cookie('capt'))
		
	})
}