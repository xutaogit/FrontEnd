var scPanel = document.getElementById("scPanel");
	var pan1 = document.getElementById("pan1");
	var pan2 = document.getElementById("pan2");
	var listHight = 34;
	pan2.innerHTML = pan1.innerHTML;
	scTime = 0;
	var speed = 50,delay = 2000;
	function  startMove(){
		scPanel.scrollTop++;
		scTime = setInterval(scrollTop,speed);
	}
	
	function scrollTop(){
		var offTop = pan1.offsetHeight;
		if(scPanel.scrollTop%listHight ==0){
			clearTimeout(scTime);
			setTimeout(startMove,delay);
		}else{
			if(scPanel.scrollTop>=offTop){
				scPanel.scrollTop = 0;
			}else{
				scPanel.scrollTop++;
			}
		}
	}
	setTimeout(startMove,delay);