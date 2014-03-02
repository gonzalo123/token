<?php

namespace G\Silex\Provider\Login;

use Silex\Application;

class LoginBuilder
{
    public static function mountRouteIntoApplication($route, Application $app)
    {
        $app->register(new LoginServiceProvider());
        $app->mount($route, (new LoginControllerProvider())->setBaseRoute($route));
    }
}