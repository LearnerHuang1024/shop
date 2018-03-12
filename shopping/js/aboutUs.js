var aboutUs = document.getElementById("aboutUs");
var odiv = aboutUs.getElementsByTagName("div");
var aboutTitle = document.getElementById("aboutTitle");
var oli = aboutTitle.getElementsByTagName("li");
//设置网页相关部分的移入移除切换内容部分
for(var i =0;i<oli.length;i++){
	oli[i].index=i;
	oli[i].onmouseover = function(){
		for(var j=0;j<oli.length;j++){
			oli[j].className="";
			odiv[j].style.display="none";
		}
		this.className="change";
		odiv[this.index].style.display="block";
	}
}
