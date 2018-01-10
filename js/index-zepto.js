// 1 头部背景颜色渐变
;(function () {
  var header = document.querySelector('.jd_header');
  var opacity = 0;
  //监听window的滚动事件
  window.addEventListener('scroll',function () {
    //获取页面滚动出去的高度
    // 现代浏览器获取页面滚动出去的高度 window.pageYOffset
    // ie 获取页面滚动出去的高度 document.documentElement.scrollTop
    // document.body.scrollTop (更向下兼容ie)
    var scrollTop = window.pageYOffset||document.documentElement.scrollTop||  document.body.scrollTop||0;
    // console.log(scrollTop);
    // 当前scrollTop/500 = 当前的opactity/0.9
    if(scrollTop>500) {
      opacity = 0.9;
    }else {
      opacity = scrollTop/500*0.9;
    }
    header.style.backgroundColor = "rgba(222, 24, 27,"+opacity+") ";
  })
  
})();

// 2 动态设置秒杀ul的宽度
;(function () {
  var ul = document.querySelector('.seckill_c ul');
  var lis = ul.querySelectorAll('li');
  var liWidth = lis[0].offsetWidth;
  ul.style.width = lis.length*liWidth +'px';
})();


// 倒计时功能
;(function () {
  var spans = document.querySelectorAll('.seckill_time span:nth-child(odd)');
  console.log(spans);
  var now = new Date();
  setTime();
  var timeId = setInterval(setTime,1000);
  function  setTime() {
    var secTime = new Date(2018,0,3,12,0,0);
    var time = secTime - now;//毫秒的时间差
    time = parseInt(time/1000);// 秒的时间差
    if(time<=0) {
      //清除定时器
      time = 0;
      clearInterval(timeId);
    }
    var hour = parseInt(time/60/60);
    var minutes = parseInt(time/60%60);
    var second = parseInt(time%60);
    spans[0].innerText = addZero(hour);
    spans[1].innerText = addZero(minutes);
    spans[1].innerText = addZero(second);
  }
  function  addZero(n) {
    return n<10? '0'+n:n;
    
  }
  
})();
// 京东快报轮播图
;(function () {
  var ul = document.querySelector('.jd_news .info ul');
  var lis = ul.querySelectorAll('li');
  var liHeight = lis[0].offsetHeight;
  var index = 0;
//每隔两秒让ul向上移动一个li的高度 translateY
  setInterval(function () {
    //
    // if(index>=lis.length-1) {
    //   index=0;
    //   ul.style.transition = 'none';
    //   ul.style.webkitTransition = 'none';
    //   ul.style.transform = 'translateY(-'+index*liHeight+'px)';
    //   ul.style.webkitTransform = 'translateY(-'+index*liHeight+'px)';
    // }
    index++;
    // console.log(index);
    ul.style.transition = ' all 0.5s';
    // 过渡的时间要小于定时器的时间
    ul.style.webkitTransition = 'all 0.5s';
    ul.style.transform = 'translateY(-'+index*liHeight+'px)';
    ul.style.webkitTransform = 'translateY(-'+index*liHeight+'px)';
  },2000);
  //当ul的过渡结束之后。判断index的值
  ul.addEventListener('transitionend',function () {
    // console.log(index);
    if(index>=lis.length-1) {
      index=0;
      ul.style.transition = 'none';
      ul.style.webkitTransition = 'none';
      ul.style.transform = 'translateY(-'+index*liHeight+'px)';
      ul.style.webkitTransform = 'translateY(-'+index*liHeight+'px)';
    }
  })
  
})();

