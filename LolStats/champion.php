<?php
    session_start();

    if(!isset($_GET['name'])){
        http_response_code(400);
        die();
    }

    
    $module = "championView.php";
    $content = array(); 
    array_push($content, $module);

    $title = "Champion - LolStats";
    $styles = array('champion.css');
    $scripts = array("champion.js");

    require_once __DIR__ . "/HTML/masterpage.php";
?>