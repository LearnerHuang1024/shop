var userName = document.getElementById('userName');
var password = document.getElementById('password');
var login1 = document.getElementById("login1");

login1.onclick=function(){
	var str = getCookie("user");
	var arr = JSON.parse(str);
	var bstop=0;
	var sum=0;
	for(var i in arr){
		if(i==userName.value){
			if(arr[i]==password.value){
				alert("登录成功");
			}else{
				alert("密码错误");
			}
		}else{
			bstop++;
		}
		sum++;
	}
	if(bstop==sum){
		alert("用户不存在");
	}
}