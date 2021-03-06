(function($){

app.controller('BaseController', ['$scope','$modal','Auth','$http','$timeout', function($scope,$modal,Auth,$http,$timeout) {
    $scope.loaded = false;

    $scope.logout = function(){
        Auth.logout();
    };
    $scope.login = function(required, callback){
        $scope.modalInstance = $modal.open({
            templateUrl: 'modals/login.html',
            controller: LoginModalController,
            windowClass: 'login-modal'
        });
        $scope.modalInstance.result.then(function(msg) {
//            console.log('modalInstance.result.then()');
            if (msg == 'cancel') return;
            Auth.currentUser().then(function(user) {
                if (callback)
                    callback(user);
            }, function(error) {
                $scope.login(required, callback);
                console.log('auth failed: '+error);
            });
        }, function(message) {
//            console.log(message);
            if (required)
                $scope.login(true);
        });
    };
    $scope.$on('$locationChangeSuccess', function(){
        $scope.locationChanged = true;
        // TODO: fix double-closing error
        if ($scope.modalInstance)
            $scope.modalInstance.close('cancel');
        if ($scope.onLocationChange)
            $scope.onLocationChange();
    });
    $scope.$on('devise:unauthorized', function(event, xhr, deferred) {
        $scope.login(true, function(user){
            $http(xhr.config).then(function(response){
                deferred.resolve(response);
            });
        });
    });

    var loadTime = $.now() - loadStartTime;
    $timeout(function(){
        $('.loading').fadeOut(1000, function(){
            $scope.loaded = true;
            $scope.$apply();
            if ($scope.afterLoad)
                $scope.afterLoad();
        });
    }, Math.max(0, 1500-loadTime));

}]);

})(jQuery);
