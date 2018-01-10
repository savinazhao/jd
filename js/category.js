//实现nav导航部分的区域滚动
;(function () {
  var nav = document.querySelector('.jd_nav');
  var  ul = nav.querySelector('ul');
  var lis = ul.children;
  //给ul注册手指触摸的三个事件
  //手指开始触摸的时候
  var start;//开始触摸滑动时的位置
  var currentY = 0;// 核心变量，记录每次滑动结束后的位置
  ul.addEventListener('touchstart',function (e) {
    start = e.changedTouches[0].clientY;
  });
  //触摸移动的时候让ul跟着滑动
  ul.addEventListener('touchmove',function (e) {
    //手指移动过程中移动的距离
    var distance = e.changedTouches[0].clientY - start;
    var temp = currentY + distance;
    console.log('开始位置：'+start);
    console.log('移动距离：'+distance);
    //移除ul的过渡
    removeTransition();
    //限制滑动的距离 向下滑动也就是ul向下的translateY的值不能大于50
    // ul向上滑动的距离不能小于nav.offsetHeight - ul.offsetHeight-50
    if(temp>=50) {
      temp = 50
    }
    if(temp <= nav.offsetHeight - ul.offsetHeight - 50) {
      temp = nav.offsetHeight - ul.offsetHeight-50;
    }

    //设置ul的位置
    setTranslateY(temp);
    console.log('temp:'+temp);
  });

  // 在触摸移动结束的时候能够反弹回去
  ul.addEventListener('touchend',function (e) {
    // 触摸结束时候移动的距离
    var distance = e.changedTouches[0].clientY - start;
    currentY += distance;
    console.log('currentY'+currentY);
    //移动结束后的位置currentY大于0就反弹回去
    // 向下滑动的反弹回去
      if(currentY>0) {
        currentY = 0;
      }
    //向上滑动反弹回来
      if(currentY<nav.offsetHeight - ul.offsetHeight) {
        currentY = nav.offsetHeight - ul.offsetHeight;
      }
    //反弹回去要有过渡，添加过渡
    addTransition();
    //返回回去。从新设置位置
    setTranslateY(currentY);

  })
  //添加过渡的方法
  function addTransition() {
    ul.style.transition = ' all 0.2s';
    ul.style.webkitTransition = 'all 0.2s';
  }
  //移除过渡
  function  removeTransition() {
    ul.style.transition = 'none';
    ul.style.webkitTransition = 'none';
  }
  //设置ul的位置
  function setTranslateY(value) {
    ul.style.transform = 'translateY('+value+'px)';
    ul.style.webkitTransform = 'translateY('+value+'px)';
  }
})();



// // 2 使用插件实现区域滚动
// //初始化插件
// window.addEventListener('load',function () {
//   //这里面的选择器找的是父盒子
//   new IScroll('.jd_nav',{
//     scrollY:true,
//     scrollX:false
//   })
//   // 使用插件使右边的content也能区域滚动
//   new IScroll('.jd_content',{
//     scrollY:true,
//     scrollX : false
//   })
//
// })




