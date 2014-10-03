(function($){

function setRandomTextFont(selector){
    var font_array = [['bpdots',70], ['bpdotsminus',310], ['plexifont',840]],
        random_font = font_array[Math.floor(font_array.length * Math.random())];
    $(selector)
        .css('font-family', "'"+random_font[0]+"', serif")
        .css('stroke-dasharray', random_font[1]);
}

function runRandomTextAnimation(selector, callback){
    var animation_array = [
        function(){
            $(selector)
                .css('stroke-width', 13)
                .css('stroke-dasharray', 0)
                .animate({
                    'stroke-width': 0
                }, 5000, function(){
                    $(this).delay(2000).animate({
                        'font-size': 0
                    }, 3000, callback);
                });
        },
        function(){
            $(selector)
                .css('stroke-width', 0.1)
                .css('fill-opacity', 0)
                .css('stroke-opacity', '1')
                .css('stroke-dashoffset', $(selector).css('stroke-dasharray'))
                .animate({
                    'stroke-dashoffset': 0
                }, 4000, function(){
                    $(this)
                        .css('stroke-opacity', '0')
                        .animate({
                            'fill-opacity': 0.9
                        }, 4000, function(){
                            $(this).fadeOut(1000, callback);
                        });
                });
        }
    ];
//    animation_array[Math.floor(animation_array.length * Math.random())]();
    animation_array[1]();
}

function animateBlockQuote(selector, callback){
    var wait = 0;
    $(selector)
        .removeClass('hide')
        .children().each(function(){
            wait += $(this).data('delay');
            console.log(this);
            $(this).css('opacity',0).delay(wait).animate({opacity:1}, 1500);
        });
    $(selector).delay(wait+4000).fadeOut(2000, callback);
}

function testy(){
    animateBlockQuote('#introquote');
}

function wrapBefore(func, before_func){
    return function(x){
        if (!before_func(x))
            return;
        func(x);
    };
}

function intercept_ui_event(obj){
    console.log(obj);
    switch(obj.type){
        case 'char':
        case 'line':
            alert(obj.value);
//            return false;
            break;
    }
    return true;
};

function resetGame(){
    window.Glk = window.newGlk();
    window.GlkOte = window.newGlkOte();
    window.Quixe = window.newQuixe();
    window.GlkOte.update = wrapBefore(window.GlkOte.update, function(x){
        console.log(x);
        return true;
    });
}

window.loadGame = function(glulx_base64){
    resetGame();
    GiLoad.load_run(null, glulx_base64, 'base64');
    GlkOte.getinterface().accept = wrapBefore(GlkOte.getinterface().accept, intercept_ui_event);
};

$(function(){
    var loadTime = $.now() - loadStartTime;
    setTimeout(function(){
        $('.loading').fadeOut(1000, function(){
            $('#title-wrapper').removeClass('hide');
            setRandomTextFont('.title-svg-text');
            runRandomTextAnimation('.title-svg-text', function(){
//                alert('ok');
            });
        });
    }, Math.max(0, 2000-loadTime));

    $(document).foundation();
});

})(jQuery);