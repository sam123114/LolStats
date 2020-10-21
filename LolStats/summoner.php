<?php
    session_start();

    $module = "summonerView.php";
    $content = array();
    array_push($content, $module);

    $title = $_GET['summonerName'] . " - Summoner stats";
    $styles = array('summoner.css');
    $scripts = array('summoner.js','loadSummonerData.js');

    require_once __DIR__ . "/HTML/masterpage.php";
?>