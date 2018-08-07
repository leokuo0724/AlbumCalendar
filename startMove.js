function startMove(obj,json){
	clearInterval(obj.timer);

	// 速度改變值
	var speed = 0;
	// 當前值
	var currentValue = 0;

	obj.timer = setInterval(function(){

		var isStop = true;

		// 修改屬性值
		for(key in json){
			// 1. 當前值
			if(key == 'opacity'){
				currentValue = parseInt(getStyle(obj,key)*100);
			} else {
				currentValue = parseInt(getStyle(obj,key));
			}

			// 2. 速度
			speed = (json[key] - currentValue)/7;
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);

			// 3. 運動處理
			currentValue += speed;
			if( key == 'opacity'){
					obj.style.opacity = currentValue/100;
					obj.style.filter = 'alpha(opacity:'+currentValue+')';
			} else {
					obj.style[key] = currentValue + 'px';
			}

			// 4. 是否停止時鐘
			if(json[key] != currentValue){
				isStop = false;
			}
		}

		// 判斷是否要停止時鐘
		if(isStop){
			clearInterval(obj.timer);
		}
	},30);
}

function getStyle(obj,att){
	return window.getComputedStyle ? getComputedStyle(obj)[att] : obj.currentStyle[att];
}
