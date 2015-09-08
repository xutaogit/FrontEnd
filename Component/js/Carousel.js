var wrap=document.getElementById('wrap'),//获取整个图片轮播外框区域，用于触发悬停事件
	pic=document.getElementById('pic'),//获取轮播图片ul，用于实现轮播
	list=document.getElementById('list').getElementsByTagName('li'),//获取数字导航
	index=0,delay = 1000,//设置初始轮播位子和图片轮播停留时间
	timer=null;

 
	if(timer){
		clearTimeout(timer);
		timer = null;
	}
	// 定义并调用自动播放函数
	timer = setInterval(startMove,delay)
	
	//定义index跟踪记录轮播到第几张图片
	function startMove(){
		index++;
		if(index>=list.length){
			index = 0;
		}
		changePic(index);
	}
  // 定义图片切换函数
	function changePic(id){
		//图片的切换是设置整个图片区域top属性，每次移动一个图片单位高度（这里的170是对应list的offsetHeight的值）
		pic.style.top ="-" +id*170+"px";
		//先清除每个数字导航样式，然后给对应显示图片的数字导航添加样式
		for(var i=0;i<list.length;i++){
			list[i].className = "";
		}
		list[id].className = "on";
	}
 // 鼠标划过整个容器时停止自动播放
	wrap.onmouseover = function(){
		clearInterval(timer);
	}
 // 鼠标离开整个容器时继续播放至下一张
	wrap.onmouseout = function(){
		timer = setInterval(startMove,delay);
	}
 // 遍历所有数字导航实现划过切换至对应的图片
 for(var i =0;i<list.length;i++){
	 //给数字导航添加id属性用来保存图片索引
	list[i].id = i;
	//鼠标停留在每个数字导航项时，先清除定时器，并根据数字项展示对应图片项
	list[i].onmouseover = function(){
		if(timer){
			clearInterval(timer);
			timer = null;
		}
		changePic(this.id);
	}
	//当鼠标从数字导航移开时，因为前面设置了外图框的鼠标事件，所以这里要阻止事件冒泡
	list[i].onmouseout = function(event){
		var e = event || window.event;
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
		//鼠标离开时记录下当前数字导航的位置，传递给index用于startMove函数执行
		index = this.id;
		timer = setInterval(startMove,delay);
	}
 }

