
	//document.write "<script src='simpleGet.js'></script>";
	
function aniPanel(obj,json,fn){
	//设置flag检验动作是否都已执行完成
	var flag = true;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		for(var attr in json){
			//1.取当前值
			var oCur = 0;
			if(attr == "opacity"){
				oCur = Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				oCur = parseInt(getStyle(obj,attr));
			}
			//算速度
			//alert(json[attr]+","+oCur);
			var speed = (json[attr]-oCur)/5;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			
			//检测停止
			if(oCur!=json[attr]){
				flag = false;
			}
			if(attr=="opacity"){
				obj.style["filter"] = "alpha(opacity:"+(oCur+speed)+")";
				obj.style[attr] = (oCur+speed)/100;
			}else{
				obj.style[attr] = oCur+speed+"px";	
			}
		}
		if(flag){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
		
	},30)
	
}
