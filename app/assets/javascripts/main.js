var app = angular.module("textwar", ['ngResource','ngRoute','templates']);

app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    console.log($routeProvider);
    $routeProvider.
//        when('/', {templateUrl: 'index.html'}).
//        when('/new', {templateUrl: 'new.html'}).
//        when('/image/:id', {templateUrl: 'show.html', controller:'ImagesCtrl'}).
        otherwise({redirectTo: '/'});
}]);

$(function(){
    $(document).foundation();
});
