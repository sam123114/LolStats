<?php
    session_start();

    if(!isset($_GET['summonerName'])){
        http_response_code(400);
        die();
    }

    if(strpos($_GET['summonerName'], ",") === false){
        $module = 'summonerView.php';
        $css = ['summoner.css'];
        $js = ['summoner.js','loadSummonerData.js'];
    } else {
        $module = 'compareSummonersView.php';
        $css = ['compareSummoners.css'];
        $js = ['loadCompareSummoners.js'];
    }

    $title = $_GET['summonerName'] . " - Summoner stats";
    $content = [];
    array_push($content, $module);
    $styles = $css;
    $scripts = $js;

    require_once __DIR__ . "/HTML/masterpage.php";
?>
