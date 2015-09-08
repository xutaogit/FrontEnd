/**window.onload = function(){
	var dragTitle = document.getElementById("drag");
	function drag(){
		dragTitle.onmousedown = function(event){
			var e = event || window.event;
			pmove(e);
		};
	}
	
	function pmove(event){
		var e = event || window.event;
		var mouX = e.clientX, mouY = e.clientY;
		var dragX = dragTitle.offsetX, dragY = dragTitle.offsetY;
		var viewW = document.documentElement.clientWidth||document.body.clientWidth,
			viewH = document.documentElement.clientHeight || document.body.clientHeight;
		var maxW = viewW - dragTitle.offsetWidth, maxH = viewH - offsetHeight;
		
		e.onmousemove = function(){
			dragTitle.style.left = (mouX - dragX) + "px";
			dragTitle.style.top = (mouY - dragY) + "px";
		}
		
	}

	drag();
}**/
// 构建根据类名获取元素的方法 document.getElementsByClassName()在IE10以前版本都不兼容
function getByClass(clsName,parent){	//传入元素类名及其父元素，父元素可缺省
	var oParent = parent?document.getElementById(parent):document;	//检查是否有父元素，有则根据id获取父元素，无则以document为父元素
	eles = [];							//以类名获取元素会是一个数组
	elements = oParent.getElementsByTagName("*");	//获取父元素下所有元素标签
	
	for(var i=0,l=elements.length;i<l;i++){		//遍历父元素下所有元素寻找匹配className的元素 并存储在eles数组中
		if(elements[i].className == clsName){
			eles.push(elements[i]);
		}
	}
	return eles;
}
//获取样式
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];	//针对ie浏览器
	}else{
		return getComputedStyle(obj,false)[attr];//针对火狐浏览器
	}
}


window.onload = function(){
	drag();
	//切换状态
	var state = document.getElementById("stateText"),staIcon = document.getElementById("stateIcon"),
		oStapan = document.getElementById("loginStatePanel");
		staList= getByClass("login_list","loginStatePanel");
		downIcon = document.getElementById("downIcon");
		
	state.onclick = function(event){
		var e = event || window.event;
		if (e && e.stopPropagation){
            e.stopPropagation();    
        }
        else{
            e.cancelBubble=true;
        }
		oStapan.style.display = "block"; 
		downIcon.style.backgroundPosition = "0px -21px";
	}
	
	for(var i=0;i<staList.length;i++){
		staList[i].onclick = function(event){
			var e = event || window.event;
			if (e && e.stopPropagation){
				e.stopPropagation();    
			}
			else{
				e.cancelBubble=true;
			}
			oStapan.style.display = "none";
			downIcon.style.backgroundPosition = "-17px -21px";
			var id = this.id;
			var text = getByClass("select_text",id)[0].innerHTML;
			state.innerHTML = text;
			stateIcon.className = "";
			stateIcon.className = "select_icon icon_" + id;
		}
	}
	
	document.onclick = function(){
		oStapan.style.display = "none";
		downIcon.style.backgroundPosition = "-17px -21px";
	}
}
function drag(){
	var dragTitle = document.getElementById("drag");
	var panelClose = getByClass("close","login_panel")[0];
	panelClose.onclick = function(){
		document.getElementById("login_panel").style.display = "none";
	}
	dragTitle.onmousedown = fnDown;
	
}
function aniPanel(obj,json,fn){
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
			var speed = (json[attr]-oCur)/10;
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
function fnDown(event){
	var e = event || document.event;
	var dragPanel = document.getElementById("login_panel");
	//记录下鼠标按下时鼠标离面板边缘的距离
	var mouX = e.clientX - dragPanel.offsetLeft, mousY = e.clientY - dragPanel.offsetTop;
	document.onmousemove = function(event){
		var event = event || window.event;
		fnMove(event,mouX,mousY);
	}
	
	document.onmouseup = function(){
		document.onmousemove = null;
		document.onmouseover = null;
	}
}

function fnMove(event,x,y){
	var e = event || window.event;
	var dragPanel = document.getElementById("login_panel");
	//鼠标移动后当前的鼠标坐标减去点击时的距离值用于重定位面板
	var l = e.clientX - x, t = e.clientY-y;
	var viewW = document.documentElement.clientWidth||document.body.clientWidth,
		viewH = document.documentElement.clientHeight || document.body.clientHeight;
	var maxW = viewW - dragPanel.offsetWidth, maxH = viewH - dragPanel.offsetHeight;
	
	if(l<0){
		l = 0;
	}else if(l>maxW){
		l = maxW;
	}
	
	if(t<0){
		t =0;
	}else if(t>maxH){
		t = maxH;
	}
	//把处理过后的距离值赋给面板
	dragPanel.style.left = l + "px";
	dragPanel.style.top = t + "px";
}