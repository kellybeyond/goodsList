function Item(pic,title,price,unit,gclick,common,gtype){	//产品类
	var odiv=$("<div class='col-xs-12 col-sm-6'>")
	var oimg=$("<img data-src='holder.js/500x300'/>")
	oimg.css("width","500px").css("height","300px")
	if(pic.indexOf('/')>0){
		var arr=pic.split('/')
		oimg.attr("src","http://192.168.4.233:3000/images/"+arr[1])
	}else{
		oimg.attr("src","http://192.168.4.233:3000/images/"+pic)
	}

	var oh3=$("<h3>")
	oh3.text(title)
	var oh4=$("<h4>")
	oh4.text(price)
	var ospan1=$("<span>")
	ospan1.text(unit)
	var ospan2=$("<span>")
	ospan2.html("点击率:<span class='badge'>"+gclick+"</span>")
	var oh5=$("<h5>")
	oh5.text("评论："+common)
	var oinput=$("<input type='hidden' />")
	oinput.val(gtype)
	
	odiv.append(oimg)
	odiv.append(oh3)
	odiv.append(oh4)
	odiv.append(ospan1)
	odiv.append(ospan2)
	odiv.append(oh5)
	odiv.append(oinput)
	return odiv	//返回产品对象
}	