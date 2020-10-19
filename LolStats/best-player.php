<?php
    session_start();

    $module = "bestPlayerView.php";
    $content = array();
    array_push($content, $module);

    $title = "Meilleur joueur - LolStats";
    $styles = array();
    array_push($styles,'bestPlayer.css');
    $script = "loadBestPlayer.js";

    require_once __DIR__ . "/HTML/masterpage.php";
?>