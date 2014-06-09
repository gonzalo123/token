'use strict';
var appControllers, G;
var host = 'http://localhost:8080'; // server API url

appControllers = angular.module('appControllers', []);
G = angular.module('G', ['ngRoute', 'appControllers']);

G.run(function (httpG) {
    httpG.setHost(host);
});

G.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/login', {templateUrl: 'partials/login.html', controller: 'LoginController'}).
        when('/home', {templateUrl: 'partials/home.html', controller: 'HomeController'});
}]);

appControllers.controller('HomeController', ['$scope', 'httpG', '$location', function ($scope, httpG, $location) {
    $scope.hello = function () {
        httpG.get('/api/info').success(function (data) {
            if (data.status) {
                alert("Hello " + data.info.name + " " + data.info.surname);
            }
        });
    };

    $scope.logOut = function () {
        alert("Good bye!");
        httpG.removeToken();
        $scope.isAuthenticated = false;
        $location.path('login');
    };
}]);

appControllers.controller('MainController', ['$scope', '$location', 'httpG', function ($scope, $location, httpG) {
    $scope.isAuthenticated = false;

    if (httpG.getToken()) {
        $scope.isAuthenticated = true;
        $location.path('home');
    } else {
        $location.path('login');
    }
}]);


appControllers.controller('LoginController', ['$scope', '$location', 'httpG', function ($scope, $location, httpG) {
    $scope.user = {};

    $scope.doLogIn = function () {
        httpG.get('/auth/validateCredentials', {user: $scope.user.username, pass: $scope.user.password}).success(function (data) {
            if (data.status) {
                httpG.setToken(data.info.token);
                $scope.isAuthenticated = true;
                $location.path('home');
            } else {
                alert("login error");
            }
        }).error(function (error) {
            alert("Login Error!");
        });
    };

    $scope.doLogOut = function () {
        httpG.removeToken();
    };
}]);