<?php
    session_start();

    $module = "summonerView.php";
    $content = array();
    array_push($content, $module);

    $title = $_GET['summonerName'] . " - Summoner stats";
    $styles = array();
    array_push($styles,'summoner.css');
    $script = "loadSummoner.js";

    require_once __DIR__ . "/HTML/masterpage.php";
?>