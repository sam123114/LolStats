<?php
    session_start();

    if(!isset($_GET['summonerName'])){
        http_response_code(400);
        die();
    }
    
    $module = "summonerView.php";
    $content = array();
    array_push($content, $module);

    $title = $_GET['summonerName'] . " - Summoner stats";
    $styles = array('summoner.css');
    $scripts = array('summoner.js','loadSummonerData.js');

    require_once __DIR__ . "/HTML/masterpage.php";
 
?>