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
    console.log('UI_EVENT:');
    console.log(obj);
    switch(obj.type){
        case 'char':
        case 'line':
            if (obj.value == 'test') {
                alert('BLAM!');
                return false;
            }
//            alert(obj.value);
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
        console.log('UPDATE:');
        console.log(x);
        if (x.content[1]) {
            var lines = x.content[1].text;
            for (var i = lines.length-1; i >= 0; i--){
                if (lines[i].content) {
                    var text = lines[i].content[1];
                    if (text.indexOf('An Interactive Fiction') > -1 || text.indexOf('Inform 7 build') > -1){
                        x.content[1].text.splice(i,1);
//                        break;
                    }
                    else if (lines[i].content[1] == 'inv') {
                        x.content[1].text = [];
                        break;
                    }
                }
            }

            return true;
            for (var i in lines) {
                if (lines[i].content) {
                    var text = lines[i].content[1];
                    if (text.indexOf('An Interactive Fiction') > -1 || text.indexOf('Inform 7 build') > -1){
                        x.content[1].text[i] = [];
//                        break;
                    }
                    else if (lines[i].content[1] == 'inv') {
                        x.content[1].text = [];
                        break;
                    }
                }
            }
        }
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
    console.log($('#title-wrapper text')[0]);

    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // left
            case 38: // up
            case 39: // right
            case 40: // down
                $('.Input').focus();
        }
        return;
    });
    $(document).foundation();
});

})(jQuery);