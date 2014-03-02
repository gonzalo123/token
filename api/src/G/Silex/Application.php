<?php

namespace G\Silex;

use Silex\Application as SilexApplication;
use G\Silex\Provider\Login\LoginBuilder;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Application extends SilexApplication
{
    public function __construct(array $values = [])
    {
        parent::__construct($values);

        LoginBuilder::mountRouteIntoApplication('/auth', $this);

        $this->after(function (Request $request, Response $response) {
            $response->headers->set('Access-Control-Allow-Origin', '*');
        });
    }
}