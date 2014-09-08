function setRandomTextFont(selector){
    var font_array = [['bpdots',140], ['bpdotsminus',640], ['plexifont',1790]],
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

$(function(){
    var loadTime = $.now() - loadStartTime;
    setTimeout(function(){
        $('.loading').fadeOut(1000, function(){
            $('#title-wrapper').removeClass('hide');
            setRandomTextFont('.title-svg-text');
            runRandomTextAnimation('.title-svg-text', function(){
                alert('ok');
            });
        });
    }, Math.max(0, 2000-loadTime));
});
