(function($){





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
//    return;
//    var loadTime = $.now() - loadStartTime;
//    setTimeout(function(){
//        jQuery('.loading').fadeOut(1000, function(){
//            jQuery('#title-wrapper').removeClass('hide');
//            setRandomTextFont('.title-svg-text');
//            runRandomTextAnimation('.title-svg-text', function(){
////                alert('ok');
//            });
//        });
//    }, Math.max(0, 2000-loadTime));

    $(document).foundation();
});

})(jQuery);