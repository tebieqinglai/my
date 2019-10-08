(function() {
	var imgArr = ['img/loading.gif','img/page1-animal.jpg','img/page1-bg.jpg','img/page1-car-pos.png','img/page1-car.png','img/page1-logo.png','img/page2-bg.jpg','img/page2-btn1.png','img/page2-btn2.png','img/page2-btn3.png','img/page2-car.png','img/page2-into.png','img/page3-bg.jpg','img/page3-bg1.jpg','img/page3-bg2.jpg','img/page3-re.png','img/page3-submit.png','img/page3-true.png','img/page4-back.png','img/page4-bg.jpg','img/page4-bg1.jpg','img/page4-share.png','img/radio-ff.png','img/radio-f.png','img/radio-t.png','img/radio-tt.png','img/sanjiao.png','img/share.jpg','img/tips1.png','img/share1.png','img/tips2.png','img/tips3.png','img/weixin.png','img/images/animal_10w.png','img/images/animal_11w.png','img/images/animal_12w.png','img/images/animal_13w.png','img/images/animal_16w.png','img/images/animal_14w.png','img/images/animal_16ww.png','img/images/animal_15w.png','img/images/animal_16www.png','img/images/animal_17w.png','img/images/animal_17ww.png','img/images/animal_17www.png','img/images/animal_18w.png','img/images/animal_19w.png','img/images/animal_1w.png','img/images/animal_20w.png','img/images/animal_1ww.png','img/images/animal_2w.png','img/images/animal_2ww.png','img/images/animal_3w.png','img/images/animal_4w.png','img/images/animal_5w.png','img/images/animal_6w.png','img/images/animal_7w.png','img/images/animal_8w.png','img/images/animal_9w.png','img/images/bg_11w.jpg','img/images/bg_10w.jpg','img/images/bg_12w.jpg','img/images/bg_14w.jpg','img/images/bg_13w.jpg','img/images/bg_15w.jpg','img/images/bg_17w.jpg','img/images/bg_16w.jpg','img/images/bg_18w.jpg','img/images/bg_19w.jpg','img/images/bg_20w.jpg','img/images/bg_1w.jpg','img/images/bg_2w.jpg','img/images/bg_3w.jpg','img/images/bg_4w.jpg','img/images/bg_6w.jpg','img/images/bg_5w.jpg','img/images/bg_7w.jpg','img/images/bg_8w.jpg','img/images/bg_9w.jpg','img/lunbo/pic1.png','img/lunbo/pic10.png','img/lunbo/pic11.png','img/lunbo/pic2.png','img/lunbo/pic3.png','img/lunbo/pic4.png','img/lunbo/pic5.png','img/lunbo/pic6.png','img/lunbo/pic8.png','img/lunbo/pic7.png','img/lunbo/pic9.png','img/frame/film-1.jpg','img/frame/film-0.jpg','img/frame/film-10.jpg','img/frame/film-11.jpg','img/frame/film-12.jpg','img/frame/film-13.jpg','img/frame/film-14.jpg','img/frame/film-15.jpg','img/frame/film-16.jpg','img/frame/film-17.jpg','img/frame/film-18.jpg','img/frame/film-19.jpg','img/frame/film-2.jpg','img/frame/film-20.jpg','img/frame/film-21.jpg','img/frame/film-22.jpg','img/frame/film-23.jpg','img/frame/film-24.jpg','img/frame/film-25.jpg','img/frame/film-26.jpg','img/frame/film-27.jpg','img/frame/film-28.jpg','img/frame/film-29.jpg','img/frame/film-3.jpg','img/frame/film-30.jpg','img/frame/film-31.jpg','img/frame/film-4.jpg','img/frame/film-5.jpg','img/frame/film-6.jpg','img/frame/film-7.jpg','img/frame/film-8.jpg','img/frame/film-9.jpg','img/frame/guodu.jpg','img/frame/goudu1.jpg'];
    //callback:loading结束后的回调函数

    netease_loading(imgArr,function(){
        setTimeout(function(){
    	   film.playByNum(20);
        },1000);
    });

    $(document).on('WeixinJSBridgeReady',function(){
            $('#sound')[0].play();
            $('#sound')[0].pause();
    });

    // page1
    // film
    var imgArray = [];
    for (var i = 0; i < 21; i++) {
        imgArray.push('img/frame/film-' + i + '.jpg');
    };

    var cH = document.body.offsetHeight;



    $('.tips1').css('top',(cH-300)/2);
    console.log((cH-200)/2)
    // $('.page1-an').css('-webkit-transform','scaleY('+cH/1036+')');
    // $('.page1-an').css('transform','scaleY('+cH/1036+')');

    var film = new mo.Film(document.querySelector('#film'), {

        resource: imgArray,
        totalFrame: 20,
        playTime: 2000,
        aniComplete: function() {
        	$('.page1-an').show();
        	setTimeout(function(){
        		$('.an2').addClass('inBig');
        		$('.an3').addClass('inBigSm');
        		$('.an4').addClass('hide1');
        		$('.an1').addClass('show');
        		$('.an1').on('webkitAnimationEnd',function(){
        			$('.page1-an').addClass('moveLeft');
        		});
        		setTimeout(function(){
	        			$('.page1').addClass('hide');
	        			$('.page1').on('webkitAnimationEnd',function(){
	        				$('.page1').remove();
	        			})
	        			$('#sound')[0].play();
	        			setTimeout(function(){
	        				$('.tips1').remove();
	        			},9000)
        		},4200);

        	},1500)
        }
    });

    $('.page2-btn1').tap(function(){
    	window.location.href = 'http://www.dongfeng-renault.com.cn/vehicles/newkoleos_launch?smartcode=2348466&campaigncode=4995112258BDD2AEE0538305DF0A82AF';
    });

    $(document).on('tap','.animal_16w,.animal_17w',function(){
    	$('.page2').hide();
    	$('.page3').show();
    	$('#sound').get(0).pause();
    });


    //软键盘 弹出影响页面表单
    var cH = document.body.clientHeight;
    $('.page5-bg').css('height','1030px');


    // page3、page4

    var $page3 = $('.page3');
    var $page4 = $('.page4');
    var $page5 = $('.page5');

    // 预约试驾
    $('.page2-btn2').tap(function() {
        $page3.hide();
        $page5.show();
    });

    //车型亮点
    $('.page2-btn3').tap(function() {
        $page3.hide();
        $page4.show();
        var mySwiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            loop:true
        });
    });


    $('.page4-back').tap(function() {
        $page4.hide();
        $page3.show();
    });

     $('.page5-back').tap(function() {
        $page5.hide();
        $page3.show();
    });


    // 分享
    $('.share-pop').click(function(){
    	$(this).hide();
    })

    // page5 表单


    var $sex = $('.sex');

    // 称谓
    $('.man').tap(function() {
        $sex.attr('data-sex', '1');
        $sex.find('img.man').attr('src', 'img/radio-tt.png');
        $sex.find('img.woman').attr('src', 'img/radio-ff.png');
    });
    $('.woman').tap(function() {
        console.log('this')
        $sex.attr('data-sex', '0');
        $sex.find('img.man').attr('src', 'img/radio-ff.png');
        $sex.find('img.woman').attr('src', 'img/radio-tt.png');
    });

    // 提交试驾资料
    getSheng('province');

    $('#province').on('change', function() {
        getShi('city', $(this).get(0).value);
    });

    $('#city').on('change', function() {
        getShop('dealer', $(this).get(0).value);
    });


		// submit
	var ajaxFlag = true;
	$('.page3-submit').click(function(){
		if(!ajaxFlag) return;
		var data = getData();
		console.log(data)
		if(data && ajaxFlag){
			ajaxFlag = false;
			$.ajax({
		            url:'common.php?act=subMessage',
		            type:'POST',
		            data:data,
		            dataType:'json',
		            success: function(res){
                        chongzhi();
		            	if( res.retCode == 1){
		            		ajaxFlag = true;
		            		alert(res.retInfo);
		            	}else{
		            		// ajaxFlag = true;
                            chongzhi();
		            		alert(res.retData.error);
		            	}
		            }
			 });
		}
	})

	// 重置
	$('.page3-re').click(chongzhi);

	function chongzhi(){

		$('#name').val('');
		$('.sex').attr('data-sex','1');
		$('img.man').attr('src','img/radio-tt.png');
		$('img.woman').attr('src','img/radio-ff.png')
		$('#phone').val('');
		$('#province option:first').prop('selected','selected');
		$('#city option:first').prop('selected','selected');
		$('#dealer option:first').prop('selected','selected');
		$('#dealer option:first').prop('selected','selected');
		$('#carType option:first').prop('selected','selected');
		$('#buyTime option:first').prop('selected','selected');
	}

	// 获取数据
    function getData() {
        var Data = {
            name: $('#name').val(),
            sex:$('.sex').attr('data-sex'),
            phone: $('#phone').val(),
            province: $('#province').get(0).value
        };
        var myreg = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
        Data.city = Data.province != '' ? $('#city').get(0).value : '';
        Data.dealer = Data.city != '' ? $('#dealer').get(0).value : '';
        Data.cartype = $('#carType').get(0).value;
        Data.cartime = $('#buyTime').get(0).value;
        Data.title = $('title').text();
        Data.url = window.location.href;
        // Data.d_user_city = $('#city1').get(0).value;
        Data.source = 'wap';
        Data.smart = '2348466';
        Data.campaign = '4995112258BDD2AEE0538305DF0A82AF';

        if (Data.name == '') {
            alert('请输入姓名！');
            return false;
        }
        if (!myreg.test(Data.phone)) {
            alert('请输入有效的手机号码！');
            return false;
        }
        if(Data.province == ''){
        	alert('请选择省份！')
        	return false;
        }
        if(Data.city == ''){
        	alert('请选择城市！')
        	return false;
        }
        if(Data.dealer == ''){
        	alert('请选择经销商！')
        	return false;
        }
        return Data;
    }

})()
