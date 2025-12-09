<?php

$method = $_SERVER['REQUEST_METHOD'];

$connection = new mysqli('127.0.0.1', 'root', 'password', 'api');

$allowed_tables = ['api'];

if($connection->connect_error){
    die("Connection failed: $connection->connect_error");
}


switch ($method) {
    case "POST":
        echo handlePost();
        break;
    case "GET":
        echo handleGET($connection);
};

function handlePost() {
    $body = json_decode(file_get_contents('php://input'));

    if( isset($body->gameId) && isset($body->xScore) && isset($body->yScore) ) {
        return upsert(gameId: $body->gameId, xScore: $body->xScore, yScore: $body->yScore);
    }

    return null;
}

function checkTable(mysqli $connection, string $table): bool {
    global $allowed_tables;
    if(!in_array($table, $allowed_tables, true)){
        throw new Exception("Invalid table name");
    }

    $tables = $connection->query("SHOW TABLES IN `". $table ."` ");

    if($tables->num_rows == 0){
        $createTableSql = "CREATE TABLE scores ( gameId CHAR(36) NOT NULL, xScore INT NOT NULL, yScore INT NOT NULL, PRIMARY KEY (gameId))";

        if($connection->query($createTableSql) === TRUE){
            echo "table created";
        } else {
            echo "failed to create table: $connection->error";
        }
    }

    if(!($tables->field_count <= 0)){
        return true;
    }

    return false;
}

function upsert(string $gameId, int $xScore, int $yScore ){
    global $connection;
    if(checkTable($connection, 'api')){
        $result = $connection->query('SHOW TABLES IN api');
        $tables = $result->fetch_all();
        $table = $tables[0][0];

        function uniqueRows(string $table, string $gameId){
            global $connection;
            $stmt = $connection->prepare("SELECT * FROM `$table` WHERE `gameId` = ?");
            $stmt->bind_param("s", $gameId);
            $stmt->execute();
            return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        }

        $rows = uniqueRows($table, $gameId);

        if(!count($rows) <= 0){
            $prepared = $connection->prepare("UPDATE `scores` SET `xScore` = ?, `yScore` = ? WHERE `scores`.`gameId` = ? ");
            $prepared->bind_param("iis", $xScore, $yScore, $gameId);
            $prepared->execute();

            $rows = uniqueRows($table, $gameId);

            return json_encode($rows);
        } else {
            $prepare = $connection->prepare("INSERT INTO `scores` (`gameId`, `xScore`, `yScore`) VALUES (?, ?, ?)");
            $prepare->bind_param("sii", $gameId, $xScore, $yScore);
            $prepare->execute();

            return json_encode(uniqueRows($table, $gameId));
        }
    }

    return null;
}

function handleGET(mysqli $connection): string {

    $gameId = $_GET['gameid'];

    if(isset($gameId)){

        $prepare = $connection->prepare('SELECT * FROM `scores` WHERE `gameId` = ?');
        $prepare->bind_param("s", $gameId);
        $prepare->execute();

        return json_encode($prepare->get_result()->fetch_all(MYSQLI_ASSOC));
    }

    if(checkTable($connection, 'api')){
        $result = $connection->query('SHOW TABLES IN api');
        $tables = $result->fetch_all();
        $table = $tables[0][0];

        $rows = $connection->query("select * from ".$table)->fetch_all(MYSQLI_ASSOC);

        return json_encode($rows);
    }

    return null;
}
