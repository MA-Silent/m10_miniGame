<?php

$method = $_SERVER['REQUEST_METHOD'];

$connection = new mysqli('127.0.0.1', 'root', 'password', 'api');

if($connection->connect_error){
    die("Connection failed: $connection->connect_error");
}


switch ($method) {
    case "POST":
        echo var_dump(handlePost());
        break;
};

function handlePost() {
    global $connection;
    $body = json_decode(file_get_contents('php://input'));


    if( isset($body->gameId) && isset($body->xScore) && isset($body->yScore) ) {
        checkTable($connection);
    }

    return null;
}

function checkTable(mysqli $connection): bool|mysqli_result {
    $tables = $connection->query("SHOW TABLES LIKE 'scores'");

    if($tables->num_rows == 0){
        $createTableSql = "CREATE TABLE scores ( gameId CHAR(36) NOT NULL, xScore INT NOT NULL, yScore INT NOT NULL, PRIMARY KEY (gameId))";
    }

    if($connection->query($createTableSql) === TRUE){
        echo "table created";
    } else {
        echo "failed to create table: $connection->error";
    }

    return $connection->query("SHOW TABLES LIKE 'scores'");
}
