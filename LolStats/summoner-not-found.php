<?php
    session_start();

    $module = "summonerNotFoundView.php";
    $content = array();
    array_push($content, $module);

    $title = "Summoner not found - LolStats";
    $styles = array();
    array_push($styles,'summonerNotFound.css');

    require_once __DIR__ . "/HTML/masterpage.php";
?>