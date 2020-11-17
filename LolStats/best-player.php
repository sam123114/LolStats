<?php
    session_start();

    $module = "bestPlayerView.php";
    $content = array();
    array_push($content, $module);

    $title = "Meilleurs joueurs - LolStats";
    $styles = array('bestPlayer.css');
    $scripts = array("loadBestPlayer.js");

    require_once __DIR__ . "/HTML/masterpage.php";
?>