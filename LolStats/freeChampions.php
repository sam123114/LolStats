<?php
    session_start();

    $module = "freeChampionsView.php";
    $content = array();
    array_push($content, $module);

    $title = "Champions gratuits- LolStats";
    $styles = array('freeChampions.css');
    $scripts = array('loadChampions.js');

    require_once __DIR__ . "/HTML/masterpage.php";
?>