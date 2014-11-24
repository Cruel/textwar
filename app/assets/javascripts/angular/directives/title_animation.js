(function($){

    function animateBlockQuote(selector, callback) {
        var wait = 0;
        $(selector)
            .removeClass('hide')
            .children().each(function() {
                wait += $(this).data('delay');
                console.log(this);
                $(this).css('opacity', 0).delay(wait).animate({opacity: 1}, 1500);
            });
        $(selector).delay(wait + 4000).fadeOut(2000, callback);
    }

    function setRandomTextFont(selector){
        var font_array = [['bpdots',70], ['bpdotsminus',310], ['plexifont',840]],
            random_font = font_array[Math.floor(font_array.length * Math.random())];
        $(selector)
            .css('font-family', "'"+random_font[0]+"', serif")
            .css('stroke-dasharray', random_font[1]);
    }

    function runRandomTextAnimation(selector, callback) {
        var animation_array = [
            function () {
                $(selector)
                    .css('stroke-width', 13)
                    .css('stroke-dasharray', 0)
                    .animate({
                        'stroke-width': 0
                    }, 5000, function () {
                        $(this).delay(2000).animate({
                            'font-size': 0
                        }, 3000, callback);
                    });
            },
            function () {
                $(selector)
                    .css('stroke-width', 0.1)
                    .css('fill-opacity', 0)
                    .css('stroke-opacity', '1')
                    .css('stroke-dashoffset', $(selector).css('stroke-dasharray'))
                    .animate({
                        'stroke-dashoffset': 0
                    }, 4000, function () {
//                        $(this)
//                            .css('stroke-opacity', '0')
//                            .animate({
//                                'fill-opacity': 0.9
//                            }, 4000, function () {
//                                $(this).fadeOut(1000, callback);
//                            });
                    });
            }
        ];
//    animation_array[Math.floor(animation_array.length * Math.random())]();
        animation_array[1]();
    }

    app.directive('animateTitle', ['$timeout', function($timeout) {
        return function(scope, element, attrs) {
            scope.$watch(attrs.animateTitle, function() {
//                console.log(attrs);
                if (attrs.animateTitle == '' || scope[attrs.animateTitle]) {
                    $timeout(function(){
                        $('#title-wrapper').removeClass('hide');
                        setRandomTextFont('.title-svg-text');
//                        console.log(attrs);
//                        console.log(scope);
//                        element.show(300).delay(2000).hide(300, function(){
//                            alert('mmk');
//                        });
                        runRandomTextAnimation('.title-svg-text', function () {
                            if (scope.locationChanged !== true) {
                                $('#title-wrapper').addClass('hide');
                                alert('ok');
                            }
                        });
                    }, attrs.delay || 0);
                }
            });
        };
    }]);

    app.directive('animateQuote', ['$timeout', function($timeout) {
        return function(scope, element, attrs) {
            scope.$watch(attrs.animateQuote, function() {
                if (scope[attrs.animateQuote]) {
                    $timeout(function(){
                        animateBlockQuote('#introquote');
                    }, attrs.delay || 0);
                }
            });
        };
    }]);

})(jQuery);
