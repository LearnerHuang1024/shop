var acon = document.getElementById("con");
var con_foot = document.querySelector(".con_foot");
var findGoods=document.getElementById("findGoods");
var pageFirst =document.getElementById("pageFirst");
var pageLast = document.getElementById("pageLast");
var cart = document.querySelector(".cart");
var downs = document.getElementById("downs");
var search = document.getElementById("search");
var sumList=[];
var isNow=0;//当前页码
var sum = 0;//数据长度
var num = 0;//页码
ajax("get","goods.json","",function(list){
	listSum(list);
	isNow=0;//当前页码
	sum = sumList.length;//数据长度
	num = Math.ceil(sum/3);//页码
	//所有品牌下拉框显示
	list_head(list,"");
	//分页显示
	findpage();
	//分页数字点击事件
	pagenum();

	//页面跳转功能
	var locationscr =decodeURI(location.href,"utf-8") ;
	var findval = locationscr.split("?");
	if(findval.length!=1){
		var obj1=find(list,findval[1]);
		sumList=obj1;
		if(sumList.length==0){
			acon.innerHTML=`<div>
			<h3>没有找到相关内容</h3>
		</div>`;
			//listSum(list);
		}
		list_head(list,findval[1]);
		findpage();
	}
	//分页点击按钮
	pageLast.onclick = function(){
		var nn=num;
		if(isNow==nn-1){
			isNow==isNow;
		}else{
			isNow++;
			paging(isNow);
		}
		
	}
	pageFirst.onclick = function(){
		if(isNow==0){
			isNow==0;
		}else{
			isNow--;
			paging(isNow);
		}
	}
	
	
	onli();
	search.onclick = function(){
		var obj1=find(list,findGoods.value);
		if(findGoods.value==""){
			//alert("未找到相关查询内容");
			location.href="list.html";
		}else if(obj1.length==0){
			acon.innerHTML=`<div>
			<h3>没有找到相关内容</h3>
		</div>`;
		//obj1=list;
		}
			sumList=obj1;
			list_head(list,findGoods.value);
			findpage();
	
	}

	//价格查询点击事件
	var pricebut = document.getElementById("pricebut");
	pricebut.onclick = function(){
		var aprice =document.querySelectorAll("#allprice>.aprice");
		var data=[];
		if(aprice[0].value && aprice[1].value){
			if(aprice[0].value>aprice[1].value){
			data.push(aprice[1].value);
			data.push(aprice[0].value);
			}else{
				data.push(aprice[0].value);
				data.push(aprice[1].value);
			}
			if(find2(sumList,data).length!=0){
				sumList=find2(sumList,data);
				findpage();
			}else{
				alert("没有找到相应的商品");
			}
		}else{
				alert("数据输入错误");
			}
		
		
	}
	

	
})
//分页显示
function findpage(){
		sum = sumList.length;
		num = Math.ceil(sum/3);
		if(document.querySelectorAll(".page")){
			var aa=document.querySelectorAll(".page")
			for(var i=0;i<aa.length;i++){
				aa[i].remove();
			}
		}
		for(var i=0;i<num;i++){
			var oa = document.createElement("a");
			oa.innerHTML=i+1;
			oa.className="page";
			con_foot.insertBefore(oa,pageLast);
		}
		paging(0);
		pagenum();
	}


//分页
function paging(n){
	if(sumList.length!=0){
		var src="";
		for(var i=3*n;i<Math.min(sum,3+3*n);i++){
			src +=`<dl date-url="${sumList[i].id}">
				<dt>
				<a href="#"><img src="${sumList[i].pic[0]}" /></a>
				<div class="simg">`;
				for(var m=0;m<sumList[i].pic.length;m++){
					src+=`<img src="${sumList[i].pic[m]}" date-url="${sumList[i].pic[m]}"/>`;
				}
				src +=`</div>
					</dt>
					<dd>
						<h3>￥${sumList[i].price}</h3>
						<a href="#">${sumList[i].name}</a>
					</dd></dl>
				`;
		}
		acon.innerHTML=src;
		var simg = document.querySelectorAll(".simg");
		imgChange(simg);
		var odl = acon.getElementsByTagName("dl");
		pageTiao(odl);
	}}

//列表头部的信息动态展示
function list_head(list,val){
	var allshop = document.getElementById("allshop");
	var allkinds= document.getElementById("allkinds");
	var str="";
	str+="<option>所有品牌<option>";
	var arr=norepeat(sumList);
	for(var i in arr){
		str+="<option>"+arr[i]+"</option>";
	}
	allshop.innerHTML=str;
	var obj = find1(list,val);
	str="";
	for(var i in obj){
		str+="<a href=list.html?"+obj[i]+">"+obj[i]+"</a>";
	}
	allkinds.innerHTML=str;



	}


//数组去重
function norepeat(arr){//新建数组存
	var newArr = [];
	for(var i in arr){
		if(newArr.indexOf(arr[i].shop)==-1){
			newArr.push(arr[i].shop);
		}
	}
	return newArr;
}

//页码数字点击
function pagenum(){
	var page = document.querySelectorAll(".page");
	for(var i=0;i<page.length;i++){
		page[i].onclick = function(){
			isNow=(this.innerHTML-1);
			paging(isNow);
		}
	}
}




//给sumList赋值
function listSum(list){
	for(var i in list){
		var list1=list[i].detail;
		for(var j in list1){
			var list2=list1[j].details;
			for(var k in list2){
				sumList.push(list2[k]);
			}
		}
	}
}


//查询显示种类
function find1(list,data){
	var obj=[];
	var bstop=true;
	var count=0;
	if(data!=""){
		for(var i in list){
			if(list[i].kind==data){
				bstop=false;
				count++;
				var list1=list[i].detail;
				for(var j in list1){
					obj.push(list1[j].kinds);
				}
			}
			if(bstop==false){
				bstop=true;
				break;
			}
		}
		if(count==0){
			for(var i in list){
				var list1=list[i].detail;
				for(var j in list1){
					if(list1[j].kinds==data){
						bstop=false;
						count++;
						obj.push(list1[j].kinds);	
					}
					if(bstop==false){
						break;
					}
				}
				if(bstop==false){
					bstop=true;
					break;
				}
			}
		}
	}else{
		for(var i in list){
			obj.push(list[i].kind);
		}

	}
	return obj;
}


//按价格查询
function find2(list,data){
	var obj=[];
	for(var i in list){
		if(list[i].price<=data[1] && list[i].price>=data[0]){
			obj.push(list[i]);
		}
	}
	return obj;
}