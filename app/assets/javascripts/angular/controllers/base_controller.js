(function($){

app.controller('BaseController', ['$scope','$modal','Auth','$http','$timeout', function($scope,$modal,Auth,$http,$timeout) {

    $scope.logout = function(){
        Auth.logout();
    };
    $scope.login = function(required, callback){
        $scope.modalInstance = $modal.open({
            templateUrl: 'modals/login.html',
            controller: LoginModalController,
            windowClass: 'login-modal'
        });
        $scope.modalInstance.result.then(function() {
//            console.log('modalInstance.result.then()');
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
        // TODO: fix double-closing error
        if ($scope.modalInstance)
            $scope.modalInstance.close();
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
            if ($scope.afterLoad)
                $scope.afterLoad();
        });
    }, Math.max(0, 1500-loadTime));

}]);

})(jQuery);
