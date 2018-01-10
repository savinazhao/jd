// 按钮选择的功能
;(function () {
// checkbox 选中不选中
  var all = document.querySelectorAll('.checkbox');
  console.log(all);
  //注册点击事件
 all.forEach(function (e,i) {
    e.addEventListener('click',function () {
      this.classList.toggle('active');
    })
  })
  
  // for(var i = 0;i < all.length;i++){
  //   all[i].addEventListener('click',function () {
  //      this.classList.toggle('active');
  //   })
  // }
  
  //全选
  var title = document.querySelector('.shopping_title .checkbox');
  var contents = document.querySelectorAll('.shopping_content .checkbox');
    title.addEventListener('click',function () {
     contents.forEach(function (e,i) {
        if (title.classList.contains('active')) {
          e.classList.add('active');
        }else  {
         e.classList.remove('active');
        }
       })
    })
      //点击单个shopping_content下的checkbox
      // var length= contents.length;
      var flag = true;
      contents.forEach(function (e,i) {
        e.addEventListener('click',function () {
        
           //判断全部选中的个数和总的个数是否相等
           // if(e.classList.contains('active')) {
           // }else {
           //   length--;
           // }
           // if(length==contents.length) {
           //      title.classList.add('active');
           // }else {
           //   title.classList.remove('active');
           // }
          // contents.forEach(function (e,i) {
          //     if(!e.classList.contains('active')) {
          //       // title.classList.remove('active');
          //       flag = false;
          //     }
          // })
          for(var i = 0;i < contents.length;i++){
               if(!contents[i].classList.contains('active')) {
                    flag = false;
                 title.classList.remove('active');
               }
          }
          // if(flag === false) {
          //
          // }else {
          //   title.classList.add('active');
          // }
          if(flag) {
            title.classList.add('active');
          }
            flag = true;
        })
      })
     /*var flag = true;
     for(var i = 0;i < contents.length;i++){
       contents[i].addEventListener('click',function () {
           for(var j = 0; j < contents.length; j++) {
             if( !contents[j].classList.contains('active')) {
               flag = false;
             }
           }
           if(flag === false) {
             title.classList.remove('active');
           }else {
             title.classList.add('active');
           }
           flag = true;
       })
     }*/
     
   // for(var i = 0;i < contents.length;i++){
   //   if(title.classList.contains('active')) {
   //     contents[i].classList.add('active');
   //   }else {
   //     contents[i].classList.remove('active');
   //   }
   // }

})();

//点击垃圾桶删除的功能
;(function () {

var rubbishs = document.querySelectorAll('.rubbish');
var mask = document.querySelector('.mask');
var cancel = document.querySelector('.cancel');
var confirm = document.querySelector('.confirm');

  // 给所有的垃圾桶注册点击事件
  var rubbshUp; // 存储哪个垃圾桶的盖子
  var id;// 存储商品的id
  // for(var i = 0;i < rubbishs.length;i++){
  //   rubbishs[i].addEventListener('click',function () {
  //     // 1、点击垃圾桶，蒙层弹出来
  //     mask.style.display = 'block';
  //     //2、 点击垃圾桶垃圾桶盖掀开
  //     // 获取垃圾桶的盖子
  //  rubbshUp  = this.children[0];
  //     rubbshUp.style.transition = ' all 0.5s';
  //     rubbshUp.style.transformOrigin = ' right bottom';
  //     rubbshUp.style.transform = 'rotate(20deg)';
  //     // 点击删除的时候获取此删除按钮上的data-id的值
  //     id = this.dataset.id;
  //     console.log(id);
  //
  //   })
  // }
   rubbishs.forEach(function (e,i) {
      e.addEventListener('click',function () {
          mask.style.display = 'block';
          rubbshUp = e.children[0];
          rubbshUp.style.transition = 'all 0.5s';
          rubbshUp.style.transformOrigin = 'right bottom';
          rubbshUp.style.transform = ' rotate(20deg)';
          id = e.dataset.id;
        console.log(id);
      })
   })
  
  
  // 点击取消按钮
  cancel.addEventListener('click',function () {
    //点击取消按钮，蒙层隐藏,垃圾盖子关闭
    mask.style.display = 'none';
    // 垃圾盖关闭
    rubbshUp.style.transform ='rotate(0)';
  })
  // 点击确定按钮 删除对应的商品
  // 如何来知道点击删除的是哪个商品,先在商品的content盒子上存储一个id标识这个商品
  // 然后在此商品所在的删除按钮上自定义一个data-id 属性存储这个商品对应的id
  confirm.addEventListener('click',function () {
    //根据id值找到content
    // var content = document.getElementById(id);
    var content = document.querySelector('#'+id);
    //删除content
    content.parentNode.removeChild(content);
    //删除之前蒙层隐藏
    mask.style.display = 'none';
    
  })
  


})();

