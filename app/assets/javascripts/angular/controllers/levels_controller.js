app.controller('LevelsController', ['$scope', 'Level', '$routeParams', 'Auth', '$controller', function($scope, Level, $routeParams, Auth, $controller) {
    $controller('BaseController', {$scope: $scope});

    // Check if route passed an id for show.html
    if ($routeParams.id) {
        $scope.level = Level.get($routeParams.id);
        $scope.level.$promise.then(function(data){
            console.log(data);
            jQuery.get('/if/levels/'+data.filename, function(glulx_base64){
                window.loadGame(glulx_base64);
            });
        });
    }
    // Otherwise must be index
    else {
        $scope.levels = Level.all();
    }

}]);