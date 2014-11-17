(function($) {

    app.controller('IntroController', ['$scope', 'Auth', '$controller', function ($scope, Auth, $controller) {

        $scope.afterLoad = function(){
            console.log('afterload');
            jQuery('.testy').click(function(){
                var e = jQuery.Event('keypress');
                e.which = 13; // Enter
                jQuery('.Input').val('inv').trigger(e);
            });
        };

        jQuery.get('/if/intro.txt', function(glulx_base64){
            window.loadGame(glulx_base64);
        });

        $controller('BaseController', {$scope: $scope});

    }]);

})(jQuery);