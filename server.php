<?php
$_FILES = json_decode( file_get_contents("php://input"), true ); //Декод json
echo var_dump($_POST);