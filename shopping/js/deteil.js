var ogoods=document.querySelector(".goods");
ajax("get","goods.json","",function(list){
var oid = location.href.split("?");
//通过id查询
findId(list,oid);

var deteil=document.getElementById("ddeteil");
var ocolor =document.querySelectorAll("#color>a")
var ocode =document.querySelectorAll("#code>a")
var omax = document.getElementById("max");
var opic = document.getElementById("minPic");
var omin = document.getElementById("min");
var oimg = opic.getElementsByTagName("img");
var oi = omin.getElementsByTagName("i");
var omag =document.getElementById("mag");
var omagImg =document.getElementById("magImg");
var imgrig = document.getElementById("imgrig");
var cart = document.querySelector(".cart");
var sub = document.getElementById("sub");
var add = document.getElementById("add");
var num = document.getElementById("num");



var isNow = 0;
opic.style.width=oimg.length*(oimg[0].offsetWidth+30)+"px";
for(var i=0;i<oimg.length;i++){
	oimg[i].index=i;
	oimg[i].onmouseover = function(){
		omax.firstElementChild.src=this.getAttribute("data-url");
		omagImg.src=this.getAttribute("data-url");
		for(var i = 0;i<oimg.length;i++){
		oimg[i].className="";
	}
		this.className="active";
		isNow=this.index;
	}
}

//放大镜
omax.onmouseover = function(){
	omax.onmousemove= function(e){
	var e = event || e;
	imgrig.style.display="block";
	omag.style.display="block";
	var scor=document.body.scrollTop||document.documentElement.scrollTop;
	var le =e.clientX-omax.offsetLeft-omag.offsetWidth/2;
	var top = e.clientY-omax.offsetTop-omag.offsetHeight/2+scor;
	if(le<=0){
		le=0;
	}
	if(le>=omax.offsetWidth-omag.offsetWidth){
		le=omax.offsetWidth-omag.offsetWidth;
	}
	if(top<=0){
		top=0;
	}
	if(top>=omax.offsetHeight-omag.offsetHeight){
		top=omax.offsetHeight-omag.offsetHeight;
	}
	omag.style.left=le+"px";
	omag.style.top=top+"px";

	omagImg.style.left=(-le*2)+"px";
	omagImg.style.top=(-top*2)+"px";
}
}
omax.onmouseout= function(){
		omax.onmousemove=null;
		imgrig.style.display="none";
		omag.style.display="none";
	}

//小图片左右点击事件
oi[1].onclick = function(){
	for(var i = 0;i<oimg.length;i++){
		oimg[isNow].className="";
	}
	if(isNow==oimg.length-1){
		isNow=isNow;
	}else{
		isNow++;
	}
	if(isNow==4){
		opic.style.left=-(oimg.length-4)*(oimg[0].offsetWidth+20)+"px";
	}
	oimg[isNow].className="active";
	omax.firstElementChild.src=oimg[isNow].getAttribute("data-url");
}
oi[0].onclick = function(){
	for(var i = 0;i<oimg.length;i++){
		oimg[isNow].className="";
	}
	if(isNow==0){
		isNow=isNow;
	}else{
		isNow--;
	}
	oimg[isNow].className="active";
	omax.firstElementChild.src=oimg[isNow].getAttribute("data-url");
}


//选择颜色、尺码
for(var i=0;i<ocolor.length;i++){
	ocolor[i].onclick = function(){
		for(var j=0;j<ocolor.length;j++){
			ocolor[j].className="";
		}
		this.className="selec";
	}
}
for(var i=0;i<ocode.length;i++){
	ocode[i].onclick = function(){
		for(var j=0;j<ocode.length;j++){
			ocode[j].className="";
		}
		this.className="selec";
	}
}

//数量加减
sub.onclick = function(){
	var sum = num.innerHTML;
	if(sum<=1){
		sum=sum;
	}else{
		sum--;
	}
	num.innerHTML=sum;
}
add.onclick = function(){
	var sum = num.innerHTML;
	if(sum>=50){
		sum=sum;
	}else{
		sum++;
	}
	num.innerHTML=sum;
}

//加入购物车
var addCart= document.getElementById("addCart");
addCart.onclick = function(){
	var cart={};
	var atr={};
	var sum=0;
	cart.id=oid[1];
	for(var i=0;i<ocolor.length;i++){
		if(ocolor[i].className=="selec"){
			sum++
			cart.color=ocolor[i].innerHTML;
		}
	}
	for(var i=0;i<ocode.length;i++){
		if(ocode[i].className=="selec"){
			sum++
			cart.code=ocode[i].innerHTML;
		}
	}
	cart.num=num.innerHTML;
	if(sum==2){
		if(getCookie("goods")){
			setCookie1("goods",cart);
		}else{
			creatCookie("goods",JSON.stringify(cart),7);
		}
		alert("加入购物车成功");
		setCart();
	}else{
		alert("请选择颜色或尺码!");
	}
}
	
})

//通过id查找
function findId(list,oid){
	var obj=null;
	var bstop=true;
	for(var i in list){
		var list1=list[i].detail;
		for(var j in list1){
			var list2=list1[j].details;
			for(var k in list2){
				if(list2[k].id==oid[1]){
					obj=list2[k];
					var str=`<div class="dis" id="dis">
						<div class="max" id="max" width="400" height="400">
							<img src="${list2[k].pic[0]}">
							<div id="imgrig"><img src="${list2[k].pic[0]}" id="magImg" width="800" height="800"></div>
							<div id="mag"></div>
						</div>
						<div class="min" id="min">
						    <i class="le"></i>
						    <i class="rig"></i>
						    <div class="pic" id="minPic">`;
					for(var m=0;m<list2[k].pic.length;m++){
						str+=`<img src="${list2[k].pic[m]}" data-url="${list2[k].pic[m]}">`;
					}
					str+=`</div>
						</div>
						</div>
						<div class="deteil" id="deteil">
							<h3>${list2[k].name}</h3>
							<h4>价格：<p>￥${list2[k].price}</p></h4>
							<p>商品编号：<span>${list2[k].id}</span></p>
							<p>店铺名称：<span>${list2[k].shop}</span></p>
							<p>上架时间：<span>${list2[k].time}</span></p>
							<p class="top de" id="color"><em>颜色：</em>`;
					for(var m=0;m<list2[k].color.length;m++){
						str+=`<a>${list2[k].color[m]}</a>`;
					}
					str+=`</p>
							<p class="de" id="code"><em>尺码：</em>`;
					for(var m=0;m<list2[k].code.length;m++){
						str+=`<a>${list2[k].code[m]}</a>`;
					}
					str+=`</p>
							<p class="de"><em>数量：</em><i id="sub">-</i><i id="num">1</i><i id="add">+</i></p>
							<ul>
								<li>立即购买</li>
								<li id="addCart">加入购物车</li>
								<p>运费（视地区而定）+代发费（一般为2元/件）下单前请和批发商沟通是否有货哦</p>
							</ul>
						</div>
						<div class="detailcon">
							<h3>商品详细信息 / Details</h3>`;
							for(var m in list2[k].src){
								str+=`<img src="${list2[k].src[m]}">`;
							}
							str+=`</div>`;

					ogoods.innerHTML=str;
					bstop=false;
						break;
			}
			}
			if(bstop==false){
				break;
			}
		}
		if(bstop==false){
				break;
			}
	}
}







