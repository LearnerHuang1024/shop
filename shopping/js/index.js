
var cart = document.querySelector(".cart");
var women = document.getElementById("women");
var men = document.getElementById("men");
var shoes = document.getElementById("shoes");
var bag = document.getElementById("bag");
var ornaments = document.getElementById("ornaments");
var sum = 0;//数据长度
ajax("get","goods.json","",function(list){
	conload(men,list,"男装");
	conload(women,list,"女装");
	conload(shoes,list,"鞋子");
	conload(bag,list,"包包");
	conload(ornaments,list,"饰品");
})


//动态获取公告栏
ajax("get","notice.json","",function(list){
	var noticeAll = document.getElementById("noticeAll");
	var ad=[];
	var act=[];
	var str="";
	for(var i in list){
		if(list[i].kind=="活动"){
			act.push(list[i]);
		}else{
			ad.push(list[i]);
		}
	}
	for(var i=0;i<Math.min(9,ad.length);i++){
		str+="<li><span>"+ad[i].time+"</span><a href=ad.html?"+ad[i].id+">"+ad[i].title+"</a></li>";
	}
	noticeAll.innerHTML=str;
	str="";

	var news=document.getElementById("news");
	var h3 = news.getElementsByTagName("h3");
	news.onclick = function(e){
		var e = e||event;
		var target = e.target||e.scrElement;
		h3[0].className="";
		h3[1].className="";
		if(target.className!="notice"&&target.tagName=="H3"){
			console.log(132);
			target.className="notice";
			if(target.innerHTML=="非尚广告"){
				for(var i=0;i<Math.min(9,ad.length);i++){
					str+="<li><span>"+ad[i].time+"</span><a href=ad.html?"+ad[i].id+">"+ad[i].title+"</a></li>";
				}
				noticeAll.innerHTML=str;str="";
			}
			if(target.innerHTML=="优惠专区"){
				for(var i=0;i<Math.min(9,act.length);i++){
					str+="<li><span>"+act[i].time+"</span><a href=ad.html?"+act[i].id+">"+act[i].title+"</a></li>";
				}
				noticeAll.innerHTML=str;str="";
			}
			
		}
	}


})


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

//给首页楼层添加动态数据
function conload(obj,list,val){
		var sumList=find(list,val);
		var src="";
		for(var i=0;i<Math.min(sumList.length,4);i++){
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
		obj.innerHTML=src;
		var simg = document.querySelectorAll(".simg");
		imgChange(simg);
		var odl = obj.getElementsByTagName("dl");
		pageTiao(odl);
	}



var oBanner = document.getElementById('banner');
var oUl = document.querySelector('#banner>ul');
var aLi =  oUl.getElementsByTagName('li');
var aA = document.querySelectorAll('#btn>a');
var iNow = 0;
var next = 0;
var timer = null;


for(var i=0;i<aA.length;i++){
	aA[i].index = i;
	aA[i].onmouseover = function(){
		for(var j=0;j<aA.length;j++){
			aA[j].className = '';
			move(aLi[j],{"opacity":0});
			aLi[j].style.zIndex="0";
		}
		this.className = 'active';
		move(aLi[this.index],{"opacity":100});
		aLi[this.index].style.zIndex="1";
		next=this.index;
		
	}
}

//移入关闭定时器
oBanner.onmouseover = function(){
	clearInterval(timer)
}
//移出调用轮播函数
oBanner.onmouseout = function(){
	autoPlay()
}

autoPlay()
//自动轮播
function autoPlay(){
	timer = setInterval(function(){
		//如果到了最后一张 就让next为0 然后在开始++
		if(next==aLi.length-1){
			next=0
		}else{
			next++;
		}
		toImg()
	},2000)
}

//轮播原理
function toImg(){
	//第一张图片隐藏 下一张图片显示
	move(aLi[iNow],{"opacity":0});
	move(aLi[next],{"opacity":100});
	for(var i=0;i<aA.length;i++){
		aA[i].className = '';
		aLi[i].style.zIndex="0";
	}aLi[next].style.zIndex="1";
	aA[next].className = 'active';
	iNow=next;
}
//获取非行间样式
function getStyle(obj,arr){
	if(obj.currentStyle){
		return obj.currentStyle[arr];
	}else{
		return getComputedStyle(obj,false)[arr];
	}
}

//完美运动
function move(obj,json,fn){	
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		var bstop = true;
		for(var arr in json){
			
			var sty = 0;
			if(arr=="opacity"){
				sty = parseInt(parseFloat(getStyle(obj,arr))*100);
			}else{
				sty = parseInt(getStyle(obj,arr));
			}
			var speed = (json[arr]-sty)/8;
			
			speed = speed>0?Math.ceil(speed):Math.floor(speed);

			if(json[arr]!=sty){
				bstop=false;
			}
			if(arr=="opacity"){
				obj.style.opacity=(sty+speed)/100;
				obj.style.filter="alpha(opacity="+(sty+speed)+")";
			}else{
				obj.style[arr]=(sty+speed)+"px";
			}
		}
		if(bstop){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
	},30)
	
}