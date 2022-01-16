$(document).ready(function(){
    fullPageEvent();
    
});
function fullPageEvent(){
    if($('.mainPage').length == 1){
        $('body').css('overflow','hidden');
    }
    let fullSelector = $('.mainPage .mainArea > * , footer');
    let fullIdx = 0;

    setTimeout(function(){
        fullIdx = fullIdxCur(fullSelector);
        menuDecision(fullIdx)
    },100)

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let touchX = 0;
    let touchY = 0;

    fullSelector.on('touchstart',function(e){
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
    });
    
    fullSelector.on('mousewheel touchend',function(e){
        let wheelDelta = 0;
        if(e.type == 'mousewheel'){
            wheelDelta = e.originalEvent.wheelDelta;
        }else if(e.type == 'touchend'){
            touchEndX = e.changedTouches[0].clientX;
            touchEndY = e.changedTouches[0].clientY;

            touchX = touchStartX - touchEndX;
            touchY = touchStartY - touchEndY;

            if(Math.abs(touchY) > Math.abs(touchX)){
                if(touchStartY - touchEndY > 0){
                    wheelDelta = -120;
                }else{
                    wheelDelta = 120;
                }
            }
        }

        if(!$('html').is(':animated')){
            if(0 <= fullIdx && fullIdx < fullSelector.length){
                if(wheelDelta > 0 && fullIdx != 0){
                    fullIdx--;
                }else if(wheelDelta < 0 && fullIdx < fullSelector.length -1){
                    fullIdx++;
                }
            }
            let topValue =  fullSelector.eq(fullIdx).offset().top;
            $('html').stop().animate({scrollTop : topValue}, 800 , 'linear');

            menuDecision(fullIdx)
        }
    })
    
    function fullIdxCur(fullSelector){
        var fullCurrent = $(window).scrollTop() / $(window).height();
        if(fullCurrent < fullSelector.length - 2){
            fullCurrent = Math.floor(fullCurrent);
        }else{
            fullCurrent = Math.ceil(fullCurrent);
        }
        return fullCurrent;
    }

    function menuDecision(fullIdx){
        if(fullSelector.eq(fullIdx).attr('data-menu') == 'white'){
            $('header').addClass('whiteCase');
        }else{
            $('header').removeClass('whiteCase');
        }
    }
}
