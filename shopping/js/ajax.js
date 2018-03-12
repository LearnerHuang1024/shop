function ajax(method,url,josn,succes,error){
	var xml = new XMLHttpRequest()||new ActiveXObject("Microsoft","XMLHTTP");
	if(method=="get"){
		var src="";
		for(var key in josn){
			src+="&"+key+"="+josn[key];
		}
		src = src.substr(1);
		url = url+"?"+src;
		xml.open("get",url,true);
		xml.send();
	}else{
		var src="";
		for(var key in josn){
			src+="&"+key+"="+josn[key];
		}
		src = src.substr(1);
		xml.open("post",url,true);
		xml.setRequestHeader("content-type","application/x-www-form-urlencoded");
		xml.send(src);
	}
	xml.onreadystatechange = function(){
		if(xml.readyState==4&&xml.status==200){
			var r = xml.responseText;
			if(typeof r != "object"){
				r = JSON.parse(r);
			}
			succes&&succes(r);
		}else{
			error&&error(xml.status);
		}
	}

}
