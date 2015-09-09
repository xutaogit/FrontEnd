//获取样式
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];	//针对ie浏览器
	}else{
		return getComputedStyle(obj,false)[attr];//针对火狐浏览器
	}
}
//根据类名获取元素
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
//简化document.getElementById方法
function $(id){
	return typeof id === "string"?document.getElementById(id):id;
}