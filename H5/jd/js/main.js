
var link = '';
$(function(){
    $.ajax({
        url:'common.php?act=play',
        type:'POST',
        dataType:'json',                
        success:function(e){
            if(e.retCode>0){
                console.log(e.retInfo);
                link = e.retInfo;
            }else{
            };
        }
    })
    $('.buy').on('click',function(){
        window.location.href = link;
    });
    var swiper1 = new Swiper('#heng', {
        paginationClickable: true,
        simulateTouch : true,
        onInit:function(swiper){
            swiper.lockSwipes();
            $('.into').addClass('animated flash');
        }
    });

    //第一页入口按钮
    $('.into').click(function(){
        swiper1.unlockSwipes();
        swiper1.slideTo(1,10,false);
        swiper1.lockSwipes();
        setTimeout(function(){
            $('.img6').hide();
        },1500);
    });

    //擦一擦
    var gua = 1;
    var botm_img = '../img/8.jpg';

    var body_width = $(window).width();
    var body_width = $(window).width();
    var body_height = $(window).height();
    $("#top_img").width(640).height(1030);
    var width  = 640;
    var height = 1030;
    $("#bg").width("100%").height($(window).height()-1);
    if(gua > 0){
        bodys(height,width);
    }

    function bodys(height,width){
        var img = new Image();
        var canvas = document.querySelector('canvas');
        canvas.style.position = 'absolute';
        img.addEventListener('load',function(e){
            var ctx;
            var pat;
            var w = width, h = height;
            var offsetX = canvas.offsetLeft, offsetY = canvas.offsetTop;
            var mousedown = false;
            function layer(ctx){
                var img =  document.getElementById('top_img');
                pat = ctx.createPattern(img,"repeat");
                //ctx.drawImage(img,0,0);
                ctx.fillStyle = pat;
                ctx.fillRect(0, 0, w, h);
            }
            function eventDown(e){
                e.preventDefault();
                mousedown=true;
            }
            function eventUp(e){
                e.preventDefault();
                mousedown=false;

                var data = ctx.getImageData(0,0,w,h).data;

                for(var i=0,j=0;i<data.length;i+=4){
                    if(data[i] && data[i+1] && data[i+2] && data[i+3]){
                        j++;
                    }
                }

                if(j<=w*h*0.8){
                    $('.img8').show();
                    $('.img5,#front').hide();
                    //$('#top_img').attr('src','..img/8.jpg');
                    //$('#front').remove();
                    //console.log(111);
                    setTimeout(function(){
                        $('#mask').show();
                        $('.img9').addClass('big');
                    },200);
                }

            }
            function eventMove(e){
                e.preventDefault();
                if(mousedown){
                    if(e.changedTouches){
                        e=e.changedTouches[e.changedTouches.length-1];
                    }
                    var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,
                        y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
                    with(ctx){
                        beginPath();
                        arc(x, y, 50, 0, Math.PI * 2);
                        fill();
                    }
                }
            }

            canvas.width=w;
            canvas.height=h;

            canvas.style.backgroundImage='url('+img.src+')';
            ctx=canvas.getContext('2d');

            layer(ctx);
            ctx.globalCompositeOperation = 'destination-out';
            canvas.addEventListener('touchstart', eventDown);
            canvas.addEventListener('touchend', eventUp);
            canvas.addEventListener('touchmove', eventMove);
            canvas.addEventListener('mousedown', eventDown);
            canvas.addEventListener('mouseup', eventUp);
            canvas.addEventListener('mousemove', eventMove);
        });

        img.src = botm_img;
        (document.body.style);
    }

    //飞机结束 拖动开始
    $('.img9').click(function(){
        $('#mask,.img9').hide();
        swiper1.unlockSwipes();
        swiper1.slideTo(2,10,false);
        swiper1.lockSwipes();
        setTimeout(function(){
            $('.img12').hide();
        },1500);
    });


    //拖动
    new Drag({
        dragEle: ".nei",
        targetEle: ".wai",
        ondrag: function (obj) {

        },
        success:function(){
            //console.log('success');
            $('.img13').show();
            $('.nei,.img12,.img14').hide();
            setTimeout(function(){
                $('#mask').show();
                $('.img15').addClass('big');
            },200);
        },
        fail:function(){
            //console.log('fail');
            alert('放到镜头上');
        }
    });

    //拖拽结束 切割开始
    $('.img15').click(function(){
        $('#mask,.img15').hide();
        swiper1.unlockSwipes();
        swiper1.slideTo(3,10,false);
        swiper1.lockSwipes();
        setTimeout(function(){
            $('.img17').hide();
            $('.add').hide();
            $('.add0').show();
            $('.add0').addClass('animated flash');
        },1500);
    });

    //切割

    var mybody = $('.qiege')[0];
    var result = 0;

    //返回角度
    function GetSlideAngle(dx,dy) {
        return Math.atan2(dy,dx) * 180 / Math.PI;
    }

    //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
    function GetSlideDirection(startX,startY, endX, endY) {

        var dy = startY - endY;
        var dx = endX - startX;

        //如果滑动距离太短
        if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
            return result;
        }

        var angle = GetSlideAngle(dx, dy);
        //if (angle >= -45 && angle < 45) {
        //    result = 4;
        //}else if (angle >= 45 && angle < 135) {
        //    result = 1;
        //}else if (angle >= -135 && angle < -45) {
        //    result = 2;
        //}else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        //    result = 3;
        //}
        if((angle >= -45 && angle < 45) || (angle >= 45 && angle < 135) || (angle >= -135 && angle < -45) ||(angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)){
            result = 1;
        }
        return result;

    }

    //滑动处理
    var startX, startY;
    mybody.addEventListener('touchstart', function (ev){
        ev.preventDefault();
        startX = ev.touches[0].pageX;
        startY = ev.touches[0].pageY;
    }, false);

    var i=0;
    mybody.addEventListener('touchend', function (ev){
        var endX, endY;
        ev.preventDefault();
        endX = ev.changedTouches[0].pageX;
        endY = ev.changedTouches[0].pageY;

        var direction = GetSlideDirection(startX, startY, endX, endY);
        //switch (direction){
        //    case 0:
        //        console.log("没滑动");
        //        break;
        //    case 1:
        //        console.log("向上");
        //        break;
        //    case 2:
        //        console.log("向下");
        //        break;
        //    case 3:
        //        console.log("向左");
        //        break;
        //    case 4:
        //        console.log("向右");
        //        break;
        //    default:
        //}
        if(result==1){
            i=i+1;
            console.log("滑动");
            if(i==1){
                console.log(1);
                $('.add').hide();
                $('.img16').attr('src','./img/peo1/2.jpg');
                $('.add1').show();
                $('.add1').addClass('animated flash');
            }else if(i==2){
                console.log(2);
                $('.add').hide();
                $('.img16').attr('src','./img/peo1/3.jpg');
                $('.add2').show();
                $('.add2').addClass('animated flash');
            }else if(i==3){
                console.log(3);
                $('.add').hide();
                $('.img16').attr('src','./img/peo1/4.jpg');
                setTimeout(function(){
                    $('#mask').show();
                    $('.img18').addClass('big');
                },1000);
            }else{
                return false;
            }
            //$('.peo').show();
            //peo1.playByNum(3,'forward');  //1表示2张图片

        }else{
            console.log("没滑动");
        }
    }, false);


    peo1 = stepsPic($('.peo'),img(1,4),4,2000);  //img(1,2) 1表示peo1文件夹 2表示2张图片

    //序列帧函数
    function stepsPic(obj,resource,length,time){
        var filmPic = new mo.Film(obj[0],{
            resource : resource,   //图片数组
            playTime:time,
            totalFrame : length  //一共几张图片
        });
        return filmPic;
    }

    //序列帧数组
    function img(index,length){
        var path = "./img/peo"+index+"/";
        var resource = [];
        for (var i = 1; i <= length; i++) {
            resource.push(path+i+'.jpg');
        }
        return resource;
    }

    //切割结束
    $('.img18').click(function(){
        $('#mask,.img18').hide();
        swiper1.unlockSwipes();
        swiper1.slideTo(4,10,false);
        swiper1.lockSwipes();
        $('.buy').addClass('animated flash');
    });

    //
    //swiper1.unlockSwipes();
    //swiper1.slideTo(3,10,false);
    //swiper1.lockSwipes();
    //setTimeout(function(){
    //    $('.img17').hide();
    //},1500);

});
