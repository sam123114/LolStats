<?php
    session_start();
    if(!isset($_SESSION['userId'])){
        http_response_code(400);
        die();
    }

    $module = "modifyProfileView.php";
    $content = array();
    array_push($content, $module);

    $title = "Modifier mon profil - LolStats";
    $styles = array('modifyProfile.css');
    $scripts = array();

    require_once __DIR__ . "/HTML/masterpage.php";
?>