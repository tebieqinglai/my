

var Scratch = function(el,option){
    var can,ctx,img;
    this.obj = {
        canvasId :el,
        color : option.color || "#ddd",
        url : option.url || "",
        width : option.width || document.getElementById(el).offsetWidth,
        height : option.height || document.getElementById(el).offsetHeight,
        handWidth : option.handWidth || 30,
        percent : option.percent || 0.5,
        time : option.time || 200,
        autoClick : option.autoClick && true,
        isPercent : option.isPercent && true,
        percentFun : option.success || ""
    };
    this.init  = function(){
        var self = this;
        checkDraw.call(this,function(){
            getCanvas.call(self,self.obj.canvasId);
            draw.call(self);
            move.call(self);
        })
    }
    // 请清除画布
    this.initCanvas = function(){
        ctx.restore();
        draw.call(this);
    }
    // 添加文字
    this.drawTxt = function(txt,option){
        drawTxt.call(this,txt,option)
    }
    var drawTxt = function(txt,option){
        var top = option.top || (this.obj.height / 2)
        var left = option.top || (this.obj.height / 2)
        ctx.textAlign = txt;
        ctx.fillText("textAlign=center",600,500);
    }
    // 检测是否有图片
    var checkDraw = function(fn){
        if(this.obj.url){
            img = new Image();
            img.src = this.obj.url;
            img.onload = function(){
                fn && fn.call(this);
            }
        }else{
            fn && fn.call(this);
        }
    }


    // 获取画布基础值
    var getCanvas = function(id){
        can = document.getElementById(id);
        ctx = can.getContext('2d');
        this.obj["oTop"] = option.top || getOffset(can)[1];
        this.obj["oLeft"] = option.left || getOffset(can)[0];
    }
    //画布画内容
    var draw =  function(){
        ctx.save();
        if(this.obj.url){
            drawImg.call(this,img);
        }else{
            drawColor.call(this);
        }
    }
    // 绘制图片
    var drawImg = function(img){
        ctx.drawImage(img,0,0,this.obj.width,this.obj.height);
    }
    // 绘制颜色
    var drawColor = function(){
        ctx.beginPath();
        ctx.fillStyle = this.obj.color;
        ctx.fillRect(0,0,this.obj.width,this.obj.height);
        ctx.closePath();
    }
    // 手指头移动画布
    var move = (function(){
        var oLeft,oTop,handWidth,percent,callback,time,autoClick;
        return function(){
            var self = this;
            oLeft = this.obj.oLeft;
            oTop = this.obj.oTop;
            handWidth = this.obj.handWidth;
            percent = this.obj.percent;
            callback = this.obj.percentFun;
            time = this.obj.time;
            autoClick = this.obj.autoClick;
            isPercent = this.obj.isPercent;
            can.addEventListener("touchstart",function(event){
                var x = event.touches[0].clientX;
                var y = event.touches[0].clientY;
                drawTran(x,y,oLeft,oTop,handWidth);
            },false)
            can.addEventListener("touchmove",function(event){
                /* 根据手指移动画线，使之变透明*/
                var x = event.touches[0].clientX;
                var y = event.touches[0].clientY;
                drawTran(x,y,oLeft,oTop,handWidth);
            })
            can.addEventListener("touchend",function(event){
                //判断画布刮开部分百分比
                complete.call(self,ctx,can,percent,callback,oTop,oLeft,time,autoClick);
            })
        }
    })()


    // 画手指当前透明
    function drawTran(x,y,oLeft,oTop,handWidth){
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x-oLeft,y-oTop,handWidth,0,Math.PI*2);
        ctx.fill();
    }
    //判断完成度
    function complete(ctx,can,percent,callback,oTop,oLeft,time,autoClick){
        var imageDate = ctx.getImageData(0,0,can.width,can.height);
        var allPX = imageDate.width * imageDate.height;
        var iNum = 0;//记录刮开的像素点个数
        var self = this;
        for(var i=0;i<allPX;i++){
            if(imageDate.data[i*4+3] == 0){
                iNum++;
            }
        }
        if(iNum >= allPX * percent ){
            if(autoClick){
                setTimeout(function(){
                    ctx.globalCompositeOperation = "destination-out";
                    ctx.beginPath();
                    ctx.fillRect(0, 0, self.obj.width, self.obj.height)
                    callback && callback.call(can);
                },time)
            }else{
                callback && callback.call(can);
            }


        }
    }
    /* 获取该元素到可视窗口的距离*/
    function getOffset(obj){
        var valLeft = 0,valTop = 0;
        function get(obj){
            valLeft += obj.offsetLeft;
            valTop += obj.offsetTop;
            /* 不到最外层就一直调用，直到offsetParent为body*/
            if (obj.offsetParent.tagName!='BODY') {
                get(obj.offsetParent);
            }
            return [valLeft,valTop];
        }
        return get(obj);
    }
}