//banner轮播图功能
;(function () {
  //找对象
  var banner = document.querySelector('.jd_banner');
  var imgUrl = document.querySelector('.imgUrl');
  var lis = imgUrl.querySelectorAll('li');
  var pointUrl = document.querySelector('.pointUrl');
  var points = pointUrl.querySelectorAll('li');
  var width = banner.offsetWidth;
  var index = 1;
  
  var timeId =  setInterval(function () {
    index++;
    // index--;
    // imgUrl.style.transition = 'all 0.2s';
    // imgUrl.style.webkitTransition = 'all 0.2s';
    //添加过渡
    addTransition();
    imgUrl.style.transform = 'translateX(-'+index*width+'px)';
    imgUrl.style.webkitTransform = 'translateX(-'+index.width+'px)';
    // 设置ul的位置 负值
    // setTranslate(-index*width);
  },1000);
  
  //过渡结束的时候，判断index的值
  imgUrl.addEventListener('transitionend',function () {
    console.log(index);
    // 左滑动的判断(下一张)
    if(index>=lis.length-1) {
      index = 1;
    }
    // 右滑动的判断(上一张)
    if(index<=0) {
      index = lis.length-2;
    }
    //移除过渡
    // imgUrl.style.transition = 'none';
    // imgUrl.style.webkitTransition = 'none';
    removeTransition();
    imgUrl.style.transform = 'translateX(-'+index*width+'px)';
    imgUrl.style.webkitTransform = 'translateX(-'+index.width+'px)';
    //设置ul的位置
    //   setTranslate(-index*width);
    // 过渡结束的时候设置小圆点,在过渡结束的时候,index的值做了判断，且修改了
    for(var i = 0;i < points.length;i++){
      points[i].classList.remove('active');
    }
    //让对应index-1的小圆点背景高亮
    points[index-1].classList.add('active');
  });
  
  
  // 给ul注册手指触摸的三个事件
  //手指开始触摸的时候触发
  //1、手指开始滑动的时候清除定时器
  // 2、手指开始滑动的时候获取手指的位置
  // 3 获取手指开始滑动的时间
  
  var start ;
  var startTime;
  //手指开始触摸的时候触发
  imgUrl.addEventListener('touchstart',function () {
    //清除定时器
    clearInterval(timeId);
    
  })
 
  
  $(imgUrl).on('swipeLeft',function () {
    //手指左滑动的时候触发 下一张图片
    index++;
    addTransition();
    setTranslate(-index*width);
    
  })
  $(imgUrl).on('swipeRight',function () {
    //手指右滑 上一张图片
    index--;
    addTransition();
    setTranslate(-index*width);
  })
  // 手指触摸移动的时候触发
  //手指画图，imgUrl能够跟着滑动功能实现：
  //1 手指滑动的时候获取手指滑动到的位置，计算移动的距离
  //2 移除imgUrl 的动画
  // 重新设置imgUrl的位置
  
 
  //手指触摸结束的时候触发
  //1 获取手指触摸滑动结束时的位置 计算滑动的距离
  // 2  判断滑动是否成功的条件：
  // 2.1判断这个距离是否超过1/3屏幕宽度,超过就滑动成功，到上一屏或者下一屏，没超过1/3屏
  // 2.2 判断从开始滑动到结束的时间是否小于300ms 并且距离是否大于等于30
  // 3 没超过1/3屏就还在ul还在原来的那个位置
  imgUrl.addEventListener('touchend',function () {
    timeId = setInterval(function () {
      index++;
      addTransition();
      setTranslate(-index*width);
    },1000)
  })
  
  
  //从pc端切换到移动端时,banner的宽度发生了变化，也就是html的宽度变为了手机的宽度
  //此时banner的宽度要更改，即ul移动的距离也要更改 给window注册resize事件
  window.addEventListener('resize',function () {
    //清除定时器
    clearInterval(timeId);
    //获此时banner的宽度，此时ul的位置还没更改
    width = banner.offsetWidth;
    console.log('banner宽度：'+width);
    //获取banner宽度之后要修改ul的位置
    //先移除ul的过渡
    console.log(index);
    removeTransition();
    setTranslate(-index*width);
    //重新开启定时器
    timeId  = setInterval(function () {
      index++;
      addTransition();
      setTranslate(-index*width);
    },1000)
  })
  
  //封装的简单函数
  // 添加过渡
  function  addTransition() {
    imgUrl.style.transition = 'all 0.2s';
    imgUrl.style.webkitTransition = 'all 0.2s';
  }
  //移除过渡
  function removeTransition() {
    imgUrl.style.transition = 'none';
    imgUrl.style.webkitTransition = 'none';
  }
  //改变url的位置
  function  setTranslate(value) {
    imgUrl.style.transform = 'translateX('+value+'px)';
    imgUrl.style.webkitTransform = 'translateX('+value+'px)';
  }
  
})();

