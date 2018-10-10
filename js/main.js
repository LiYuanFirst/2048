
$(function(){
	
    gameInit();
	
	//游戏初始化
    function gameInit() {
       
        //随机生成两个新元素
        newRndItem();
        newRndItem();
        //填充数字颜色
        refreshColor()
    }
    //获取当前单元格位置
    function getSideItem(currentItem, direction) {
        //当前元素的位置
        var currentItemX = currentItem.attr('x') - 0;
        var currentItemY = currentItem.attr('y') - 0;

        //根据方向获取旁边元素的位置
        switch (direction) {
            case 'left':
                var sideItemX = currentItemX;
                var sideItemY = currentItemY - 1;
                break;
            case 'right':
                var sideItemX = currentItemX;
                var sideItemY = currentItemY + 1;
                break;
            case 'up':
                var sideItemX = currentItemX - 1;
                var sideItemY = currentItemY;
                break;
            case 'down':
                var sideItemX = currentItemX + 1;
                var sideItemY = currentItemY;
                break;
        }
        //旁边元素
        var sideItem = $('.gameBody .row .x' + sideItemX + 'y' + sideItemY);
        return sideItem;
    }
    //单个数字移动
    function itemMove(currentItem, direction) {

        var sideItem = getSideItem(currentItem, direction);

        if (sideItem.length == 0) {//当前元素在最边上
            //不动

        } else if (sideItem.html() == '') { //当前元素不在最后一个且左（右、上、下）侧元素是空元素
            sideItem.html(currentItem.html()).removeClass('emptyItem').addClass('nonEmptyItem');
            currentItem.html('').removeClass('nonEmptyItem').addClass('emptyItem');
            itemMove(sideItem, direction);
            isNewRndItem = true;

        } else if (sideItem.html() != currentItem.html()) {//左（右、上、下）侧元素和当前元素内容不同
            //不动

        } else {//左（右、上、下）侧元素和当前元素内容相同
            //向右合并
            sideItem.html((sideItem.html() - 0) * 2);
            currentItem.html('').removeClass('nonEmptyItem').addClass('emptyItem');
            refreshColor();
            return;
        }
    }
    
    //朝某一方向移动
	function move(direction) {
        //获取所有非空元素
        var nonEmptyItems = $('.gameBody .row .nonEmptyItem');
        //如果按下的方向是左或上，则正向遍历非空元素
        /*如果UP或者Left则先移动左、上方的数字，如果是down或则right则先移动右、下方的的数字*/
        if (direction == 'left' || direction == 'up') {
            for (var i = 0; i < nonEmptyItems.length; i++) {
                var currentItem = nonEmptyItems.eq(i);
                itemMove(currentItem, direction);
            }
        } else if (direction == 'right' || direction == 'down') {//如果按下的方向是右或下，则反向遍历非空元素
            for (var i = nonEmptyItems.length - 1; i >= 0; i--) {
                var currentItem = nonEmptyItems.eq(i);
                itemMove(currentItem, direction);
            }
        }

        //是否产生新元素
        if (isNewRndItem) {
            newRndItem();
            refreshColor();
        }
    }
	//初始化随机产生两个数字，放入随机的格子中
	function newRndItem(){
        var newRndArr = [2, 2, 4];
        
		//随机生成新数字
        var newRndNum = newRndArr[getRandom(0, 2)];
        //随机生成新数字的位置
        var emptyItems = $('.gameBody .row .emptyItem');
        var newRndSite = getRandom(0, emptyItems.length - 1);
        emptyItems.eq(newRndSite).html(newRndNum).removeClass('emptyItem').addClass('nonEmptyItem');
	}
	
	//产生随机整数，包括min、max（min<=X<max）
    function getRandom(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }
    //刷新颜色
    function refreshColor() {
        var items = $('.gameBody .item');
        for (var i = 0; i < items.length; i++) {
            // console.log(items.eq(i).parent().index());
            switch (items.eq(i).html()) {
                case '':
                    items.eq(i).css('background', '');
                    break;
                case '2':
                    items.eq(i).css('background', 'rgb(250, 225, 188)');
                    break;
                case '4':
                    items.eq(i).css('background', 'rgb(202, 240, 240)');
                    break;
                case '8':
                    items.eq(i).css('background', 'rgb(117, 231, 193)');
                    break;
                case '16':
                    items.eq(i).css('background', 'rgb(240, 132, 132)');
                    break;
                case '32':
                    items.eq(i).css('background', 'rgb(181, 240, 181)');
                    break;
                case '64':
                    items.eq(i).css('background', 'rgb(182, 210, 246)');
                    break;
                case '128':
                    items.eq(i).css('background', 'rgb(255, 207, 126)');
                    break;
                case '256':
                    items.eq(i).css('background', 'rgb(250, 216, 216)');
                    break;
                case '512':
                    items.eq(i).css('background', 'rgb(124, 183, 231)');
                    break;
                case '1024':
                    items.eq(i).css('background', 'rgb(225, 219, 215)');
                    break;
                case '2048':
                    items.eq(i).css('background', 'rgb(221, 160, 221)');
                    break;
                case '4096':
                    items.eq(i).css('background', 'rgb(250, 139, 176)');
                    break;
            }
        }
    }
    function isGameOver() {
        //获取所有元素
        var items = $('.gameBody .row .item');
        //获取所有非空元素
        var nonEmptyItems = $('.gameBody .row .nonEmptyItem');
        if (items.length == nonEmptyItems.length) {//所有元素的个数 == 所有非空元素的个数  即没有空元素
            //遍历所有非空元素
            for (var i = 0; i < nonEmptyItems.length; i++) {
                var currentItem = nonEmptyItems.eq(i);
                if (getSideItem(currentItem, 'up').length != 0 && currentItem.html() == getSideItem(currentItem, 'up').html()) {
                    //上边元素存在 且 当前元素中的内容等于上边元素中的内容
                    return;
                } else if (getSideItem(currentItem, 'down').length != 0 && currentItem.html() == getSideItem(currentItem, 'down').html()) {
                    //下边元素存在 且 当前元素中的内容等于下边元素中的内容
                    return;
                } else if (getSideItem(currentItem, 'left').length != 0 && currentItem.html() == getSideItem(currentItem, 'left').html()) {
                    //左边元素存在 且 当前元素中的内容等于左边元素中的内容
                    return;
                } else if (getSideItem(currentItem, 'right').length != 0 && currentItem.html() == getSideItem(currentItem, 'right').html()) {
                    //右边元素存在 且 当前元素中的内容等于右边元素中的内容
                    return;
                }
            }
        } else {
            return;
        }
        $('#gameOverModal').modal('show');
    }
    // 手机屏幕划动触发
    (function () {
        //返回角度  
		  function GetSlideAngle(dx, dy) {  
		      return Math.atan2(dy, dx) * 180 / Math.PI;  
		  }  
		
		  //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动  
		  function GetSlideDirection(startX, startY, endX, endY) {  
		      var dy = startY - endY;  
		      var dx = endX - startX;  
		      varresult = 0;  
		
		      //如果滑动距离太短  
		      if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {  
		          return result;  
		      }  
		
		      var angle = GetSlideAngle(dx, dy);  
		      if(angle >= -45 && angle < 45) {  
		          result = 4;  
		      }else if (angle >= 45 && angle < 135) {  
		          result = 1;  
		      }else if (angle >= -135 && angle < -45) {  
		          result = 2;  
		      }  
		      else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {  
		          result = 3;  
		      }  
		
		      return result;  
		  }  
		
		  //滑动处理  
		  var startX, startY;  
		  document.addEventListener('touchstart',function (ev) {  
		      startX = ev.touches[0].pageX;  
		      startY = ev.touches[0].pageY;    
		  }, false);  
		
		  document.addEventListener('touchend',function (ev) {  
		      var endX, endY;  
		      endX = ev.changedTouches[0].pageX;  
		      endY = ev.changedTouches[0].pageY;  
		      var direction = GetSlideDirection(startX, startY, endX, endY);  
		      switch(direction) {  
		          case 0:  
		              //alert("没滑动");  
		              break;  
		          case 1:  
		              //alert("向上");  
		              isNewRndItem = false;
			            move('up');
			            isGameOver();
		              break;  
		          case 2:  
		              //alert("向下"); 
		              isNewRndItem = false;
			          move('down');
			          isGameOver();
		              break;  
		          case 3:  
		              //alert("向左");
		              isNewRndItem = false;
			          move('left');
			          isGameOver();
		              break;  
		          case 4:  
		              //alert("向右");
		              isNewRndItem = false;
			          move('right');
			          isGameOver();
		              break;  
		          default:             
		      }  
		  }, false);
    })();
})
