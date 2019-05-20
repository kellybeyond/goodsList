/*
btn接收点击事件的按钮
form接收的form表单的id
url注册提交的地址
rurl成功之后的跳转地址
功能异步完成注册同时局部刷新页面，获取服务器数据
*/
function register(btn,form,url,rurl){
	/*把错误信息隐藏*/
	init()
	/*点击的按钮动作*/
	$("#"+btn).click(function(){
		init()
		/*通过serializeArry把参数分解成数组，直接调用数组的值 */
		var datas=$("#"+form).serializeArray()
		/*判断某一项数据是否为空，为空是不允许注册*/
		for(let i=0;i<datas.length;i++){
			if (datas[i].value==''){
				$("#error_"+datas[i].name).text('上面的输入框不能为空')
				$("#error_"+datas[i].name).show()
			}
		}
		console.log(datas)
		console.log(rurl);
		
		/*先判断当前用户名是否可以注册*/
		var userdata=datas[0].name+"="+datas[0].value
		$.post('http://192.168.4.233:3000/users/checkuser',userdata,function(res){
			console.log(res)
			if(res.status==1){
				$("#error_username").text(res.result)
				$("#error_username").show()
				return;
			}
		})
		/*第一项和第二项对比的密码和确认密码*/
		if(datas[1].value!=datas[2].value){
			$("#error_pwd").text('两次密码输入不一致')
			$("#error_pwd").show()
			return
		}
		/*判断邮箱的合法性*/
		if (datas[3].value.indexOf("@")==0 || datas[3].value.indexOf("@")==(datas[3].value.length-1) || datas[3].value.indexOf("@")==-1){
			$("#error_email").text('邮箱格式不正确')
			$("#error_email").show()
			return
		}
		/*第四项对比验证码,需要jsonp请求验证码数字接口*/
		$.ajax({
			url:'http://192.168.4.233:3000/captnum',
			type:'get',
			dataType:'jsonp',
			success:function(res){
				console.log('res:'+res);				
				console.log('res.result:'+res.result);
				console.log('datas:'+datas);	
				console.log('capt:'+$.cookie('capt'));											
				if(datas[4].value.toLowerCase()!=res.result){
					$("#error_vcode").text('验证码不正确')
					$("#error_vcode").show()
					return;
				}				
			}
		})

		/*协议框是否被选中*/
		if(!$("#agree").is(':checked')){
			$("#agree").show()
			return
		}

		/*利用serialize把表单序列化*/
		var data=$("#"+form).serialize()
		/*这里用异步ajax来提交*/

		$.post(url,data,((res)=>{
			console.log(res)
			if(res.status==0){
				sessionStorage.setItem('username',datas[0].value)
				sessionStorage.setItem('password',datas[1].value)				
				location.href=rurl
			}
		}))
	})
	
}
function init(){
	$("#error_username").hide()
	$("#error_password").hide()
	$("#error_repassword").hide()
	$("#error_pwd").hide()
	$("#error_vcode").hide()
	$("#error_agree").hide()
	$("#error_email").hide()
}