var areg = document.getElementById("regin");
//生成随机数
setradom();
areg.onclick = function(e){
	var e = e||event;
	var target = e.target||e.srcElement;
	if(target.tagName=="INPUT"&&target.id=="userName"){
		var reg = /^[^(0-9)]\w{5,15}/;
		fid(target,reg);
	}
	if(target.tagName=="INPUT"&&target.id=="email"){
		var reg = /^[a-zA-Z0-9]{5,17}@[a-zA-Z0-9]{2,}\.(cn|com|net)$/;
		fid(target,reg);
	}
	if(target.tagName=="INPUT"&&target.id=="password"){
		var reg = /^.{6,20}$/;
		fid(target,reg);
	}
	if(target.tagName=="INPUT"&&target.id=="repass"){
		var val = target.parentNode.previousElementSibling.firstElementChild.nextElementSibling;
		target.onblur = function(){
			if(val.value==target.value){
				this.nextElementSibling.style.display="none";
			}else{
				this.nextElementSibling.style.display="block";
			}
		}

	}
	if(target.tagName=="INPUT"&&target.id=="tel"){
		var reg = /^(13|18|15|17)\d{9}$/;
		fid(target,reg);
	}
	if(target.tagName=="EM"&&target.id=="change"){
		setradom();
	}
	if(target.tagName=="INPUT"&&target.id=="randomCode"){
		var code = target.nextElementSibling;
		target.onblur = function(){
			if(target.value!=code.innerHTML){
				code.nextElementSibling.style.display="block";
			}else{
				code.nextElementSibling.style.display="none";
			}
		}
	}
	if(target.tagName=="BUTTON"&&target.id=="log"){
		var oi = areg.getElementsByTagName("i");
		var oinput = areg.getElementsByTagName("input");
		var stop=true;
		for(var i=0;i<oinput.length;i++){
			if(oi[i].style.display=="block" || oinput[i].value==""){
				alert("请把注册信息填写完整且正确");
				stop=false;
				break;
			}
		}
		if(stop){
			var name =document.getElementById("userName");
			var pass =document.getElementById("password");
			console.log(pass.value);
			if(getCookie("user")){
				var str = getCookie("user");
				var arr = JSON.parse(str);
				var stop= true;
				for(var i in arr){
					if(i==name.value){
						stop=false;
					}
				}
				if(stop==true){
					arr[name.value]=pass.value;
				}else{
					alert("用户名重复，请重新输入");
				}
				creatCookie("user",JSON.stringify(arr),7);
			}else{
				var obj={};
				obj[name.value]=pass.value;
				creatCookie("user",JSON.stringify(obj),7);
			}
			

		}
	}

}

//正则判断是否输入数据有误
function fid(target,reg){
	target.onblur = function(){
			var val = this.value;
			if(reg.test(val)){
				this.nextElementSibling.style.display="none";
			}else{
				this.nextElementSibling.style.display="block";
			}
		}
}
//随机生成验证码
function setradom(){
	var radom = document.getElementById("change");
	var str = '';
	for(var i=0;i<4;i++){
		var num = parseInt(48+Math.random()*(122-47));

		if(num>=58&&num<=64||num>=91&&num<=96){
			i--;
		}else{
			str+=String.fromCharCode(num)
		}
	}
	radom.innerHTML=str;
}

