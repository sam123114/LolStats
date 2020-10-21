<?php
    session_start();

    $module = "indexView.php";
    $content = array();
    array_push($content, $module);

    $title = "Index - LolStats";
    $styles = array('index.css');
    $scripts = array();

    require_once __DIR__ . "/HTML/masterpage.php";
?>