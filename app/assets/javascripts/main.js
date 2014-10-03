var app = angular.module("textwar", ['Devise','ngResource','ngRoute','templates','mm.foundation']);

app.config(['$routeProvider','$locationProvider','AuthProvider',function($routeProvider, $locationProvider, AuthProvider) {
    $routeProvider.
        when('/', {templateUrl: 'index.html'}).
        when('/help', {templateUrl: 'help.html', controller:'BaseController'}).
        when('/levels', {templateUrl: 'levels/index.html', controller:'LevelsController'}).
        when('/level/:id', {templateUrl: 'levels/show.html', controller:'LevelsController'}).
        otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);

    AuthProvider.loginPath('/auth/sign_in.json');
    AuthProvider.logoutPath('/auth/sign_out.json');
    AuthProvider.registerPath('/auth/register.json');
}]);
