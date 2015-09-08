/**
*该函数用于显示当前日期，同时可以设置截止时间用于倒计时
*包括时间年月以及星期和小时分钟、秒数
*对于想要在个位数时以“0x”格式显示的可以用checkTime（）函数转换
*author Sam(xutao)  2015.09.07
**/
function showTime(){
	//获取当前时间
	var date = new Date();
	//设置截止时间
	var endDate = new Date("2015/10/1,00:00:00");
	//获取相差的时间（天数，小时，分钟，秒）
	var minuTime = parseInt((endDate.getTime() - date.getTime())/1000),
		minuDay = parseInt(minuTime/(60*60*24)),
		minuHour = parseInt(minuTime/(60*60)%24),
		minMinu = parseInt(minuTime/(60)%60),
		minuSec = parseInt(minuTime%60);	
	if(minuDay > 0){
		minuDay = Math.floor(minuDay);
	}
	
	//因为getDay()返回的是星期几某一天的数字，0对应星期天，所以要想显示正确需要设置对应数组
	var week = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	//在使用getMonth（）返回数据时月份默认减一，所以在显示时要加一
	var year = date.getFullYear(),
		month = date.getMonth()+1,
		day = date.getDate(),
		d = date.getDay(),
		h = date.getHours(),
		m = date.getMinutes(),
		s = date.getSeconds();
	var cm=checkTime(m),cs = checkTime(s);
	
	//根据页面内容获取相关元素进行展示
	var timeTxt = document.getElementById("time");
	var end = "";
	if(minuTime >0){
		end = "离国庆节还有"+minuDay+"天"+minuHour+"时"+minMinu+"分"+minuSec+"秒";
	}else{
		end = "15年国庆已经过了,等明年吧";
	}
	
	timeTxt.innerHTML = year+" 年"+month+"月 "+day+"日 "+week[d]+" "+h+":"+cm+":"+cs+"<br/>"+end;
	setTimeout(showTime,500);
}
function checkTime(ms){
	if(ms<10){
		ms = "0"+ms;
	}
	return ms;
}