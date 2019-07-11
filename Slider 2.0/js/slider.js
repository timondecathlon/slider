	
    
	   
	 
	
    //ширина слайдера при загрузке
    $(document).ready(function(){
		let sliderWidth = $(window).width();
        $('.slider > .slides > li').css('width',sliderWidth+'px');





		//добавляем элементы управления горизонтальные
		$('.slider').prepend('<div class="slider-nav slider-prev bg-fix" data-scroll="-1"></div>');
		$('.slider').prepend('<div class="slider-nav slider-next bg-fix" data-scroll="1"></div>');
		

		//добавляем элементы управления вертикальные
		$('.slider').prepend('<div class="slider-nav-vertical slider-up bg-fix" data-scroll="-1"></div>');
		$('.slider').prepend('<div class="slider-nav-vertical slider-down bg-fix" data-scroll="1"></div>');


		//добавление горизонатальных точек
        $('.slider').prepend('<div class="control-nav-horizontal control-nav-container"></div>');
        $('.slider').prepend('<div class="control-nav-vertical control-nav-container"></div>');
        let slidesCount = $('.slides > li').length;
        for(let i = 0; i <  slidesCount; i++){
            $('.control-nav-horizontal').append('<div class="control-nav-element" data-num="'+ (i+1) +'">.</div>');
            $('.control-nav-vertical').append('<div class="control-nav-element" data-num="'+ (i+1) +'">.</div>');
        }

        $('.control-nav-container').find('.control-nav-element:first-child').addClass('control-nav-element-active');


		//добавление вертикальных точек


    }); 

    //Изменение ширины слайдер при ресайзе окна
    $(window).resize(function(){    
        let sliderWidth = $(window).width();
        $('.slider > .slides > li').css('width',sliderWidth+'px');
    }); 

    //клик на стрелку вправо   
	
	var canScroll = 1;
	var slideSpeed = 1000;
	
	/*работает норм
	setInterval(function(){
       	
		if(canScroll == 1){
				canScroll = 0;
				$('.slides').css('display','flex');
				//вот эта фигня давала дробные значения ее надо сразу было сейлить поэтом слайд третий и плоховал))
				let currOffset = Math.ceil($('.slider').scrollLeft());
				//Определяем ширину слайда
				let deltaOffset = parseInt($('.slider-container').find('.slider').css('width'));
				//определяем количество слайдов
				let slidesCount = $('.slides > li').length;

				//Направление прокрутки
				if($(this).attr('data-scroll') == '-1'){
					deltaOffset = - deltaOffset;	
				}
				
				//крутим
				if(Math.ceil(currOffset + deltaOffset) <= 0){
					$('.slider').animate({scrollLeft : 0}, slideSpeed);
				}else if(currOffset + deltaOffset >= slidesCount*Math.abs(deltaOffset)){
					$('.slider').animate({scrollLeft : 0}, slideSpeed);  
				}else{
					$('.slider').animate({scrollLeft : currOffset + deltaOffset}, slideSpeed);       
				} 
				setTimeout(function(){canScroll = 1;},slideSpeed);
		}
    },3000);
	*/

	//Клик по точкам вертикального и горизонтального
    $('body').on('click','.control-nav-element',function(){
        let num = $(this).attr('data-num');
    	$('.control-nav-element').removeClass('control-nav-element-active');
    	let all_dots = $('.control-nav-element');
    	for(let i = 0; i < all_dots.length; i++){
    		if(all_dots[i].getAttribute('data-num') === num){
                $(all_dots[i]).addClass('control-nav-element-active');
			}
		}
		if($(this).closest('.control-nav-container').css('display') === 'flex'){
            $('.slides').css('display','flex');
            let deltaOffset = parseInt($(this).closest('.slider').css('width'));
            $('.slides').animate({scrollLeft : deltaOffset*(num-1) }, slideSpeed);
		}else{
            let windowHeight = $('.slider').height();
            $('.slides').css('height',windowHeight+'px');
            let deltaOffset = parseInt($(this).closest('.slider').css('height'));
            $('.slides').css('display','block');
            $('.slides').animate({scrollTop : deltaOffset*(num-1) }, slideSpeed);
		}

    });



    //клик на стрелку  горизонтальную
	$('body').on('click','.slider-nav',function(){
			if(canScroll === 1){
				canScroll = 0;
				$('.slides').css('display','flex');
				//вот эта фигня давала дробные значения ее надо сразу было сейлить поэтом слайд третий и плоховал))
				let currOffset = Math.ceil($('.slides').scrollLeft());
				//Определяем ширину слайда
				let deltaOffset = parseInt($(this).closest('.slider').css('width'));
				//определяем количество слайдов
				let slidesCount = $('.slides > li').length;


				//Направление прокрутки
				if($(this).attr('data-scroll') === '-1'){
					deltaOffset = - deltaOffset;

				}
				
				//крутим
				if(Math.ceil(currOffset + deltaOffset) <= 0){
					$('.slides').animate({scrollLeft : 0}, slideSpeed);
				}else if(currOffset + deltaOffset >= slidesCount*Math.abs(deltaOffset)){
					$('.slides').animate({scrollLeft : 0}, slideSpeed);
				}else{
					$('.slides').animate({scrollLeft : currOffset + deltaOffset}, slideSpeed);
				} 
				setTimeout(function(){canScroll = 1;},slideSpeed);


				//переключаем точки
				let curr_slide_num = $('.control-nav-element-active').attr('data-num');
				let next_slide_num = parseInt(curr_slide_num) + parseInt($(this).attr('data-scroll'));
				//alert(curr_slide_num);
				//alert(next_slide_num);
                $('.control-nav-element').removeClass('control-nav-element-active');
                let all_dots = $('.control-nav-element');
                for(let i = 0; i < all_dots.length; i++){
                    if(all_dots[i].getAttribute('data-num') == next_slide_num){
                        $(all_dots[i]).addClass('control-nav-element-active');
                    }
                }

			}	
    });
	


	//Для вертикального
	
	
	//клик на стрелку вертикальную
    $('body').on('click','.slider-nav-vertical',function(){
		if(canScroll == 1){
			canScroll = 0;
			let windowHeight = $('.slider').height();
			$('.slides').css('height',windowHeight+'px');
			$('.slides').css('display','block');
			
            //вот эта фигня давала дробные значения ее надо сразу было сейлить поэтом слайд третий и плоховал))
            let currOffset = Math.ceil($('.slides').scrollTop());
			//Определяем ширину слайда
			let deltaOffset = parseInt($(this).closest('.slider').css('height'));
            //определяем количество слайдов
            let slidesCount = $('.slides > li').length;  

			//Направление прокрутки
			if($(this).attr('data-scroll') == '-1'){
				deltaOffset = -deltaOffset;	
			}

			//Крутим 
			if(Math.ceil(currOffset + deltaOffset) <= 0){
                $('.slides').animate({scrollTop : 0}, slideSpeed);
            }else if(currOffset + deltaOffset >= slidesCount*Math.abs(deltaOffset)){
                $('.slides').animate({scrollTop : 0}, slideSpeed);
            }else{
                $('.slides').animate({scrollTop : currOffset + deltaOffset}, slideSpeed);
            } 
			setTimeout(function(){canScroll = 1;},slideSpeed);



            //переключаем точки
            let curr_slide_num = $('.control-nav-element-active').attr('data-num');
            let next_slide_num = parseInt(curr_slide_num) + parseInt($(this).attr('data-scroll'));
            //alert(curr_slide_num);
            //alert(next_slide_num);
            $('.control-nav-element').removeClass('control-nav-element-active');
            let all_dots = $('.control-nav-element');
            for(let i = 0; i < all_dots.length; i++){
                if(all_dots[i].getAttribute('data-num') == next_slide_num){
                    $(all_dots[i]).addClass('control-nav-element-active');
                }
            }
		}
			
    });





	
	
	
	    