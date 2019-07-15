




    //ширина слайдера при загрузке
    $(document).ready(function(){

    	let sliders = $('.slider');

    	for(let i = 0; i < sliders.length; i ++){
    	    let slider = sliders[i];
            let sliderWidth = $(slider).closest('div').width();
            $(slider).find('.slides > li').css('width',sliderWidth+'px');

            //добавляем элементы управления горизонтальные
			if($(slider).hasClass('horizontal-arrows')){
                $(slider).prepend('<div class="slider-nav slider-prev bg-fix" data-scroll="-1"></div>');
                $(slider).prepend('<div class="slider-nav slider-next bg-fix" data-scroll="1"></div>');
			}


            //добавляем элементы управления вертикальные
            if($(slider).hasClass('vertical-arrows')){
                $(slider).prepend('<div class="slider-nav-vertical slider-up bg-fix" data-scroll="-1"></div>');
                $(slider).prepend('<div class="slider-nav-vertical slider-down bg-fix" data-scroll="1"></div>');
            }


            //добавление горизонатальных точек
            if($(slider).hasClass('horizontal-nav')){
                $(slider).prepend('<div class="control-nav-horizontal control-nav-container"></div>');
            }
            if($(slider).hasClass('vertical-nav')){
                $(slider).prepend('<div class="control-nav-vertical control-nav-container"></div>');
            }
            let slidesCount = $(slider).find('.slides > li').length;
            for(let j = 0; j <  slidesCount; j++){
                if($(slider).hasClass('horizontal-nav')){
                    $(slider).find('.control-nav-horizontal').append('<div class="control-nav-element" data-num="'+ (j+1) +'">.</div>');
                }
                if($(slider).hasClass('vertical-nav')){
                    $(slider).find('.control-nav-vertical').append('<div class="control-nav-element" data-num="'+ (j+1) +'">.</div>');
                }
            }



        }
        $('.control-nav-container').find('.control-nav-element:first-child').addClass('control-nav-element-active');


    });

    //Изменение ширины слайдер при ресайзе окна
    $(window).resize(function(){
        let sliders = $('.slider');

        for(let i = 0; i < sliders.length; i ++) {
            let slider = sliders[i];
            let sliderWidth = $(slider).closest('div').width();
            $(slider).find('.slides > li').css('width', sliderWidth + 'px');
        }


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
        if(canScroll === 1) {
            //запрещаем прокрутку пока не закончится прошлая
            canScroll = 0;

            //определяем текущий слайдер что работаем именно в нем
            let slider = $(this).closest('.slider');

            //делаем все точки внутри неактивными
            $(slider).find('.control-nav-element').removeClass('control-nav-element-active');

            //получаем номер точки на которую нажали(соответствует номеру слайда)
            let num = $(this).attr('data-num');

			//определяем все точки внутри слайдера
            let all_dots = $(slider).find('.control-nav-element');
            //для всех точек внутри контейнера точек
            for(let i = 0; i < all_dots.length; i++){
                //если аттрибут точки равен номеру тыкнутой точки то даем класс актив
                if(all_dots[i].getAttribute('data-num') === num){
                    $(all_dots[i]).addClass('control-nav-element-active');
                }
            }

            //Если точка на которую кликнули лежит горизонтально крутим по горизонтали иначе по вертикали
            if($(this).closest('.control-nav-container').css('flex-direction') === 'row'){
                //получаем ширину слайда
                let deltaOffset = parseInt($(this).closest('.slider').css('width'));
                //Делаем слайды внутри тьекущего слайдера вряд
                $(slider).find('.slides').css('display','flex');
                //Крутим на величину  (ширина на номер точки/слайда минус 1)
                $(slider).find('.slides').animate({scrollLeft : deltaOffset*(num-1) }, slideSpeed);
            }else{
            	//Получаем высоту слайдера
                let deltaOffset = parseInt($(slider).css('height'));
                //Придаем всем слайдам высоту слайдера
                $(slider).find('.slides').css('height',deltaOffset+'px');
                //Отображаем слайды один под другим
                $(slider).find('.slides').css('display','block');
                //Крутим на величину  (ширина на номер точки/слайда минус 1)
                $(slider).find('.slides').animate({scrollTop : deltaOffset*(num-1) }, slideSpeed);
            }

            //снова разрешаем прокрутку
            setTimeout(function(){canScroll = 1;},slideSpeed);

        }


    });



    //клик на стрелку  горизонтальную
	$('body').on('click','.slider-nav',function(){
			if(canScroll === 1){
				canScroll = 0;

                //определяем текущий слайдер что работаем именно в нем
                let slider = $(this).closest('.slider');

				//делаем слайды в строчку
				$(slider).find('.slides').css('display','flex');
				//определяем текущую величину прокрутки
				let currOffset = Math.ceil($(slider).find('.slides').scrollLeft());
				//Определяем ширину слайда (на сколько куртить)
				let deltaOffset = parseInt($(slider).css('width'));
				//определяем количество слайдов
				let slidesCount = $(slider).find('.slides > li').length;


				//Направление прокрутки
				if($(this).attr('data-scroll') === '-1'){
					deltaOffset = - deltaOffset;
				}

				//крутим
				if(Math.ceil(currOffset + deltaOffset) <= 0){
                    //если достигли начала ленты то дальше не едем влево
                    $(slider).find('.slides').animate({scrollLeft : 0}, slideSpeed);
				}else if(currOffset + deltaOffset >= slidesCount*Math.abs(deltaOffset)){
					//если достигли конца ленты -листаем в начало
                    $(slider).find('.slides').animate({scrollLeft : 0}, slideSpeed);
				}else{
                    //иначе крутим либо вперед либо назад
                    $(slider).find('.slides').animate({scrollLeft : currOffset + deltaOffset}, slideSpeed);
				}
				setTimeout(function(){canScroll = 1;},slideSpeed);


				//переключаем точки
				//получаем номер точки которая сейчас активна
				let curr_slide_num = $(slider).find('.control-nav-element-active').attr('data-num');
				//определяем номер следуешего слайда
				let next_slide_num = parseInt(curr_slide_num) + parseInt($(this).attr('data-scroll'));
				//удаляем у всех точек активность
                $(slider).find('.control-nav-element').removeClass('control-nav-element-active');
                //получаем все точки
                let all_dots = $(slider).find('.control-nav-element');
                for(let i = 0; i < all_dots.length; i++){
                    if(next_slide_num <= 0){
                        //если достигли начала делаем первые точки активными и все
                        $(slider).find('.control-nav-container').find('.control-nav-element:first-child').addClass('control-nav-element-active');
                    }else if(next_slide_num > slidesCount){
                        //если достигли конца ленты делаем первые точки активными и все
                        $(slider).find('.control-nav-container').find('.control-nav-element:first-child').addClass('control-nav-element-active');
                    }else{
                        //если аттрибут точки равен номеру слайда то делаем ее активной
                        if(all_dots[i].getAttribute('data-num') == next_slide_num){
                            $(all_dots[i]).addClass('control-nav-element-active');
                        }
                    }
                }

			}
    });



	//Для вертикального


	//клик на стрелку вертикальную
    $('body').on('click','.slider-nav-vertical',function(){
		if(canScroll === 1){
			canScroll = 0;

            //определяем текущий слайдер что работаем именно в нем
            let slider = $(this).closest('.slider');

            //определяем высоту слайдера
			let windowHeight = $(slider).height();
			//
			$(slider).find('.slides').css('height',windowHeight+'px');
			//делаем слайды один под другим
            $(slider).find('.slides').css('display','block');

            //определяем величину текущей прокрутки
            let currOffset = Math.ceil($(slider).find('.slides').scrollTop());
			//Определяем высоту слайда (на сколько куртить)
			let deltaOffset = parseInt($(slider).css('height'));
            //определяем количество слайдов
            let slidesCount = $(slider).find('.slides > li').length;

			//Направление прокрутки
			if($(this).attr('data-scroll') == '-1'){
				deltaOffset = -deltaOffset;
			}

			//Крутим
			if(Math.ceil(currOffset + deltaOffset) <= 0){
                //если достигли начала ленты то дальше не едем вверх
                $(slider).find('.slides').animate({scrollTop : 0}, slideSpeed);
            }else if(currOffset + deltaOffset >= slidesCount*Math.abs(deltaOffset)){
                //если достигли конца ленты -листаем в начало
                $(slider).find('.slides').animate({scrollTop : 0}, slideSpeed);
            }else{
                //иначе крутим либо вперед либо назад
                $(slider).find('.slides').animate({scrollTop : currOffset + deltaOffset}, slideSpeed);
            }
			setTimeout(function(){canScroll = 1;},slideSpeed);



            //переключаем точки
            //получаем номер точки которая сейчас активна
            let curr_slide_num = $(slider).find('.control-nav-element-active').attr('data-num');
            //определяем номер следуешего слайда
            let next_slide_num = parseInt(curr_slide_num) + parseInt($(this).attr('data-scroll'));
            //удаляем у всех точек активность
            $(slider).find('.control-nav-element').removeClass('control-nav-element-active');
            //получаем все точки
            let all_dots = $(slider).find('.control-nav-element');
            for(let i = 0; i < all_dots.length; i++){
                if(next_slide_num <= 0){
                    //если достигли начала делаем первые точки активными и все
                    $(slider).find('.control-nav-container').find('.control-nav-element:first-child').addClass('control-nav-element-active');
                }else if(next_slide_num > slidesCount){
                    //если достигли конца ленты делаем первые точки активными и все
                    $(slider).find('.control-nav-container').find('.control-nav-element:first-child').addClass('control-nav-element-active');
                }else{
                    //если аттрибут точки равен номеру слайда то делаем ее активной
                    if(all_dots[i].getAttribute('data-num') == next_slide_num){
                        $(all_dots[i]).addClass('control-nav-element-active');
                    }
                }
            }
		}

    });








