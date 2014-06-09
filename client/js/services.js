'use strict';

G.factory('httpG', ['$http', '$window', function ($http, $window) {
    var serviceToken, serviceHost, tokenKey;
    tokenKey = 'token';
    if (localStorage.getItem(tokenKey)) {
        serviceToken = $window.localStorage.getItem(tokenKey);
    }

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    return {
        setHost: function (host) {
            serviceHost = host;
        },

        setToken: function (token) {
            serviceToken = token;
            $window.localStorage.setItem(tokenKey, token);
        },

        getToken: function () {
            return serviceToken;
        },

        removeToken: function() {
            serviceToken = undefined;
            $window.localStorage.removeItem(tokenKey);
        },

        get: function (uri, params) {
            params = params || {};
            params['_token'] = serviceToken;
            return $http.get(serviceHost + uri, {params: params});
        },

        post: function (uri, params) {
            params = params || {};
            params['_token'] = serviceToken;

            return $http.post(serviceHost + uri, params);
        }
    };
}]);
