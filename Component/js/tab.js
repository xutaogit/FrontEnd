
var index = 0,timer=0;
var tabTitle = $("title").getElementsByTagName("li"),
	contNum = $("neCont").getElementsByTagName("div");//alert(contNum.length+" ,"+tabTitle.length);
/**if(tabTitle.length != contNum.length){
	return;
}**/
if(timer){
	clearTimeout(timer);
	timer = null;
}
timer = setInterval(aniTab,2000);
var index = 0;
function aniTab(){	
	index++;	
	if(index >=tabTitle.length){
		index = 0;
	}
	changeTab(index);
}
for(var i=0;i<tabTitle.length;i++){
	tabTitle[i].id = i;	//为每个选项卡设置id值用于匹配对应版块
	tabTitle[i].onmouseover = function(){
		if(timer){
			clearTimeout(timer);
			timer = null;
		}
		changeTab(this.id);
	}
	tabTitle[i].onmouseout = function(){
		index = this.id;
		timer = setInterval(aniTab,2000);
	}
}	
//改变选项卡和与之对应的版块内容
function changeTab(id){
	for(var j=0;j<tabTitle.length;j++){
		tabTitle[j].className = "";
		contNum[j].className = "noVisiable";
	}
	tabTitle[id].className = "select";
	contNum[id].className = "mod";
}
	