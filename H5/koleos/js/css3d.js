(function(){

    var s = new C3D.Stage();

    s.size(window.innerWidth, window.innerHeight).material({

    }).update();

    s.position(0, 0, 0);

    document.getElementById('stage').appendChild(s.el);

    var bg = new C3D.Sprite();
    var animal = new C3D.Sprite();

    var radius = calTranslateZ({
        width: 149,
        number: 20
    });

    bg.position(0, 0, -200).update();
    animal.position( 0, 0, -190).update();

    s.addChild(bg);
    s.addChild(animal);

    // 背景
    for (var i = 0; i < 20; i++) {

        var url = 'img/images/bg_' + (i + 1) + 'w.jpg?a=5';
        var plane = new C3D.Plane();

        var radian = Math.PI * 2 / 20 * i; // 旋转的弧度
        var angle = 360 / 20 * i; // 旋转的角度数

        // if(i==7){
        //     console.log('树平移x：',Math.sin(radian) * radius)            
        //     console.log('树平移y：',Math.sin(radian) * -Math.cos(radian) * radius)            
        // }
        // 平移在旋转
        plane.size(150, 1400).position(Math.sin(radian) * radius, 0, -Math.cos(radian) * radius).rotation(0, -angle, 0).material({
            image: url,
            repeat: 'no-repeat',
        }).update();
        bg.addChild(plane);

    }

    for (var i = 0; i < 20; i++) {

        var url = 'img/images/animal_' + (i + 1) + 'w.png?a=5';
        if(i==0){
            url = 'img/images/animal_1ww.png?a=5';
        }
        if(i==1){
            url = 'img/images/animal_2ww.png?a=5';
        }
        if(i == 15){
            url = 'img/images/animal_16wwww.png?a=5';
        }
        if(i == 16){
            url = 'img/images/animal_17wwww.png?a=5';
        }

        var plane = new C3D.Plane();
        var radian = Math.PI * 2 / 20 * i;
        var angle = 360 / 20 * i;
        plane.el.className = 'animal_'+(i + 1) + 'w';
        plane.size(150, 1400).position(Math.sin(radian) * radius, 0, -Math.cos(radian) * radius).rotation(0, -angle, 0).material({
            image: url,
            repeat: 'no-repeat',
        }).update();
        animal.addChild(plane);

    }

    // 操作

    var orienter = new Orienter();

    var nowLon = -20 ; // 当前经度（longitud）
    var nowAnLon = -20;
    var nowLat = 0; // 当前纬度
    var prevLon; // 上一个经度
    var prevLat; // 上一个纬度
    var differLon; // 经度差值
    var differLat;  // 经度差值
    var differCoe = 0.6; // 差值系数
    var differCoeLat = 0.3;

    var prevPt = {}; // 前一个点

    var t = 0;
    var start = 0;
    var end = 0;
    var start1 = 0;
    var end1 = 0;
    var start2 = 0;
    var end2 = 0;

    var d = 100;
    var dd = 1000;

        // 重力感应
    orienter.handler = function(obj) {
        // d.lon = -obj.lon, d.lat = obj.lat + 45;


        prevLon = prevLon == undefined ? obj.lon : prevLon;
        prevLat = prevLat == undefined ? obj.lat : prevLat;

        differLon = obj.lon - prevLon;
        differLat = obj.lat - prevLat;

        // console.log(obj.lon);

        if (differLon > 10) { 
            differLon = -1;
        }
        if (differLon < -10) {
            differLon = 1;
        }

        start1 = nowLon;
        nowLon += -differLon * differCoe;
        end1 = nowLon;

        start2 = nowLat;
        nowLat -= differLat *differCoeLat;
        end2 = nowLat;

        start = nowAnLon;
        nowAnLon += -differLon * 0.6;
        end = nowAnLon;

        prevLon = obj.lon;
        prevLat = obj.lat;

        // console.log(end2);

    }

    orienter.init();

    var startX;
    var startY;
    var c = {
        lon: 0,
        lat: 0
    }
    
        // 手势操作
    document.addEventListener('touchstart', function(e) {
        // e.preventDefault();
        var touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        isMove = false; //是否产生滑动

    });

    document.addEventListener('touchmove', function(e) {
        e.preventDefault();

        var nowPoint = e.touches ? e.touches[0] : e;
        var toRight;
        var isTop;

        e.preventDefault();

        prevPt.x = prevPt.x == undefined ? nowPoint.pageX : prevPt.x;
        prevPt.y = prevPt.y == undefined ? nowPoint.pageY : prevPt.y;

        toRight = nowPoint.pageX - prevPt.x > 0? -3 : 3;

        isTop = nowPoint.pageY - prevPt.y > 1 ? 1 : -1; 

        start1 = nowLon;
        nowLon += toRight * 0.6;
        end1 = nowLon;

        start2 = nowLat;
        nowLat += isTop * differCoeLat;
        end2 = nowLat;

        start = nowAnLon;
        nowAnLon += toRight * 0.6;
        end = nowAnLon;

        prevPt.x = nowPoint.pageX;
        prevPt.y = nowPoint.pageY;


    }, false);

    // 场景刷新
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
        function(callback) {
            setTimeout(callback, 1000 / 60);
        };
            
    function go() {

        if (nowLat < -8.5) nowLat = -8.5 // 限制纬度的范围
        if (nowLat > 8.5) nowLat = 8.5

        bg.rotation(nowLat, nowLon, 0).updateT();
        animal.rotation(nowLat,easeOut(0,t,start,end,d), 0).updateT();

        bg.updateT();
        animal.updateT();
        requestAnimationFrame(go);
    }

    requestAnimationFrame(go);
    //响应屏幕调整尺寸
    function resize() {
        s.size(window.innerWidth, window.innerHeight).update();
    }

    window.onresize = function() {
        resize();
    };

    resize();

    // 工具
    // 计算半径
    function calTranslateZ(opts) {
        return Math.round(opts.width / (2 * Math.tan(Math.PI / opts.number)));
    }
    // 获取时间戳
    function now() {
        return new Date().getTime();
    }
    function easeOut(x,t,b,c,d)
    {
        return -c *(t/=d)*(t-2) + b;   
    }
    function linear(x, t, b, c, d)
    {
        return c * t / d + b;
    }

})()