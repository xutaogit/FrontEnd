function downMenu(){
	var box=document.getElementById('divselect'),
		title=box.getElementsByTagName('cite')[0],	//用于点击的选框
		menu=box.getElementsByTagName('ul')[0],		//下拉的选框内容，默认隐藏
		as=box.getElementsByTagName('a'),
		index=-1;	//用于记录当前选项，-1表示未选中任何项
	// 点击头选框时触发showMenu()函数
	title.onclick=showMenu;
	
	function showMenu(event){
	  // 设置阻止冒泡是为了后面点击空白处隐藏下拉选框
	  var e = event || window.event
	  if(e.stopPropagation()){
		e.stopPropagation();
	  }else{
		e.cancelBubble = true;
	  }
	  menu.style.display = "block";
	} 
	
	//changeColor（）函数用于改变下拉选框各条目的样式
	function changeColor(){
		for(var i =0;i<as.length;i++){
			as[i].style.backgroundColor = "white";
			this.style.backgroundColor = "#999";
		}
	}
	//获取每个条目的内容后赋值给头选框
	function changeText(){
		var txt = this.innerHTML;
		title.innerHTML = txt;
	}
	// 滑过滑过、离开、点击每个选项时
	for(var i=0;i<as.length;i++){
		as[i].onmouseover = changeColor;
		as[i].onclick = changeText;
	}
	
	//添加键盘事件，要先撤销键盘对应键的默认事件
	document.onkeyup = function(event){
		var e = event || window.event;
		//按键盘向上键,index值减小，如果目前是指向第一个选项，将index设为选项长度值-1指向最后一项
		if(e.keyCode ==38){
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
			index --;
			if(index<0){index = as.length-1;}
			for(var i=0;i<as.length;i++){
				as[i].style.backgroundColor = "white";
				as[index].style.backgroundColor = "#999";
			}
		}else if(e.keyCode ==40){
			//按键盘向下键，index值增加，如果当前指向最后一个选项，将index设为0指向第一项
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
			index ++;
			if(index>as.length-1){index = 0;}
			for(var i=0;i<as.length;i++){
				as[i].style.backgroundColor = "white";
				as[index].style.backgroundColor = "#999";
			}
		}
		//如果用户点击回车并且目前选项中有值，则取出该选项文本内容赋给头选框并隐藏下拉框，并且把index设为-1
		if(e.keyCode == 13 && as[index]){
			var txt = as[index].innerHTML;
			title.innerHTML = txt;
			menu.style.display = "none";
			index = -1;
		}
	}
	
	// 点击页面空白处时，也可隐藏下拉框
	document.onclick = function(){
		menu.style.display = "none";
	}
}	

	
	