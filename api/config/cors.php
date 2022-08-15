<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],
    // 'allowed_methods' => ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],

    'allowed_origins' => ['*'],
    // 'allowed_origins' => ['localhost:*', '127.0.0.1:*'],
    // 'allowed_origins' => [
    //     'http://localhost:3000/', 
    //     'http://localhost:3000', 
    //     'localhost:3000/', 
    //     'localhost:3000', 
    //     'http://127.0.0.1:3000/',
    //     'http://127.0.0.1:3000',
    //     '127.0.0.1:3000/',
    //     '127.0.0.1:3000',
    //     'http://192.168.178.22:3000/',
    //     'http://192.168.178.22:3000',
    //     '192.168.178.22:3000/',
    //     '192.168.178.22:3000'
    // ],

    'allowed_origins_patterns' => ['*'],

    'allowed_headers' => ['*'],
    // 'allowed_headers' => ['Origin', 'X-Auth-Token', 'X-Requested-With', 'Content-Type', 'Accept', 'Key', 'Cookie', 'Authorization'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
