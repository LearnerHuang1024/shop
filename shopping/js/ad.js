var isNow=0;//当前页码
var sum = 0;//数据长度
var num = 0;//页码
var adcon = document.getElementById("adcon");
var con_foot = document.querySelector(".con_foot");
var pageFirst =document.getElementById("pageFirst");
var pageLast = document.getElementById("pageLast");
ajax("get","notice.json","",function(data){
	
	var str = location.href;
	var str1 = str.split("?");
	var obj=null;
	var aar ="";
	
	if(str1[1]!=null){
		con_foot.style.display="none";
		for(var i in data){
			if(data[i].id==str1[1]&&data[i].src){
				aar=`<h3>公告栏</h3>
			<div class="content">
				<h4>${data[i].title}</h4>
				<p><span>${data[i].time}</span>（点击量：<i>${data[i].click}</i>）</p>
				<div class="imgc" >
					<a ><img src="${data[i].src}" ></a>
				</div>
			</div>`
			}
			if(data[i].id==str1[1]&&data[i].con){
				aar=`<h3>公告栏</h3>
			<div class="content">
				<h4>${data[i].title}</h4>
				<p><span>${data[i].time}</span>（点击量：<i>${data[i].click}</i>）</p>
				<div class="conc">
					<p>尊敬的非尚会员：</p>
					<p>${data[i].con}</p>
				</div>
			</div>`
			}
		}
	adcon.innerHTML=aar;
	}else{
		findpage(data);
		//分页点击按钮
	pageLast.onclick = function(){
		var nn=num;
		if(isNow==nn-1){
			isNow==isNow;
		}else{
			isNow++;
			paging(data,isNow);
		}
		
	}
	pageFirst.onclick = function(){
		if(isNow==0){
			isNow==0;
		}else{
			isNow--;
			paging(data,isNow);
		}
	}
	}
})

//分页显示
function findpage(data){
		sum = data.length;
		num = Math.ceil(sum/10);
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
			console.log(con_foot);
			con_foot.insertBefore(oa,pageLast);
		}
		paging(data,0);
		pagenum();
	}


//分页
function paging(data,n){
	if(data.length!=0){
		var src=`<table>`;//<h3>公告栏</h3><table>
		src+=`<tr>
					<th width="10%">编号</th>
					<th width="50%" style="text-align:left;">标题</th>
					<th width="15%">时间</th>
					<th width="15s%">点击量</th>
				</tr>`;
		for(var i=10*n;i<Math.min(sum,10+10*n);i++){

			src+=`<tr>
					<td width="10%">${data[i].id}</td>
					<td width="50%" style="text-align:left;"><a href="ad.html?${data[i].id}">${data[i].title}</a></td>
					<td width="15%">${data[i].time}</td>
					<td width="15%">${data[i].click}</td>
				</tr>`;
		}
		src+=`</table>`;
		adcon.innerHTML=src;
	}
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