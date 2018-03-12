var cart = document.querySelector(".cart");
var acon = document.getElementById("con");
ajax("get","goods.json","",function(list){
	if(getCookie("goods")){
		var str= getCookie("goods");
		var str1 = str.split("-");
		for(var i in str1){
			var arr = JSON.parse(str1[i]);
				var obj=findId(arr.id,list);
				var str = `<div class="list" date-url="${arr.id}-${arr.color}-${arr.code}">
					<input type="checkbox" class="checkd">
					<a href="#"><img src="${obj.pic[0]}"></a>
					<div>
						<h3>${obj.name}</h3>
						<p>支持7天无理由退货</p>
					</div>
					<p>
						<span>颜色：${arr.color}</span>
						<span>尺码：${arr.code}</span>
					</p>
					<p>￥${obj.price}</p>
					<p>
						<a id="sub">-</a>
						<input type="text" value="${arr.num}">
						<a id="add">+</a>
						<i>有货</i>
					</p>
					<p>
						<span class="oneprice">￥${arr.num*obj.price}</span>
					</p>
					<p>
						<a class="delete">删除</a>
						<a>加入我的收藏</a>
					</p>
				</div>`;
				acon.innerHTML+=str;
		}
	}else{
		acon.innerHTML="<img src='img/cart0.png' class='nogoods'/><p class='nogoods'>购物车没有东西，请去购物！</p>"
	}
	setNum();



//货物数量加减
	acon.onclick = function(e){
	var e= e||event;
	var target = e.target || e.srcElement;
	if(target.tagName=="A" && target.id=="add"){
		console.log(1);
		target.previousElementSibling.value++;
		var val = target.previousElementSibling.value;
		var price = target.parentNode.previousElementSibling.innerHTML;
		price = price.slice(1);
		target.parentNode.nextElementSibling.firstElementChild.innerHTML="￥"+val*Number(price);
		setNum();
	}
	if(target.tagName=="A" && target.id=="sub"){
		if(target.nextElementSibling.value>1){
			target.nextElementSibling.value--;
		}
		var val = target.nextElementSibling.value;
		var price = target.parentNode.previousElementSibling.innerHTML;
		price = price.slice(1);
		target.parentNode.nextElementSibling.firstElementChild.innerHTML="￥"+val*Number(price);
		setNum();
	}
}

//复选框选择
var all = document.getElementById("all");
var check = document.querySelectorAll(".checkd");
var del =document.querySelectorAll(".delete");
for(var i=0;i<check.length;i++){
	check[i].onclick = function(){
		if(this.checked==true){
			this.parentNode.style.backgroundColor="#FFF4E8";
			var stop=true;
			for(var j=0;j<check.length;j++){
				if(check[j].checked==false){
					stop=false;
					break;
				}
			}
			if(stop==true){
				all.checked="checked";
			}
		}else{
			all.checked="";
			this.parentNode.style.backgroundColor="white";
		}
		
	}
}
//选择所有复选框
all.onclick = function(){
	if(this.checked==true){
		for(var i=0;i<check.length;i++){
			check[i].checked="checked";
			check[i].parentNode.style.backgroundColor="#FFF4E8";
		}
	}else{
		for(var i=0;i<check.length;i++){
			check[i].checked="";
			check[i].parentNode.style.backgroundColor="white";
		}
	}
}
//删除购物车
for(var i =0;i<del.length;i++){
		del[i].onclick = function(){
			var opar = this.parentNode.parentNode;
			var strr = opar.getAttribute("date-url");
			var strr1=strr.split("-");
			//removeCookie(str,getCookie(str));
			var str= getCookie("goods");
			var str1 = str.split("-");
			var newstr="";
			for(var i in str1){
				var arr = JSON.parse(str1[i]);
				if(arr.id==strr1[0]){
					if(arr.color==strr1[1]&&arr.code==strr1[2]){
						
					}else{
						newstr+="-"+str1[i];
					}
				}else{
					newstr+="-"+str1[i];
				}
			}
			newstr=newstr.substr(1);
			if(newstr==""){
				creatCookie("goods",newstr,-1);
				acon.innerHTML="<img src='img/cart0.png' class='nogoods'/><p class='nogoods'>购物车没有东西，请去购物！</p>";
			}else{
				creatCookie("goods",newstr,7);
			}
			
			opar.remove();
			setCart();
			setNum();
		}
}
})


//设置购物车总件数和价钱
function setNum(){
	var num = document.getElementById("sumnum");
	var sumprice = document.getElementById("sumprice");
	var price = document.querySelectorAll(".oneprice");
	num.innerHTML=price.length;
	var sum=0;
	for(var i =0;i<price.length;i++){
		var pp=price[i].innerHTML.substring(1);
		sum+=parseInt(pp);
	}
	sumprice.innerHTML="￥"+sum;
}

//通过id找值
function findId(id,list){
	for(var i in list){
		var list1=list[i].detail;
		for(var j in list1){
			var list2=list1[j].details;
			for(var k in list2){
				if(list2[k].id==id){
					return list2[k];
				}
			}
		}
	}
}

