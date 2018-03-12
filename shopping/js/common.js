

//点击查询查询
var findGoods=document.getElementById("findGoods");
var search = document.getElementById("search");
var downs = document.getElementById("downs");
search.onclick = function(){
		location.href=encodeURI("list.html?"+findGoods.value,"utf-8");
	}
ajax("get","goods.json","",function(list){
	//搜索功能
	findGoods.oninput = function(){
		var obj1=findd(list,findGoods.value);
		downs.style.display="block";
		var li=null;
		downs.innerHTML="";
		for(var i=0;i<Math.min(obj1.length,5);i++){
			li = document.createElement("li");
			li.innerHTML=obj1[i].name;
			downs.appendChild(li);
			onli();
		}
	}
	findGoods.onblur = function(){
		setTimeout(function(){ 
			downs.style.display="none";
		},500)
	}
})

//设置购物车的数量
setCart();
//查询下拉框点击事件
function onli(){
		var oli=downs.getElementsByTagName("li");
		for(var i=0;i<oli.length;i++){
			oli[i].onclick=function(){
				findGoods.value=this.innerHTML;
				downs.style.display="none";
			}
		}
	}



function creatCookie (_name,_val,day) {
	var time = new Date();
	time.setDate(time.getDate()+day);
	document.cookie=_name+"="+_val+";path=/;expires="+time;
}

function setCookie1(_name,obj){
	var str= getCookie(_name);
	var str1 = str.split("-");
	var arr=[];
	var bstop=true;
	for(var i in str1){
		arr.push(JSON.parse(str1[i]));
	}
	for(var i in arr){
		if(arr[i].id==obj.id&&arr[i].color==obj.color&&arr[i].code==obj.code){
				bstop=false;
				arr[i].num=parseInt(arr[i].num)+parseInt(obj.num);
		}
	}

	if(bstop==false){
		var src = "";
		for(var i in arr){
			src+="-"+JSON.stringify(arr[i]);

		}
		src=src.substr(1);
		console.log(src);
		creatCookie("goods",src,7);
	}else{console.log(str+"-"+JSON.stringify(obj));
		creatCookie("goods",str+"-"+JSON.stringify(obj),7);
	}
	
}

function getCookie(_name){
	var str = document.cookie;
	var arr = str.split("; ");
	for(var i=0;i<arr.length;i++){
		var narr = arr[i].split("=");
		if(narr[0]==_name){
			return narr[1];
		}
	}
}

function removeCookie(_name,_val){
	creatCookie(_name,_val,-1);
}


//改变购物车的值
function setCart(){
	var span = document.querySelector(".cart>a>span");
	if(getCookie("goods")){
		var str= getCookie("goods");
		var str1 = str.split("-");
		span.innerHTML=str1.length;
	}else{
		span.innerHTML=0;
	}
}



//页面跳转
function pageTiao(odl){
	var cont={};
	for(var i=0;i<odl.length;i++){
		odl[i].onclick = function(){
			var da = this.getAttribute("date-url");
			location.href="deteil.html?"+da;
		}
	}
}
//小图片移动，大图片换
function imgChange(simg){
	for(var i=0;i<simg.length;i++){
	simg[i].onmouseover = function(){
		var oimg= this.getElementsByTagName("img");
			for(var j=0;j<oimg.length;j++){
				oimg[j].onmouseover = function(){
					var url = this.getAttribute("date-url");
					this.parentNode.previousElementSibling.firstElementChild.setAttribute("src",url);
				}
			}
		}
	}
}


//查询
function find(list,data){
	var obj=[];
	var bstop=true;
	var count=0;
	for(var i in list){
		if(list[i].kind==data){
			bstop=false;
			count++;
			var list1=list[i].detail;
			for(var j in list1){
				var list2 = list1[j].details;
				for(var k in list2){
					obj.push(list2[k]);
				}
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
					var list2=list1[j].details;
					for(var k in list2){
						obj.push(list2[k]);
						
					}
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

	if(count==0){
		for(var i in list){
			var list1=list[i].detail;
			for(var j in list1){
				var list2=list1[j].details;
				for(var k in list2){
					if(list2[k].name==data){
						bstop=false;
						count++;
					    obj.push(list2[k]);
				
					}
					if(bstop==false){
						break;
					}
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
	return obj;
}
//正则表达查询
function findd(list,data){
	var obj=[];
	var bstop=true;
	var count=0;
	if(data!=""){
	var data1 = new RegExp(data,'g');
	for(var i in list){
		//str.match(/[0-9]/g)
			bstop=false;
			count++;
			var list1=list[i].detail;
			for(var j in list1){
					var list2 = list1[j].details;
					for(var k in list2){
						if(list2[k].name.match(data1)){
							obj.push(list2[k]);
						}
					}
			}
	}}
	return obj;
}