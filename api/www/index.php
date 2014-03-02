<?php

include __DIR__ . '/../vendor/autoload.php';

use G\Silex\Application;

$app = new Application();

$app->get('/api/info', function (Application $app) {
    return $app->json([
        'status' => true,
        'info'   => [
            'name'    => 'Gonzalo',
            'surname' => 'Ayuso'
        ]]);
});

$app->run();