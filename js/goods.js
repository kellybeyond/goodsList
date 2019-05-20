/**
 * 通过ajax获取商品，在主页面调用
 * @param {*} url 数组获取的地址
 */
function getGood(url){
	if(!navigator.onLine){	//检测在线
		alert('你的电脑没有连接网络')
		return;
	}
	$.ajax({
		url:url,
		type:'get',
		dataType:"jsonp",
		success:function(res){
			console.log(res.result[0])
			console.log(res.result);			
			goods=res.result	//goods全部商品，全局变量，数组			
			sessionStorage.setItem('goods',JSON.stringify(goods))	//把所有商品数组变成json字符串存入sessionStorage作为中介方便存取
			listgoods(goods)	//请求成功后初始化，加载全部商品
		},
		error:function(err){
			console.log(err)
		}
	})

	//给价格排序与点击率排序以及库存排序和七个不同产品类型分类添加事件
	$("#click_price").click(function(){
		paixu('gprice')
	})
	$("#click_rate").click(function(){
		paixu('gclick')
	})
	$("#click_kucun").click(function(){
		paixu('gkucun')
	})
	$('#searchBtn').click(function(){	//搜索框点击搜索对应产品
		search()
	})
	$('#search').change(function(){	//搜索框点击搜索对应产品
		search()
	})
	for(let j=0;j<7;j++){
		$("#fen_"+j).click(function(){
			guolv(j)	//哪一个分类被点击就过滤，只留下那一类的产品
		})
	}

}
/**
 * function:sort 排序函数
 * @param {*} glabel 排序的类型，价格排序或点击率排序或库存排序，字符串
 */
function paixu(glabel){
	type=sessionStorage.getItem("type")	//读sessionStorage检测是否产品类别排序过
	if(type==null || type==0){	//
		goods=sessionStorage.getItem("goods")
	}else{
		goods=sessionStorage.getItem("items")
	}
	
	flag=sessionStorage.getItem(glabel)	//排序标志位
	if (flag==null){	//未排序时
		sessionStorage.setItem(glabel,1)	//用0与1区别状态
	}else{
		flag=(flag=='1')?'0':'1',
		sessionStorage.setItem(glabel,flag)
	}
	goods=JSON.parse(goods)	//把字符串转成json数组
	console.log(goods)
	goods.sort(function(a,b){	//排序
		if(flag==1){	//实现升序或降序
			return a[glabel]-b[glabel]
		}else{
			return b[glabel]-a[glabel]
		}		
	})		
	listgoods(goods)	//add goods
}


/**
 * function:add goods to the html
 * goods：提供所要展示的产品数组
 * @param {*} goods :goods array
 */
function listgoods(goods){
	$("#goodslist").empty()
	for(let i=0;i<goods.length;i++){
		var v=goods[i]
		var item=new Item(v.gpic,v.gtitle,v.gprice,v.gunit,v.gclick,v.gjianjie,v.gtypeid)	//用item接收生成的div产品对象
		$("#goodslist").append(item)	//把产品添加到产品列表
	}
}



/**
 * function:filter
 * 过滤产品类型
 * parameter:type
 * @param {*} type 
 */
function guolv(type){
	//获取sessionStorage中的goods数据
	goods=sessionStorage.getItem("goods")
	goods=JSON.parse(goods)
	//type==0,全部，展示所有产品
	if(type==0){
		listgoods(goods)
	}else{
		items=goods.filter(function(item){	//数组过滤，把所选择的那一类产品放进数组
			if(item.gtypeid==type){
				return item;
			}
		})
		listgoods(items)	//把过滤后的数组产品展示出来
	}
	sessionStorage.setItem('type',type)
	sessionStorage.setItem('items',JSON.stringify(items))	//把筛选后的产品放入sessionStorage
}

$('#searchBtn').click(function(){	//搜索框点击搜索对应产品
	search()
})
/**
 * function:search goods through key words
 */
function search(){
	str=$('#search').val()	//获取搜索框内的词
	if(str==''){	//检测空输入点击
		listgoods(goods)
	}else{
		find(str)
	}
}


/**
 * 模糊查询
 * 功能：通过匹配字符串找到对应的项
 * 参数：字符串
 */
function find(str){
	var len = goods.length;	//产品个数，循环的次数
	var arr = [];	//用于存放查找后的产品
	var arr2=[];	//存放与类型相关的产品
	var resProduct=[]
	let goodslist=['全部','新鲜水果','海鲜特产','猪牛羊肉','肉禽蛋品','新鲜蔬菜','速冻食品']
	var items=[];
	//模糊搜索
	for(var i=0;i<len;i++){
			//如果字符串中不包含目标字符会返回-1
			let products=JSON.stringify(goods[i])	//把一个产品JSON字符串化			
			if(products.indexOf(str)>=0){	//查找该产品是否包含搜索词，将匹配的产品放入数组
					arr.push(goods[i]);					
			}
	}
	//类别搜索
	for(let i=0;i<7;i++){
			//如果字符串中不包含目标字符会返回-1
			if(goodslist[i].indexOf(str)>=0){	//查找该类别名是否包含搜索词，将匹配的产品放入数组
					items=goods.filter(function(item){	//数组过滤，把所选择的那一类产品放进数组
						if(item.gtypeid==i){
							return item;
						}
					})					
			}		
			arr2=arr2.concat(items)	
	}
	arr2=unique(arr2)	//去重				

	resProduct=arr.concat(arr2)	//把两种方案的结果加起来
	resProduct=unique(resProduct)	//去重

	listgoods(resProduct)
	console.log(resProduct);
	
	sessionStorage.setItem('type',8)	//将搜索出来的产品放入(伪)第八类
	sessionStorage.setItem('items',JSON.stringify(resProduct))	//把筛选后的产品放入sessionStorage
}

/**
 * function unique
 * @param {*} array 
 */
function unique(array){
	let arr2=[];
	for(let i=0;i<array.length;i++){
		if(-1==arr2.indexOf(array[i])){
			arr2.push(array[i])
		}
	}
	return arr2;      
}