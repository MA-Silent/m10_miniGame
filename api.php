<?php

$method = $_SERVER['REQUEST_METHOD'];

$connection = new mysqli('127.0.0.1', 'root', 'password', 'api');

if($connection->connect_error){
    die("Connection failed: $connection->connect_error");
}

switch ($method) {
    case "POST":
        echo handlePost();
        break;
};

function handlePost() {
    $body = json_decode(file_get_contents('php://input'));

    if( isset($body->gameId) && isset($body->xScore) && isset($body->yScore) ) {



        return $body->gameId;
    }

    return null;
}
